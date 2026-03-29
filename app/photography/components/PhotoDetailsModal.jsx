'use client';
import { Dialog, DialogPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Maximize2, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const PhotoDetailsModal = ({
  selectedPhoto,
  isFullscreen,
  closeModals,
  navigatePhoto,
  openFullscreen,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Reset details visibility when photo changes
  useEffect(() => {
    setShowDetails(false);
    setExpandedDescription(false);
    setIsImageLoading(true);
  }, [selectedPhoto?.src]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto || isFullscreen) return;
      if (e.key === 'ArrowRight') navigatePhoto('next');
      if (e.key === 'ArrowLeft') navigatePhoto('prev');
      if (e.key === 'Escape') closeModals();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, isFullscreen, navigatePhoto, closeModals]);

  return (
    <Dialog
      open={!!selectedPhoto && !isFullscreen}
      onClose={closeModals}
      className="fixed z-50 inset-0"
    >
      <AnimatePresence mode="wait">
        {selectedPhoto && !isFullscreen && (
          <motion.div
            className="flex items-center justify-center min-h-screen px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <DialogPanel className="relative z-10 bg-[#181A1B] backdrop-blur-xl rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/10">
              {/* Navigation Buttons */}
              <motion.button
                onClick={() => navigatePhoto('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/75 hover:bg-black/90 rounded-full text-white border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => navigatePhoto('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/75 hover:bg-black/90 rounded-full text-white border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              {/* Top Right Controls */}
              <motion.div
                className="absolute top-4 right-4 z-20 flex items-center gap-3"
              >
                <motion.button
                  onClick={openFullscreen}
                  className="text-white p-2.5 bg-black/75 hover:bg-black/90 rounded-full transition-all border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm"
                  aria-label="Open fullscreen"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Maximize2 className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="text-white p-2.5 bg-black/75 hover:bg-black/90 rounded-full transition-all border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm"
                  onClick={closeModals}
                  aria-label="Close details"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </motion.div>

              <div className="flex flex-col h-full overflow-hidden">
                {/* Image Container with overlay details */}
                <motion.div
                  className="flex-1 relative bg-black/50 flex items-center justify-center overflow-hidden"
                  key={selectedPhoto.src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {/* Loading Skeleton */}
                  <AnimatePresence>
                    {isImageLoading && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/50"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-gray-700 dark:from-gray-900 via-gray-600 dark:via-gray-800 to-gray-700 dark:to-gray-900"
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
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    width={800}
                    height={600}
                    className="w-full h-auto max-h-[55vh] md:max-h-[65vh] object-contain"
                    quality={90}
                    priority
                    onLoadingComplete={() => setIsImageLoading(false)}
                  />

                  {/* Toggle Details Button - Positioned on Image */}
                  <motion.button
                    onClick={() => setShowDetails(!showDetails)}
                    className="absolute bottom-5 right-4 z-20 px-4 py-1.5 flex items-center justify-center gap-1.5 bg-black/75 hover:bg-black/90 text-white border border-white/25 rounded-full transition-all backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
                  >
                    {showDetails ? (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span className="text-xs md:text-sm">Hide Details</span>
                      </>
                    ) : (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        <span className="text-xs md:text-sm">View Details</span>
                      </>
                    )}
                  </motion.button>

                  {/* Details Overlay */}
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="p-6 pb-12 md:p-8 md:pb-16 overflow-y-auto max-h-[60%] scroll-smooth"
                          style={{ 
                            WebkitOverflowScrolling: 'touch',
                            overscrollBehavior: 'contain'
                          }}
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          exit={{ y: 20 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                          <motion.span
                            className="inline-block px-3 py-1 bg-white/20 text-white text-xs rounded-full mb-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            {selectedPhoto.category}
                          </motion.span>
                          <motion.h2
                            className="text-2xl md:text-[2rem] font-medium text-white mb-2"
                            style={{
                              fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                          >
                            {selectedPhoto.title}
                          </motion.h2>
                          <motion.p
                            className={`text-gray-200 leading-relaxed mb-1 text-sm md:text-base ${
                              expandedDescription ? '' : 'md:line-clamp-none line-clamp-1'
                            }`}
                            style={{
                              fontFamily: '"Avenir Next", "Trebuchet MS", sans-serif',
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            {selectedPhoto.description}
                          </motion.p>
                          {/* See More Button - Mobile Only */}
                          <motion.button
                            onClick={() => setExpandedDescription(!expandedDescription)}
                            className="md:hidden text-blue-400 hover:text-blue-300 text-sm font-medium mb-4 transition-colors"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.25 }}
                          >
                            {expandedDescription ? 'See Less' : 'See More'}
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </DialogPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default PhotoDetailsModal;
