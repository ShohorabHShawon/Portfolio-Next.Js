'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const PhotoGallery = ({ filteredPhotos, selectedCategory, openDetailsModal }) => {
  const [randomizedPhotos, setRandomizedPhotos] = useState(filteredPhotos);
  const [loadingStates, setLoadingStates] = useState({});

  // Randomize photos only on client side after hydration
  useEffect(() => {
    const shuffled = [...filteredPhotos];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setRandomizedPhotos(shuffled);
    // Initialize loading states
    const newLoadingStates = {};
    shuffled.forEach((photo) => {
      newLoadingStates[photo.src] = true;
    });
    setLoadingStates(newLoadingStates);
  }, [selectedCategory, filteredPhotos]);

  const handleImageLoad = (src) => {
    setLoadingStates((prev) => ({
      ...prev,
      [src]: false,
    }));
  };

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
          <motion.div
            key={photo.src}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg"
            onClick={() => openDetailsModal(photo)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
          >
            <div className="relative bg-gray-200 dark:bg-gray-800 aspect-auto overflow-hidden">
              {/* Loading Skeleton */}
              {loadingStates[photo.src] && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-200 dark:from-gray-800 via-gray-100 dark:via-gray-700 to-gray-200 dark:to-gray-800"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 0%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                />
              )}

              <Image
                src={photo.src}
                alt={photo.title}
                width={400}
                height={0}
                style={{ height: 'auto' }}
                className={`w-full transition-all duration-700 group-hover:scale-110 ${
                  loadingStates[photo.src] ? 'opacity-0' : 'opacity-100'
                }`}
                onLoadingComplete={() => handleImageLoad(photo.src)}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold font-poppins text-sm">{photo.title}</h3>
                  <p className="text-xs text-gray-300">{photo.category}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoGallery;
