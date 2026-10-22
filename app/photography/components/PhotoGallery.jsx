'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { memo, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';

// Columns per breakpoint, matching Tailwind's sm / lg.
const getColumnCount = () => {
  const width = window.innerWidth;
  if (width >= 1024) return 4;
  if (width >= 640) return 3;
  return 2;
};

const subscribeToResize = (callback) => {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};

// The server can't know the viewport; the client corrects it right after hydration.
const useColumnCount = () => useSyncExternalStore(subscribeToResize, getColumnCount, () => 4);

// Pinterest-style placement: each photo goes into the currently shortest column,
// so the sheet reads left-to-right in rows while keeping columns balanced.
const buildColumns = (photos, columnCount) => {
  const columns = Array.from({ length: columnCount }, () => ({ height: 0, items: [] }));

  photos.forEach((photo, index) => {
    let shortest = columns[0];
    for (const column of columns) {
      if (column.height < shortest.height - 0.01) shortest = column;
    }
    shortest.items.push({ photo, index });
    // Account for the film frame chrome around each photo.
    shortest.height += photo.height / photo.width + 0.18;
  });

  return columns.map((column) => column.items);
};

// One shared observer for every frame: photos "develop" the first time they scroll into view.
const revealCallbacks = new WeakMap();
let revealObserver = null;

const observeReveal = (element, onReveal) => {
  if (typeof IntersectionObserver === 'undefined') {
    onReveal();
    return () => {};
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealCallbacks.get(entry.target)?.();
        revealCallbacks.delete(entry.target);
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
  }

  revealCallbacks.set(element, onReveal);
  revealObserver.observe(element);

  return () => {
    revealCallbacks.delete(element);
    revealObserver?.unobserve(element);
  };
};

const frameNumber = (src) => (String(src).match(/(\d+)\.\w+$/)?.[1] || '').padStart(3, '0');

function Sprockets() {
  return (
    <span
      aria-hidden="true"
      className="block h-[7px] w-full opacity-80 [background-image:linear-gradient(90deg,rgba(242,239,233,0.2)_0_7px,transparent_7px_14px)] [background-position:3px_0] [background-repeat:repeat-x] [background-size:14px_7px]"
    />
  );
}

// Hand-drawn loop, like a grease pencil marking a keeper on a contact sheet.
function GreasePencilMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-[3%] z-10 h-[106%] w-[106%] -rotate-2 overflow-visible"
    >
      <path
        d="M52 5 C 83 4, 97 24, 96 51 C 95 80, 74 96, 47 95 C 19 94, 4 76, 5 47 C 6 21, 26 5, 58 8"
        pathLength="1"
        fill="none"
        stroke="#d6a85f"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="opacity-0 [stroke-dasharray:1_1] [stroke-dashoffset:1] transition-[stroke-dashoffset,opacity] duration-700 ease-out group-hover:opacity-100 group-hover:[stroke-dashoffset:0] group-focus-visible:opacity-100 group-focus-visible:[stroke-dashoffset:0]"
      />
    </svg>
  );
}

const FilmFrame = memo(function FilmFrame({ photo, index, openDetailsModal }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isDeveloped = isInView && isLoaded;

  useEffect(() => {
    if (!ref.current) return undefined;
    return observeReveal(ref.current, () => setIsInView(true));
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => openDetailsModal(photo)}
      aria-label={`Open ${photo.title}`}
      className="group relative block w-full rounded-[3px] bg-[#15110e] px-[5px] py-[6px] text-left shadow-[0_22px_40px_-24px_rgba(0,0,0,0.95)] outline-none ring-[#d6a85f] transition-[transform,background-color] duration-300 ease-out hover:-translate-y-1 hover:bg-[#1c1612] focus-visible:ring-2"
    >
      <Sprockets />

      <span
        className="relative mt-[6px] block overflow-visible"
        // The real aspect ratio is known up front, so nothing shifts when the image arrives.
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <span className="absolute inset-0 overflow-hidden bg-[#221a15]">
          {!isLoaded && <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-[#2a211b]" />}
          <Image
            src={photo.src}
            alt={photo.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 340px"
            loading={index < 8 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            className={`object-cover transition-[opacity,filter,transform] duration-[1400ms] ease-out group-hover:scale-[1.035] ${
              isDeveloped
                ? 'opacity-100 [filter:none]'
                : 'opacity-0 [filter:sepia(1)_brightness(1.8)_contrast(0.5)]'
            }`}
          />
          <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-[#0d0b0a]/80 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-[#d6a85f] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {photo.category}
          </span>
        </span>
        <GreasePencilMark />
      </span>

      <span className="mt-[6px] flex items-center justify-between gap-3 px-0.5 font-mono text-[8px] uppercase tracking-[0.2em] md:text-[9px]">
        <span className="shrink-0 text-[#d6a85f]">▸ {frameNumber(photo.src)}</span>
        <span className="truncate text-white/40 transition-colors group-hover:text-white/85">{photo.title}</span>
      </span>

      <span className="mt-[6px] block">
        <Sprockets />
      </span>
    </button>
  );
});

const PhotoGallery = ({
  filteredPhotos,
  openDetailsModal,
  onClearFilters,
}) => {
  const columnCount = useColumnCount();
  const columns = useMemo(
    () => buildColumns(filteredPhotos, columnCount),
    [filteredPhotos, columnCount],
  );

  // Re-run the fade-in whenever the set or order of photos changes.
  const sheetKey = useMemo(
    () => filteredPhotos.map((photo) => photo.src).join('|'),
    [filteredPhotos],
  );

  if (filteredPhotos.length === 0) {
    return (
      <motion.div
        className="mx-auto mt-10 max-w-xl border border-dashed border-[#d6a85f]/30 px-6 py-16 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#d6a85f]">Blank roll</p>
        <p className="mt-4 [font-family:var(--font-darkroom),Georgia,serif] text-4xl text-white">
          Nothing <span className="italic text-[#d6a85f]">developed</span> here.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/50">
          Try a different keyword, switch to another roll, or change the sort order.
        </p>
        {typeof onClearFilters === 'function' && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-8 bg-[#d6a85f] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1a1512] transition-colors hover:bg-[#f2efe9]"
          >
            Reset filters
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={sheetKey}
      className="flex items-start gap-3 md:gap-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {columns.map((items, columnIndex) => (
        <div key={columnIndex} className="flex min-w-0 flex-1 flex-col gap-3 md:gap-5">
          {items.map(({ photo, index }) => (
            <FilmFrame
              key={photo.src}
              photo={photo}
              index={index}
              openDetailsModal={openDetailsModal}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default PhotoGallery;
