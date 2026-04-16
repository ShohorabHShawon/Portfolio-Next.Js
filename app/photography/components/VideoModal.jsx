'use client';
import { Dialog, DialogPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Play, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function VideoModal({ selectedVideo, closeModals, navigateVideo }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const links = useMemo(() => {
    if (!selectedVideo) return [];
    if (!Array.isArray(selectedVideo.links)) return [];

    return selectedVideo.links
      .filter((link) => link && typeof link.url === 'string' && link.url.trim())
      .map((link) => ({
        url: link.url.trim(),
        label: typeof link.label === 'string' && link.label.trim() ? link.label.trim() : 'Link',
      }));
  }, [selectedVideo]);

  const safeLinks = useMemo(() => {
    return links.filter((link) => {
      try {
        const parsed = new URL(link.url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch {
        return false;
      }
    });
  }, [links]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedVideo) return;

      if (e.key === 'ArrowRight') navigateVideo?.('next');
      if (e.key === 'ArrowLeft') navigateVideo?.('prev');
      if (e.key === 'Escape') closeModals?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModals, navigateVideo, selectedVideo]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
    setIsPlaying(false);
  }, [selectedVideo?.src]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    el.addEventListener('play', handlePlay);
    el.addEventListener('pause', handlePause);
    el.addEventListener('ended', handleEnded);

    return () => {
      el.removeEventListener('play', handlePlay);
      el.removeEventListener('pause', handlePause);
      el.removeEventListener('ended', handleEnded);
    };
  }, [selectedVideo?.src]);

  const playFromOverlay = async () => {
    const el = videoRef.current;
    if (!el) return;

    try {
      await el.play();
    } catch {
      // Ignore autoplay/gesture errors; controls still work.
    }
  };

  return (
    <Dialog
      open={!!selectedVideo}
      onClose={closeModals}
      className="fixed z-50 inset-0"
    >
      <AnimatePresence mode="wait">
        {selectedVideo ? (
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
              <motion.button
                onClick={() => navigateVideo?.('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/75 hover:bg-black/90 rounded-full text-white border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-200"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => navigateVideo?.('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/75 hover:bg-black/90 rounded-full text-white border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-200"
                aria-label="Next video"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="absolute top-4 right-4 z-20 text-white p-2.5 bg-black/75 hover:bg-black/90 rounded-full transition-all border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm"
                onClick={closeModals}
                aria-label="Close video"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="flex flex-col h-full overflow-hidden">
                <motion.div
                  className="flex-1 relative bg-black/50 flex items-center justify-center overflow-hidden"
                  key={selectedVideo.src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <video
                    ref={videoRef}
                    src={selectedVideo.src}
                    controls
                    playsInline
                    className="max-h-[70vh] w-full bg-black object-contain"
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        videoRef.current.volume = 0.5;
                      }
                    }}
                  />

                  {!isPlaying ? (
                    <button
                      type="button"
                      onClick={playFromOverlay}
                      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/60 p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:bg-black/75"
                      aria-label="Play video"
                    >
                      <Play className="h-7 w-7" />
                    </button>
                  ) : null}
                </motion.div>

                <div className="border-t border-white/10 px-6 py-4">
                  <h3 className="text-white font-semibold text-base">{selectedVideo.title}</h3>
                  {selectedVideo.fileName ? (
                    <p className="mt-1 text-xs text-white/55">{selectedVideo.fileName}</p>
                  ) : null}
                  {selectedVideo.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {selectedVideo.description}
                    </p>
                  ) : null}

                  {safeLinks.length ? (
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-white/60">
                        Links
                      </p>
                      <div className="mt-2 flex flex-col gap-2">
                        {safeLinks.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 transition hover:bg-black/45"
                          >
                            <span className="truncate">{link.label}</span>
                            <ExternalLink className="h-4 w-4 shrink-0 text-white/70" />
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </DialogPanel>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Dialog>
  );
}
