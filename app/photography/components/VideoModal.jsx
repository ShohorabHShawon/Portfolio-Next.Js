'use client';
import { Dialog, DialogPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Instagram, Play, X, Youtube } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function VideoModal({ selectedVideo, closeModals, navigateVideo }) {
  const isYouTube = selectedVideo?.type === 'youtube';
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

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

  const socialLinks = useMemo(() => {
    const getHost = (value) => {
      try {
        return new URL(value).hostname.toLowerCase();
      } catch {
        return '';
      }
    };

    const youtube = safeLinks.find((link) => {
      const host = getHost(link.url);
      return host.includes('youtube.com') || host.includes('youtu.be');
    });

    const instagram = safeLinks.find((link) => {
      const host = getHost(link.url);
      return host.includes('instagram.com');
    });

    const others = safeLinks.filter((link) => link !== youtube && link !== instagram);

    return { youtube, instagram, others };
  }, [safeLinks]);

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
    setHasError(false);
  }, [selectedVideo?.src]);

  useEffect(() => {
    if (isYouTube) {
      setIsPlaying(false);
      return;
    }

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
  }, [isYouTube, selectedVideo?.src]);

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
              <div className="flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => navigateVideo?.('prev')}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-black/65"
                      aria-label="Previous video"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Prev</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateVideo?.('next')}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-black/65"
                      aria-label="Next video"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <motion.button
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition hover:bg-black/65"
                    onClick={closeModals}
                    aria-label="Close video"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                <motion.div
                  className="flex-1 relative bg-black/50 flex items-center justify-center overflow-hidden"
                  key={selectedVideo.src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {!hasError ? (
                    isYouTube ? (
                      <iframe
                        src={selectedVideo.src}
                        title={selectedVideo.title}
                        className="aspect-video w-full max-h-[70vh] bg-black"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        loading="lazy"
                        onError={() => setHasError(true)}
                      />
                    ) : (
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
                        onError={() => setHasError(true)}
                      />
                    )
                  ) : (
                    <div className="flex min-h-[50vh] w-full items-center justify-center bg-black px-6 text-center text-white">
                      <div>
                        <p className="text-base font-medium">Video unavailable</p>
                        <p className="mt-2 text-sm text-white/70">
                          The file could not be loaded by the browser or the deployment host.
                        </p>
                      </div>
                    </div>
                  )}

                  {!isYouTube && !isPlaying && !hasError ? (
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
                    <div className="mt-4 flex items-center gap-2">
                      {socialLinks.youtube ? (
                        <a
                          href={socialLinks.youtube.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Watch on YouTube"
                          title="Watch on YouTube"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/90 transition hover:bg-[#FF0000] hover:text-white"
                        >
                          <Youtube className="h-4.5 w-4.5" />
                        </a>
                      ) : null}

                      {socialLinks.instagram ? (
                        <a
                          href={socialLinks.instagram.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Watch on Instagram"
                          title="Watch on Instagram"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/90 transition hover:bg-[#E1306C] hover:text-white"
                        >
                          <Instagram className="h-4.5 w-4.5" />
                        </a>
                      ) : null}

                      {socialLinks.others.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          title={link.label}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/90 transition hover:bg-black/55"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ))}
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
