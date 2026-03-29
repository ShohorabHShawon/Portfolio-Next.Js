'use client';
import { Dialog, DialogPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

export default function VintagePhotoModal({
  selectedPhoto,
  closeModal,
  navigatePhoto,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedPhoto) {
        return;
      }
      if (event.key === 'Escape') {
        closeModal();
      }
      if (event.key === 'ArrowRight') {
        navigatePhoto('next');
      }
      if (event.key === 'ArrowLeft') {
        navigatePhoto('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, closeModal, navigatePhoto]);

  return (
    <Dialog
      open={Boolean(selectedPhoto)}
      onClose={closeModal}
      className="fixed inset-0 z-50"
    >
      <div className="fixed inset-0 bg-[#1f1712]/72 backdrop-blur-md" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center px-3 py-4 md:px-6">
        <DialogPanel className="relative h-[92vh] w-[96vw] max-w-[1500px] overflow-hidden rounded-[24px] border border-[#bda58a]/50 bg-[#faf4e9]/95 shadow-[0_30px_90px_rgba(34,20,11,0.46)]">
          {selectedPhoto && (
            <motion.div
              key={selectedPhoto.src}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="grid h-full grid-cols-1 md:grid-cols-2"
            >
              <div className="relative min-h-[280px] border-b border-[#c9b297]/60 bg-[#dfcfbc] md:min-h-0 md:border-b-0 md:border-r">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover sepia-[0.1] saturate-[0.96]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1510]/30 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-between gap-6 p-6 text-[#362416] md:p-9">
                <div className="space-y-3">
                  <p className="w-fit rounded-full border border-[#977455]/40 bg-[#f6e9d6] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#6a4a31]">
                    {selectedPhoto.category}
                  </p>
                  <h3
                    className="text-2xl leading-tight md:text-3xl"
                    style={{
                      fontFamily:
                        'Georgia, Cambria, "Times New Roman", serif',
                    }}
                  >
                    {selectedPhoto.title}
                  </h3>
                  <p className="max-h-[220px] overflow-y-auto pr-2 text-sm leading-relaxed text-[#4f3a29] md:max-h-[320px] md:text-[15px]">
                    {selectedPhoto.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.instagram.com/shohorabs.pov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#876548]/45 bg-[#f8ebd1] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#513725] transition hover:bg-[#edd5ae]"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/shohorabhshawon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#876548]/45 bg-[#f8ebd1] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#513725] transition hover:bg-[#edd5ae]"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          <button
            type="button"
            onClick={closeModal}
            className="absolute right-4 top-4 rounded-full border border-[#8f6a47]/45 bg-[#f8ebd1]/95 p-2 text-[#3d2b1f] transition hover:bg-[#f2dcc0]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => navigatePhoto('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-[#8f6a47]/45 bg-[#f8ebd1]/95 p-2 text-[#3d2b1f] transition hover:bg-[#f2dcc0]"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => navigatePhoto('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-[#8f6a47]/45 bg-[#f8ebd1]/95 p-2 text-[#3d2b1f] transition hover:bg-[#f2dcc0]"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
