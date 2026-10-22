'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { memo, useMemo, useState, useSyncExternalStore } from 'react';

// Columns per breakpoint, matching Tailwind's sm / lg / xl.
const getColumnCount = () => {
  const width = window.innerWidth;
  if (width >= 1280) return 5;
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
// so the grid reads left-to-right in rows while keeping columns balanced.
const buildColumns = (photos, columnCount) => {
  const columns = Array.from({ length: columnCount }, () => ({ height: 0, items: [] }));

  photos.forEach((photo, index) => {
    let shortest = columns[0];
    for (const column of columns) {
      if (column.height < shortest.height - 0.01) shortest = column;
    }
    shortest.items.push({ photo, index });
    shortest.height += photo.height / photo.width;
  });

  return columns.map((column) => column.items);
};

const PhotoCard = memo(function PhotoCard({ photo, index, openDetailsModal }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => openDetailsModal(photo)}
      aria-label={`Open ${photo.title}`}
      className="group relative block w-full overflow-hidden rounded-2xl bg-[#211914] text-left outline-none ring-[#d6a85f] ring-offset-2 ring-offset-[#1a1512] focus-visible:ring-2"
      // The real aspect ratio is known up front, so nothing shifts when the image arrives.
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
    >
      {!isLoaded && <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-[#2a211b]" />}

      <Image
        src={photo.src}
        alt={photo.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 260px"
        loading={index < 10 ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        className={`object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.03] ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Hover overlay */}
      <span className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:p-4">
        <span className="line-clamp-2 font-poppins text-xs font-semibold leading-snug text-white md:text-sm">
          {photo.title}
        </span>
        <span className="mt-1.5 inline-flex w-fit rounded-full bg-[#d6a85f]/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#1a1512]">
          {photo.category}
        </span>
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
  const gridKey = useMemo(
    () => filteredPhotos.map((photo) => photo.src).join('|'),
    [filteredPhotos],
  );

  if (filteredPhotos.length === 0) {
    return (
      <motion.div
        className="mx-auto mt-6 max-w-2xl rounded-3xl border border-white/10 bg-white/5 px-6 py-14 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <p className="text-lg font-medium text-white">
          No photos match your current search.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          Try a different keyword, switch to another category, or change the sort order.
        </p>
        {typeof onClearFilters === 'function' && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#d6a85f] px-5 py-2 text-sm font-medium text-[#1a1512] transition-colors hover:bg-white"
          >
            Reset filters
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={gridKey}
      className="flex items-start gap-3 md:gap-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {columns.map((items, columnIndex) => (
        <div key={columnIndex} className="flex min-w-0 flex-1 flex-col gap-3 md:gap-4">
          {items.map(({ photo, index }) => (
            <PhotoCard
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
