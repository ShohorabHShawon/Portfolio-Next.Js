'use client';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Link2,
  Maximize2,
  Minimize2,
  Share2,
  Twitter,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

// How long the controls stay up before fading away.
const INITIAL_HIDE_MS = 1500;
const TAP_SHOW_MS = 2500;
const MOUSE_SHOW_MS = 2000;
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

const slide = {
  enter: (direction) => ({ x: direction > 0 ? '18%' : direction < 0 ? '-18%' : 0, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? '-18%' : direction < 0 ? '18%' : 0, opacity: 0 }),
};

const IMAGE_SIZES = '100vw';
const IMAGE_QUALITY = 85;

const controlButton =
  'flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/90 transition hover:border-[#d6a85f] hover:bg-[#d6a85f] hover:text-[#1a1512] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a85f]';

function ShareMenu({ photo, onCopyLink, onInteract }) {
  const [isOpen, setIsOpenState] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  // Keep the viewer's controls pinned while the menu is open.
  const setIsOpen = useCallback((open) => {
    setIsOpenState(open);
    onInteract(open);
  }, [onInteract]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen, setIsOpen]);

  const openShareWindow = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
    setIsOpen(false);
  };

  const pageUrl = () => encodeURIComponent(window.location.href);
  const title = encodeURIComponent(photo.title);

  const handleCopy = async () => {
    await onCopyLink?.();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: photo.title, url: window.location.href });
      setIsOpen(false);
    } catch {
      // Cancelled by the user.
    }
  };

  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';
  const itemClass =
    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white/80 transition hover:bg-white/10 hover:text-white';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={controlButton}
        aria-label="Share photo"
        aria-expanded={isOpen}
      >
        <Share2 className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-full z-30 mt-2 w-52 rounded-2xl border border-white/10 bg-[#1a1512]/95 p-1.5 shadow-2xl"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <button type="button" onClick={handleCopy} className={itemClass}>
              {copied ? <Check className="h-4 w-4 text-[#d6a85f]" /> : <Link2 className="h-4 w-4" />}
              {copied ? 'Link copied' : 'Copy link'}
            </button>
            {canNativeShare && (
              <button type="button" onClick={handleNativeShare} className={itemClass}>
                <Share2 className="h-4 w-4" />
                Share via…
              </button>
            )}
            <button
              type="button"
              onClick={() => openShareWindow(`https://twitter.com/intent/tweet?text=${title}&url=${pageUrl()}`)}
              className={itemClass}
            >
              <Twitter className="h-4 w-4" />
              Share on X
            </button>
            <button
              type="button"
              onClick={() => openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl()}`)}
              className={itemClass}
            >
              <Facebook className="h-4 w-4" />
              Share on Facebook
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ViewerContent({ photo, photos, currentIndex, onClose, navigatePhoto, onShare }) {
  const panelRef = useRef(null);
  const hideTimerRef = useRef(0);
  // Controls stay up while a menu is open or the mouse rests on them.
  const pinsRef = useRef({ menu: false, hover: false });
  const isPinnedRef = useRef(false);
  const [isChromeVisible, setIsChromeVisible] = useState(true);
  const [direction, setDirection] = useState(0);
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);

  const total = photos.length;
  const hasNavigation = total > 1;
  const isLoaded = loadedSrc === photo.src;
  const prevPhoto = hasNavigation ? photos[(currentIndex - 1 + total) % total] : null;
  const nextPhoto = hasNavigation ? photos[(currentIndex + 1) % total] : null;

  const clearHideTimer = () => window.clearTimeout(hideTimerRef.current);

  const showChrome = useCallback((duration) => {
    clearHideTimer();
    setIsChromeVisible(true);
    hideTimerRef.current = window.setTimeout(() => {
      // Keep the controls up while a menu is open or the pointer rests on them.
      if (!isPinnedRef.current) setIsChromeVisible(false);
    }, duration);
  }, []);

  const hideChrome = useCallback(() => {
    clearHideTimer();
    setIsChromeVisible(false);
  }, []);

  const setPin = useCallback((key, pinned) => {
    pinsRef.current[key] = pinned;
    isPinnedRef.current = pinsRef.current.menu || pinsRef.current.hover;
    if (!isPinnedRef.current) showChrome(MOUSE_SHOW_MS);
  }, [showChrome]);

  const setMenuPinned = useCallback((pinned) => setPin('menu', pinned), [setPin]);

  // Show the controls briefly on open, then get out of the way.
  useEffect(() => {
    hideTimerRef.current = window.setTimeout(() => {
      if (!isPinnedRef.current) setIsChromeVisible(false);
    }, INITIAL_HIDE_MS);
    return clearHideTimer;
  }, []);

  // Freeze the page's smooth scrolling underneath the viewer.
  useEffect(() => {
    window.lenis?.stop();
    return () => window.lenis?.start();
  }, []);

  // Native fullscreen (not available for elements on iPhone Safari).
  useEffect(() => {
    const element = panelRef.current;
    const supported = Boolean(element?.requestFullscreen) && document.fullscreenEnabled !== false;
    const frame = requestAnimationFrame(() => setCanFullscreen(supported));
    const handleChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handleChange);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('fullscreenchange', handleChange);
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    } else {
      panelRef.current?.requestFullscreen?.().catch(() => {});
    }
  }, []);

  const go = useCallback((step) => {
    if (!hasNavigation) return;
    setDirection(step);
    navigatePhoto(step > 0 ? 'next' : 'prev');
  }, [hasNavigation, navigatePhoto]);

  // Keyboard: arrows to browse, F for fullscreen (Escape is handled by the dialog).
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
      if ((event.key === 'f' || event.key === 'F') && canFullscreen) toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [go, canFullscreen, toggleFullscreen]);

  // Tap: hidden → show for a moment; visible → hide straight away.
  const handleTap = () => {
    if (isChromeVisible) hideChrome();
    else showChrome(TAP_SHOW_MS);
  };

  // Mouse users get the controls back by moving the mouse.
  const handleMouseMove = (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    if (Math.abs(event.movementX) + Math.abs(event.movementY) < 4) return;
    showChrome(MOUSE_SHOW_MS);
  };

  const handleDragEnd = (_event, info) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) go(1);
    else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) go(-1);
  };

  const chromeClass = `transition-opacity duration-300 ${
    isChromeVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
  }`;
  const pinHandlers = {
    onPointerEnter: (event) => event.pointerType === 'mouse' && setPin('hover', true),
    onPointerLeave: (event) => event.pointerType === 'mouse' && setPin('hover', false),
  };

  return (
    <DialogPanel
      ref={panelRef}
      className={`fixed inset-0 overflow-hidden bg-[#0d0b0a] text-[#f2efe9] ${isChromeVisible ? '' : 'cursor-none'}`}
      onPointerMove={handleMouseMove}
    >
      {/* Image stage */}
      <div className="absolute inset-0 md:inset-x-24 md:bottom-24 md:top-20">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-[#d6a85f]" />
          </div>
        )}

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={photo.src}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: 'spring', stiffness: 320, damping: 34 }, opacity: { duration: 0.2 } }}
            drag={hasNavigation ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.55}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            onTap={handleTap}
            className="absolute inset-0 touch-pan-y select-none"
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              sizes={IMAGE_SIZES}
              quality={IMAGE_QUALITY}
              priority
              draggable={false}
              onLoad={() => setLoadedSrc(photo.src)}
              className={`pointer-events-none object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Warm the cache for the neighbours so swiping feels instant */}
        {[prevPhoto, nextPhoto].filter(Boolean).map((neighbour) => (
          <Image
            key={`preload-${neighbour.src}`}
            src={neighbour.src}
            alt=""
            aria-hidden="true"
            fill
            sizes={IMAGE_SIZES}
            quality={IMAGE_QUALITY}
            loading="eager"
            className="invisible"
          />
        ))}
      </div>

      {/* Top bar */}
      <div className={`absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black/70 to-transparent px-4 pb-10 pt-4 md:bg-none md:px-8 md:pt-6 ${chromeClass}`}>
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
            <span className="text-[#d6a85f]">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="px-1.5 text-white/30">/</span>
            {String(total).padStart(2, '0')}
          </p>
          <div className="flex items-center gap-2" {...pinHandlers}>
            <ShareMenu photo={photo} onCopyLink={onShare} onInteract={setMenuPinned} />
            {canFullscreen && (
              <button
                type="button"
                onClick={toggleFullscreen}
                className={`${controlButton} hidden sm:flex`}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            )}
            <button type="button" onClick={onClose} className={controlButton} aria-label="Close viewer">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Side arrows: larger screens only (phones swipe) */}
      {hasNavigation && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className={`${controlButton} absolute left-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 md:flex ${chromeClass}`}
            aria-label="Previous photo"
            {...pinHandlers}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className={`${controlButton} absolute right-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 md:flex ${chromeClass}`}
            aria-label="Next photo"
            {...pinHandlers}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Caption */}
      <div className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 to-transparent px-4 pb-6 pt-16 md:bg-none md:px-8 md:pb-7 md:pt-0 ${chromeClass}`}>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center">
          <span className="rounded-full bg-[#d6a85f] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1a1512]">
            {photo.category}
          </span>
          <DialogTitle
            className="text-lg leading-tight text-white md:text-2xl"
            style={{ fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif' }}
          >
            {photo.title}
          </DialogTitle>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35 md:hidden">
            {hasNavigation ? 'Swipe to browse · Tap to hide' : 'Tap to hide'}
          </p>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-white/30 md:block">
            {hasNavigation ? '← → browse · ' : ''}{canFullscreen ? 'F fullscreen · ' : ''}Esc close
          </p>
        </div>
      </div>
    </DialogPanel>
  );
}

export default function PhotoViewer({ selectedPhoto, photos, currentIndex, closeModals, navigatePhoto, onShare }) {
  return (
    <Dialog open={Boolean(selectedPhoto)} onClose={closeModals} className="relative z-[100]">
      {selectedPhoto && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <ViewerContent
            photo={selectedPhoto}
            photos={photos.length ? photos : [selectedPhoto]}
            currentIndex={photos.length ? currentIndex : 0}
            onClose={closeModals}
            navigatePhoto={navigatePhoto}
            onShare={onShare}
          />
        </motion.div>
      )}
    </Dialog>
  );
}
