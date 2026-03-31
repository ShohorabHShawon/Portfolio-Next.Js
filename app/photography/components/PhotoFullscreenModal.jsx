'use client';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Facebook,
    Link2,
    Minimize2,
    Share2,
    Twitter,
    X,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const PhotoFullscreenModal = ({
  selectedPhoto,
  isFullscreen,
  closeModals,
  navigatePhoto,
  exitFullscreen,
  onShare,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [shareLabel, setShareLabel] = useState('Share');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef(null);

  // Reset loading state when photo changes
  useEffect(() => {
    setIsImageLoading(true);
    setShareLabel('Share');
    setShowShareMenu(false);
  }, [selectedPhoto?.src]);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyLink = async () => {
    await onShare?.();
    setShareLabel('Copied!');
    window.setTimeout(() => {
      setShareLabel('Share');
    }, 1500);
  };

  const handleSocialShare = (platform) => {
    if (!selectedPhoto) return;
    
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(selectedPhoto.title);
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`;
        break;
      case 'instagram':
        shareUrl = `https://instagram.com/`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedPhoto || !isFullscreen) {
        return;
      }

      if (event.key === 'ArrowRight') navigatePhoto('next');
      if (event.key === 'ArrowLeft') navigatePhoto('prev');
      if (event.key === 'Escape') closeModals();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, isFullscreen, navigatePhoto, closeModals]);

  return (
    <Dialog
      open={!!selectedPhoto && isFullscreen}
      onClose={closeModals}
      className="fixed z-50 inset-0"
    >
      <div className="flex items-center justify-center h-screen">
        <DialogBackdrop className="fixed inset-0 bg-[#181A1B]" />
        <DialogPanel className="relative z-10 w-full h-full flex items-center justify-center p-4">
          <div className="absolute top-6 right-6 z-20 flex gap-3">
            <div className="relative" ref={shareMenuRef}>
              <button
                className="flex items-center gap-2 rounded-full border border-white/25 bg-black/75 px-3 py-2 text-white shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all hover:bg-black/90"
                onClick={() => setShowShareMenu(!showShareMenu)}
                title="Share photo"
                aria-label="Share photo"
              >
                <Share2 className="h-4 w-4" />
                <span className="text-xs font-medium">{shareLabel}</span>
              </button>

              <AnimatePresence>
                {showShareMenu && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 w-48 bg-[#0f1011]/95 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={handleCopyLink}
                      className="w-full px-4 py-2.5 text-left text-sm text-white/90 hover:bg-white/10 flex items-center gap-3 border-b border-white/5 transition-colors"
                    >
                      <Link2 className="w-4 h-4" />
                      Copy Link
                    </button>
                    <button
                      onClick={() => {
                        handleSocialShare('twitter');
                        setShowShareMenu(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-white/90 hover:bg-white/10 flex items-center gap-3 border-b border-white/5 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                      Share on Twitter
                    </button>
                    <button
                      onClick={() => {
                        handleSocialShare('facebook');
                        setShowShareMenu(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-white/90 hover:bg-white/10 flex items-center gap-3 border-b border-white/5 transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                      Share on Facebook
                    </button>
                    <button
                      onClick={() => {
                        handleSocialShare('instagram');
                        setShowShareMenu(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-white/90 hover:bg-white/10 flex items-center gap-3 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.266-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                      </svg>
                      Share on Instagram
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              className="text-white p-2.5 bg-black/75 hover:bg-black/90 rounded-full transition-all border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm"
              onClick={exitFullscreen}
              title="Exit Fullscreen"
              aria-label="Exit fullscreen"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
            <button
              className="text-white p-2.5 bg-black/75 hover:bg-black/90 rounded-full transition-all border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm"
              onClick={closeModals}
              title="Close"
              aria-label="Close fullscreen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation in fullscreen */}
          <button
            onClick={() => navigatePhoto('prev')}
            className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/75 hover:bg-black/90 rounded-full text-white border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigatePhoto('next')}
            className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/75 hover:bg-black/90 rounded-full text-white border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {selectedPhoto?.src && (
            <div className="relative w-full h-full flex items-center justify-center">
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
                alt="Fullscreen"
                width={1920}
                height={1080}
                className="max-w-full max-h-full object-contain"
                onLoadingComplete={() => setIsImageLoading(false)}
              />

              {/* Toggle Details Button - Bottom Right */}
              <motion.button
                onClick={() => setShowDetails(!showDetails)}
                className="absolute bottom-6 right-4 z-20 px-4 py-1.5 flex items-center justify-center gap-1.5 bg-black/75 hover:bg-black/90 text-white border border-white/25 rounded-full transition-all backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
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
                      className="p-6 pb-20 md:p-8 md:pb-24 overflow-y-auto max-h-[60%] scroll-smooth"
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
                        className="text-xl sm:text-2xl md:text-3xl font-medium text-white mb-3"
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
                        className={`text-gray-200 leading-relaxed mb-1 text-xs sm:text-sm md:text-base ${
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
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PhotoFullscreenModal;
