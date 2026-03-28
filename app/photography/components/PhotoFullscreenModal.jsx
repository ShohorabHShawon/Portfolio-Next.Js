'use client';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Minimize2, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const PhotoFullscreenModal = ({
  selectedPhoto,
  isFullscreen,
  closeModals,
  navigatePhoto,
  exitFullscreen,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  return (
    <Dialog
      open={!!selectedPhoto && isFullscreen}
      onClose={closeModals}
      className="fixed z-50 inset-0"
    >
      <div className="flex items-center justify-center h-screen">
        <DialogBackdrop className="fixed inset-0 bg-black" />
        <DialogPanel className="relative z-10 w-full h-full flex items-center justify-center p-4">
          <div className="absolute top-6 right-6 z-20 flex gap-3">
            <button
              className="text-white p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all"
              onClick={exitFullscreen}
              title="Exit Fullscreen"
            >
              <Minimize2 className="w-6 h-6" />
            </button>
            <button
              className="text-white p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all"
              onClick={closeModals}
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation in fullscreen */}
          <button
            onClick={() => navigatePhoto('prev')}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-300"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={() => navigatePhoto('next')}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-300"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {selectedPhoto?.src && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedPhoto.src}
                alt="Fullscreen"
                width={1920}
                height={1080}
                className="max-w-full max-h-full object-contain"
              />

              {/* Toggle Details Button - Bottom Right */}
              <motion.button
                onClick={() => setShowDetails(!showDetails)}
                className="absolute bottom-4 right-4 z-20 px-6 py-2 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full transition-all backdrop-blur-sm"
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
                      className="p-6 md:p-8 overflow-y-auto max-h-[60%] scroll-smooth"
                      style={{
                        WebkitOverflowScrolling: 'touch',
                        overscrollBehavior: 'contain',
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
                        className="text-xl md:text-2xl font-light text-white mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                      >
                        {selectedPhoto.title}
                      </motion.h2>
                      <motion.p
                        className={`text-gray-200 leading-relaxed mb-1 text-xs md:text-sm ${
                          expandedDescription ? '' : 'md:line-clamp-none line-clamp-1'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {selectedPhoto.description}
                      </motion.p>
                      {/* See More Button - Mobile Only */}
                      <motion.button
                        onClick={() => setExpandedDescription(!expandedDescription)}
                        className="md:hidden text-blue-400 hover:text-blue-300 text-xs font-medium mb-4 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.25 }}
                      >
                        {expandedDescription ? 'See Less' : 'See More'}
                      </motion.button>
                      <motion.div
                        className="flex flex-row gap-1 sm:gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.25 }}
                      >
                        <motion.a
                          href="https://www.instagram.com/shohorabs.pov/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 px-2 sm:px-4 py-1 sm:py-2 border border-white/30 text-white text-xs rounded-lg hover:border-white/60 hover:bg-white/10 transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.779.263-1.613.686-2.228 1.3-.637.637-1.022 1.438-1.3 2.228-.267.788-.468 1.658-.6 2.936C.015 8.333 0 8.74 0 12s.015 3.667.072 5.053c.06 1.278.261 2.148.6 2.936.279.79.663 1.591 1.3 2.229.637.637 1.438 1.022 2.228 1.3.788.267 1.658.468 2.936.6 1.28.057 1.687.072 5.053.072s3.667-.015 5.053-.072c1.278-.132 2.148-.333 2.936-.6.79-.279 1.591-.663 2.229-1.3.637-.637 1.022-1.438 1.3-2.228.267-.788.468-1.658.6-2.936.057-1.28.072-1.687.072-5.053s-.015-3.667-.072-5.053c-.132-1.278-.333-2.148-.6-2.936-.279-.79-.663-1.591-1.3-2.229C21.137 1.022 20.336.637 19.546.6c-.788-.267-1.658-.468-2.936-.6C15.667.015 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.07 1.171.053 1.805.248 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.361 1.057.413 2.227.061 1.266.07 1.646.07 4.849s-.009 3.585-.07 4.849c-.053 1.171-.248 1.805-.415 2.231-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.056.361-2.227.413-1.231.061-1.617.07-4.849.07s-3.628-.009-4.849-.07c-1.171-.052-1.805-.248-2.231-.415-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.361-1.056-.413-2.227-.061-1.266-.07-1.646-.07-4.849s.009-3.585.07-4.849c.052-1.171.248-1.805.415-2.231.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.056-.361 2.227-.413 1.266-.061 1.646-.07 4.849-.07z" />
                            <circle cx="12" cy="12" r="3.5" />
                            <circle cx="18.5" cy="5.5" r=".5" />
                          </svg>
                          <span className="hidden sm:inline">Instagram</span>
                        </motion.a>
                        <motion.a
                          href="https://www.facebook.com/shohorabhshawon/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 px-2 sm:px-4 py-1 sm:py-2 border border-white/30 text-white text-xs rounded-lg hover:border-white/60 hover:bg-white/10 transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                          <span className="hidden sm:inline">Facebook</span>
                        </motion.a>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PhotoFullscreenModal;
