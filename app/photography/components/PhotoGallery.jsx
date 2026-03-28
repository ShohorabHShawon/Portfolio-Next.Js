'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const PhotoGallery = ({ filteredPhotos, selectedCategory, openDetailsModal }) => {
  const [randomizedPhotos, setRandomizedPhotos] = useState(filteredPhotos);

  // Randomize photos only on client side after hydration
  useEffect(() => {
    const shuffled = [...filteredPhotos];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setRandomizedPhotos(shuffled);
  }, [selectedCategory, filteredPhotos]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedCategory}
        className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {randomizedPhotos.map((photo, index) => (
          <div
            key={photo.src}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg"
            onClick={() => openDetailsModal(photo)}
          >
            <div className="relative">
              <Image
                src={photo.src}
                alt={photo.title}
                width={400}
                height={0}
                style={{ height: 'auto' }}
                className="w-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold font-poppins text-sm">{photo.title}</h3>
                  <p className="text-xs text-gray-300">{photo.category}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoGallery;
