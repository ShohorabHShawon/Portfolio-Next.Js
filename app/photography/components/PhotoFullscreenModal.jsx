'use client';
import React from 'react';
import Image from 'next/image';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PhotoFullscreenModal = ({
  selectedPhoto,
  isFullscreen,
  closeModals,
  navigatePhoto,
}) => {
  return (
    <Dialog
      open={!!selectedPhoto && isFullscreen}
      onClose={closeModals}
      className="fixed z-50 inset-0"
    >
      <div className="flex items-center justify-center h-screen">
        <DialogBackdrop className="fixed inset-0 bg-black" />
        <DialogPanel className="relative z-10 w-full h-full flex items-center justify-center p-4">
          <button
            className="absolute top-6 right-6 z-20 text-white p-3 bg-black/50 hover:bg-black/70 rounded-full"
            onClick={closeModals}
          >
            <X className="w-6 h-6" />
          </button>

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
            <Image
              src={selectedPhoto.src}
              alt="Fullscreen"
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain"
            />
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PhotoFullscreenModal;
