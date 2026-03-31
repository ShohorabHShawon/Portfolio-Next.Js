'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo } from 'react';

const PhotoGallery = ({ filteredPhotos, selectedCategory, openDetailsModal }) => {
  const prioritizedSrcSet = useMemo(() => {
    return new Set(filteredPhotos.slice(0, 8).map((photo) => photo.src));
  }, [filteredPhotos]);

  if (filteredPhotos.length === 0) {
    return (
      <motion.div
        className="mx-auto mt-14 max-w-2xl rounded-3xl border border-[#181A1B]/10 bg-white px-6 py-14 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <p className="text-lg font-medium text-[#181A1B] dark:text-white">
          No photos match your current search.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#181A1B]/65 dark:text-white/55">
          Try a different keyword, switch to another category, or change the sort order.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={selectedCategory}
      className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 [column-gap:1rem]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
    >
      {filteredPhotos.map((photo) => (
        <button
          type="button"
          key={photo.src}
          className="mb-4 block align-top break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg w-full text-left"
          onClick={() => openDetailsModal(photo)}
          aria-label={`Open ${photo.title}`}
        >
          <div className="relative bg-gray-200 dark:bg-gray-800 aspect-auto overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.title}
              width={400}
              height={560}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              priority={prioritizedSrcSet.has(photo.src)}
              style={{ height: 'auto' }}
              className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.03] [transform:translateZ(0)] [backface-visibility:hidden]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold font-poppins text-sm">{photo.title}</h3>
                <p className="text-xs text-gray-300">{photo.category}</p>
              </div>
            </div>
          </div>
        </button>
      ))}
    </motion.div>
  );
};

export default PhotoGallery;
