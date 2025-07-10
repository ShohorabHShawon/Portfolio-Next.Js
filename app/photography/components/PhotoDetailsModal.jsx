'use client';
import React from 'react';
import Image from 'next/image';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

const PhotoDetailsModal = ({
  selectedPhoto,
  isFullscreen,
  closeModals,
  navigatePhoto,
  openFullscreen,
}) => {
  return (
    <Dialog
      open={!!selectedPhoto && !isFullscreen}
      onClose={closeModals}
      className="fixed z-50 inset-0"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <DialogBackdrop className="fixed inset-0 bg-black/90 backdrop-blur-sm" />
        <DialogPanel className="relative z-10 bg-zinc-900/95 backdrop-blur-lg rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          {/* Navigation Buttons */}
          <button
            onClick={() => navigatePhoto('prev')}
            className="absolute left-2 top-[30%] -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/70 rounded-full text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigatePhoto('next')}
            className="absolute right-2 top-[30%] -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/70 rounded-full text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            className="absolute top-4 right-4 z-20 text-white p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all"
            onClick={closeModals}
          >
            <X className="w-6 h-6" />
          </button>

          {selectedPhoto && (
            <div className="flex flex-col h-full overflow-hidden">
              <div className="flex-shrink-0 relative">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  width={800}
                  height={0}
                  style={{ height: 'auto' }}
                  className="w-full max-h-[50vh] md:max-h-[60vh] object-contain"
                />
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm rounded-full mb-4">
                  {selectedPhoto.category}
                </span>
                <h2 className="text-2xl font-light text-white mb-4">
                  {selectedPhoto.title}
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {selectedPhoto.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://www.facebook.com/shohorabhshawon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook Page
                  </a>
                  <button
                    onClick={openFullscreen}
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <Maximize2 className="w-5 h-5" />
                    View Fullscreen
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PhotoDetailsModal;
