'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useRef } from 'react';

const hash = (seed) => {
  const value = Math.sin(seed * 999.91) * 10000;
  return value - Math.floor(value);
};

const aspectClasses = [
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-[1/1]',
  'aspect-[5/6]',
  'aspect-[4/3]',
];

export default function VintageGallery({ photos, openDetailsModal }) {
  const boardRef = useRef(null);
  const dragStateRef = useRef(false);

  const collageItems = useMemo(() => {
    const columns = 8;
    const rowGap = 265;
    const totalRows = Math.ceil(photos.length / columns);
    const boardHeight = Math.max(1800, totalRows * rowGap + 420);
    const centerY = boardHeight / 2;

    const items = photos.map((photo, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;

      let left = 5 + (col / (columns - 1)) * 90;
      left += hash(index + 4) * 9 - 4.5;

      let top = 140 + row * rowGap + hash(index + 18) * 100;

      if (left > 33 && left < 67 && Math.abs(top - centerY) < 280) {
        top += top < centerY ? -220 : 220;
      }

      const width = 168 + Math.floor(hash(index + 34) * 98);
      let rotation = Math.round((hash(index + 61) * 20 - 10) * 10) / 10;
      if (Math.abs(rotation) < 1.4) {
        rotation = 0;
      }

      return {
        photo,
        index,
        left,
        top,
        width,
        rotation,
        aspectClass: aspectClasses[index % aspectClasses.length],
      };
    });

    return { items, boardHeight, centerY };
  }, [photos]);

  return (
    <div className="mx-auto w-full max-w-[1700px]">
      <div className="mb-6 hidden items-center justify-center gap-3 text-center text-[11px] uppercase tracking-[0.2em] text-[#6f5a45] md:flex">
        <span className="h-px w-16 bg-[#c7b39b]" />
        Drag The Prints • Click To View In Fullscreen
        <span className="h-px w-16 bg-[#c7b39b]" />
      </div>

      <div
        ref={boardRef}
        className="relative hidden overflow-hidden rounded-[30px] border border-[#ccbba8]/70 bg-[radial-gradient(circle_at_20%_10%,#fffdf8,transparent_45%),linear-gradient(180deg,#f7efdf_0%,#f1e5d5_100%)] shadow-[0_36px_90px_rgba(68,45,26,0.14)] md:block"
        style={{ height: collageItems.boardHeight }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,rgba(61,47,33,0.09)_0px,rgba(61,47,33,0.09)_1px,transparent_1px,transparent_7px)]" />

        {collageItems.items.map((item) => (
          <motion.button
            key={item.photo.src}
            type="button"
            drag
            dragConstraints={boardRef}
            dragElastic={0.14}
            dragMomentum={false}
            onDragStart={() => {
              dragStateRef.current = true;
            }}
            onDragEnd={() => {
              setTimeout(() => {
                dragStateRef.current = false;
              }, 90);
            }}
            onClick={() => {
              if (!dragStateRef.current) {
                openDetailsModal(item.photo);
              }
            }}
            className="group absolute rounded-md border border-[#bba183]/80 bg-[#fef9ef] p-2 text-left shadow-[0_16px_34px_rgba(56,39,24,0.22)] transition duration-300 hover:z-40 hover:shadow-[0_24px_48px_rgba(56,39,24,0.28)]"
            style={{
              left: `${item.left}%`,
              top: `${item.top}px`,
              width: `${item.width}px`,
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
            }}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`relative overflow-hidden border border-[#a88a69]/45 bg-[#e4d2ba] ${item.aspectClass}`}>
              <Image
                src={item.photo.src}
                alt={item.photo.title}
                fill
                sizes="240px"
                className="object-cover sepia-[0.13] saturate-[0.95] transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="mt-2 flex items-center justify-between gap-2 px-0.5 text-[#5a4330]">
              <p className="line-clamp-1 text-[10px] uppercase tracking-[0.14em]">
                {item.photo.category}
              </p>
              <p className="text-[10px] tracking-[0.1em]">#{String(item.index + 1).padStart(2, '0')}</p>
            </div>
          </motion.button>
        ))}

        <div
          className="absolute left-1/2 z-30 w-[430px] max-w-[80%] -translate-x-1/2 rounded-[28px] border border-[#b59a7c]/70 bg-[#f8efdf]/95 p-7 text-center shadow-[0_30px_70px_rgba(55,38,22,0.18)]"
          style={{ top: collageItems.centerY }}
        >
          <p className="mx-auto mb-4 w-fit rounded-full border border-[#8f7357]/40 bg-[#f1e3ce] px-4 py-1 text-[11px] uppercase tracking-[0.2em] text-[#6b523e]">
            Modern Vintage Gallery
          </p>
          <h2
            className="text-4xl leading-tight text-[#2f241b]"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
          >
            Shohorab H Shawon
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5d4938] md:text-base">
            Photographer and visual storyteller. Every print around this page can be moved,
            explored, and opened into a full-screen detail view.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[#725840]">
            <a
              href="https://www.instagram.com/shohorabs.pov/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#9a7c5f]/50 bg-[#f5e7d1] px-4 py-1.5 transition hover:bg-[#efdcc0]"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/shohorabhshawon/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#9a7c5f]/50 bg-[#f5e7d1] px-4 py-1.5 transition hover:bg-[#efdcc0]"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="mb-5 rounded-2xl border border-[#ccbba8]/70 bg-[#f8efdf]/95 p-5 text-center">
          <p className="mx-auto mb-3 w-fit rounded-full border border-[#8f7357]/40 bg-[#f1e3ce] px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-[#6b523e]">
            Modern Vintage Gallery
          </p>
          <h2
            className="text-3xl leading-tight text-[#2f241b]"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
          >
            Shohorab H Shawon
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#5d4938]">
            Tap any photo to open details. Drag-and-scatter mode is available on larger screens.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((photo, index) => (
            <button
              type="button"
              key={photo.src}
              onClick={() => openDetailsModal(photo)}
              className="overflow-hidden rounded-xl border border-[#bea98f]/65 bg-[#fffaf1] p-1.5 text-left"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#e0cfb8]">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover sepia-[0.1]"
                />
              </div>
              <p className="mt-1 line-clamp-1 text-[10px] uppercase tracking-[0.14em] text-[#5a4330]">
                #{String(index + 1).padStart(2, '0')} {photo.category}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
