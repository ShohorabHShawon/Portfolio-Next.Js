'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, ExternalLink, Mail, Play, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import SiteNavbar, { scrollToId } from '@/components/SiteNavbar';
import { clients } from '../../../clients/clientData';
import { photos } from '../../components/photoData';

const FILM_STRIP_LENGTH = 12;

// Fisher-Yates pick of `count` random photos from the whole archive.
const pickRandomPhotos = (count) => {
  const pool = [...photos];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
};

const DISCIPLINES = [
  'Cinematography',
  'Visual poetry',
  'Brand films',
  'Color grading',
  'Street photography',
  'Creative direction',
];

const SERVICES = [
  { title: 'Brand films', detail: 'Short-form stories for cafés, labels and campaigns.' },
  { title: 'Cinematography', detail: 'Intimate, light-led camera work for music and narrative.' },
  { title: 'Color grading', detail: 'Filmic looks built in DaVinci Resolve.' },
  { title: 'Photography', detail: 'Street, portrait and editorial stills.' },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/shohorabs.pov/' },
  { label: 'Facebook', href: 'https://www.facebook.com/shohorabhshawon/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shohorabhshawon/' },
];

const HERO_SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/shohorabs.pov/', Icon: FaInstagram },
  { label: 'Facebook', href: 'https://www.facebook.com/shohorabhshawon/', Icon: FaFacebookF },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function SectionLabel({ index, children, className = '' }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] ${className}`}>
      <span className="inline-block h-px w-8 bg-current opacity-60" />
      {children} / {index}
    </p>
  );
}

// Toggles a class that pauses CSS loops while the element is off screen.
function useOffscreenPause() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      element.classList.toggle('offscreen-paused', !entry.isIntersecting);
    }, { rootMargin: '100px 0px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}

const formatTimecode = (frames) => {
  const pad = (value) => String(value).padStart(2, '0');
  const totalSeconds = Math.floor(frames / 24);
  return `${pad(Math.floor(totalSeconds / 3600))}:${pad(Math.floor(totalSeconds / 60) % 60)}:${pad(totalSeconds % 60)}:${pad(frames % 24)}`;
};

// Running 24fps timecode, like a camera monitor. Writes straight to the DOM
// so the page does not re-render on every frame.
function Timecode() {
  const ref = useRef(null);

  useEffect(() => {
    const start = performance.now();
    let lastFrames = -1;

    const intervalId = window.setInterval(() => {
      const frames = Math.floor(((performance.now() - start) / 1000) * 24);
      if (frames === lastFrames || !ref.current) return;
      lastFrames = frames;
      ref.current.textContent = formatTimecode(frames);
    }, 1000 / 24);

    return () => window.clearInterval(intervalId);
  }, []);

  return <span ref={ref} className="tabular-nums">{formatTimecode(0)}</span>;
}

// Pauses the background film while it is off screen or the tab is hidden,
// so scrolling the rest of the page does not compete with video decoding.
function HeroVideo() {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;

    let isVisible = true;
    const sync = () => {
      if (isVisible && !document.hidden) {
        const playPromise = video.play();
        if (playPromise) playPromise.catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        sync();
      });

    observer?.observe(video);
    document.addEventListener('visibilitychange', sync);

    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      src="/herocover.mp4"
      poster="/cover-web.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover object-center opacity-65"
    />
  );
}

function ViewfinderCorners() {
  const corner = 'absolute h-6 w-6 border-white/45 md:h-9 md:w-9';
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-4 z-[5] hidden sm:block md:inset-8">
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
      <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-white/25" />
      <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-white/25" />
    </div>
  );
}

function Marquee({ items, duration = '40s', className = '', itemClassName = '', separator = '✦' }) {
  const loop = [...items, ...items];
  const ref = useOffscreenPause();
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee motion-reduce:animate-none"
        style={{ '--marquee-duration': duration }}
      >
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} aria-hidden={index >= items.length} className={`flex shrink-0 items-center ${itemClassName}`}>
            {item}
            <span className="px-6 text-[#d6a85f]/60 md:px-10">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// YouTube's high-res still, falling back to the small one when a film has none
// (YouTube answers a missing maxres image with a 120px placeholder).
function FilmThumb({ video, className = '', loading = 'lazy' }) {
  const [useFallback, setUseFallback] = useState(false);
  const src = useFallback && video.thumbnailFallbackSrc ? video.thumbnailFallbackSrc : video.thumbnailSrc;

  if (!src) {
    return <span aria-hidden="true" className={`block bg-[#1a1512] ${className}`} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote YouTube stills, already sized by YouTube
    <img
      src={src}
      alt=""
      loading={loading}
      decoding="async"
      draggable={false}
      onError={() => setUseFallback(true)}
      onLoad={(event) => {
        if (!useFallback && event.currentTarget.naturalWidth <= 120) setUseFallback(true);
      }}
      className={`object-cover ${className}`}
    />
  );
}

const primaryLink = (video) => (video.links || []).find((link) => /youtu/i.test(link.url)) || (video.links || [])[0];

// The latest film, presented like the screen in a cinema.
function FeaturedFilm({ video, total, onPlay }) {
  const ref = useOffscreenPause();
  const link = primaryLink(video);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden bg-black shadow-[0_40px_120px_-40px_rgba(214,168,95,0.25)]"
    >
      <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[21/9]">
        <FilmThumb video={video} loading="eager" className="kenburns absolute inset-0 h-full w-full opacity-80 transition-opacity duration-700 group-hover:opacity-95" />

        {/* Grade + letterbox */}
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,11,10,0.92)_0%,rgba(13,11,10,0.55)_38%,transparent_70%),linear-gradient(0deg,rgba(13,11,10,0.95)_0%,transparent_45%)]" />
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[6%] bg-black" />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[6%] bg-black" />

        {/* Whole screen plays the film */}
        <button
          type="button"
          onClick={() => onPlay(video)}
          aria-label={`Play ${video.title || 'film'}`}
          className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d6a85f]"
        />

        <div className="pointer-events-none absolute inset-x-0 top-[6%] z-20 flex items-center justify-between px-5 pt-4 font-mono text-[10px] uppercase tracking-[0.25em] md:px-10 md:pt-6">
          <span className="flex items-center gap-2 text-white/85">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#c4473a] shadow-[0_0_10px_rgba(196,71,58,0.9)]" />
            Now showing
          </span>
          <span className="text-white/45">
            <span className="text-[#d6a85f]">01</span> / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Play target */}
        <span aria-hidden="true" className="pointer-events-none absolute right-[8%] top-1/2 z-20 hidden -translate-y-1/2 lg:block">
          <span className="relative flex h-28 w-28 items-center justify-center">
            <span className="absolute inset-0 animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border border-[#d6a85f]/50" />
            <span className="absolute inset-0 rounded-full border border-[#d6a85f]/40" />
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#d6a85f] text-[#1a1512] transition duration-500 group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </span>
        </span>

        <div className="pointer-events-none absolute inset-x-0 bottom-[6%] z-20 px-5 pb-6 md:px-10 md:pb-10">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d6a85f]">Latest release</p>
          <h3 className="max-w-3xl text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[0.88] tracking-[-0.055em] text-[#f2efe9]">
            {video.title || 'Untitled film'}
          </h3>
          {video.description ? (
            <p className="mt-4 max-w-md text-sm text-white/55">{video.description}</p>
          ) : null}
          <div className="pointer-events-auto mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onPlay(video)}
              className="relative z-30 inline-flex items-center gap-3 bg-[#d6a85f] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1512] transition hover:bg-[#f2efe9]"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Play film
            </button>
            {link ? (
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="relative z-30 inline-flex items-center gap-2 border border-white/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 transition hover:border-[#d6a85f] hover:text-[#d6a85f]"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// Every film as an index. On desktop a preview of the hovered film follows the cursor.
// `startNumber` keeps the numbering continuous after the featured film (01).
function FilmReel({ videos, onPlay, startNumber = 1 }) {
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const frameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  const movePreview = (event) => {
    if (event.pointerType !== 'mouse') return;
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;

    const { clientX, clientY } = event;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const rect = list.getBoundingClientRect();
      const x = clientX - rect.left - preview.offsetWidth / 2;
      const y = clientY - rect.top - preview.offsetHeight / 2;
      preview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <div
      ref={listRef}
      className="relative"
      onPointerMove={movePreview}
      onPointerLeave={() => setActiveIndex(-1)}
    >
      {/* Floating preview (desktop) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[22rem] transition-transform duration-[250ms] ease-out will-change-transform lg:block"
      >
        <div
          className={`relative aspect-video -rotate-3 overflow-hidden bg-black shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-[#d6a85f]/40 transition duration-300 ${
            activeIndex >= 0 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          {videos.map((video, index) => (
            <FilmThumb
              key={video.id || video.src}
              video={video}
              className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <span className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#d6a85f]">
            <Play className="h-3 w-3 fill-current" />
            Play
          </span>
        </div>
      </div>

      <ol className="border-t border-white/10">
        {videos.map((video, index) => (
          <li key={video.id || video.src}>
            <button
              type="button"
              onClick={() => onPlay(video)}
              onPointerEnter={(event) => event.pointerType === 'mouse' && setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(-1)}
              className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden border-b border-white/10 py-5 text-left outline-none md:gap-8 md:py-8"
            >
              {/* Sweep */}
              <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#d6a85f]/[0.09] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />

              <span className="relative flex items-center gap-4">
                <span className="w-8 font-mono text-[11px] tracking-[0.2em] text-white/35 transition-colors group-hover:text-[#d6a85f]">
                  {String(index + startNumber).padStart(2, '0')}
                </span>
                {/* Small still on touch screens */}
                <span className="relative block aspect-video w-24 shrink-0 overflow-hidden bg-black sm:w-32 lg:hidden">
                  <FilmThumb video={video} className="absolute inset-0 h-full w-full" />
                </span>
              </span>

              <span className="relative min-w-0">
                <span className="line-clamp-2 block text-lg font-medium leading-tight tracking-[-0.03em] text-[#f2efe9] transition duration-500 sm:text-xl md:truncate md:leading-normal group-hover:translate-x-3 group-hover:text-[#d6a85f] md:text-5xl md:tracking-[-0.05em]">
                  {video.title || 'Untitled film'}
                </span>
                <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.22em] text-white/35 md:hidden">
                  Short film
                </span>
              </span>

              <span className="relative flex items-center gap-6">
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/35 md:block">
                  Short film
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition duration-300 group-hover:border-[#d6a85f] group-hover:bg-[#d6a85f] group-hover:text-[#1a1512] md:h-12 md:w-12">
                  <Play className="ml-0.5 h-3.5 w-3.5 fill-current md:h-4 md:w-4" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

const FACEBOOK_PAGE = 'https://www.facebook.com/shohorabhshawon/';

const linkIcon = (url) => {
  if (/youtu/i.test(url)) return FaYoutube;
  if (/instagram/i.test(url)) return FaInstagram;
  if (/facebook/i.test(url)) return FaFacebookF;
  return ExternalLink;
};

// Start the film as soon as the player opens (the click that opened it counts as the user's gesture).
const withAutoplay = (src) => {
  if (!src || !/youtube\.com\/embed/i.test(src)) return src;
  const separator = src.includes('?') ? '&' : '?';
  return `${src}${separator}autoplay=1&rel=0&modestbranding=1&playsinline=1`;
};

function VideoModal({ video, videos = [], onClose, onNavigate, hasNavigation }) {
  const closeRef = useRef(null);
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    if (!video) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (hasNavigation && event.key === 'ArrowRight') onNavigate('next');
      if (hasNavigation && event.key === 'ArrowLeft') onNavigate('previous');
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.lenis?.stop();
    window.addEventListener('keydown', handleKeyDown);
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose, onNavigate, hasNavigation]);

  if (!video) return null;

  const total = videos.length;
  const index = Math.max(0, videos.findIndex((item) => (item.id || item.src) === (video.id || video.src)));
  const previous = hasNavigation ? videos[(index - 1 + total) % total] : null;
  const next = hasNavigation ? videos[(index + 1) % total] : null;
  const isLoaded = loadedSrc === video.src;

  // Your own links first, then the Facebook page (unless a link already points there).
  const links = [...(video.links || [])];
  if (!links.some((link) => link.url.replace(/\/$/, '') === FACEBOOK_PAGE.replace(/\/$/, ''))) {
    links.push({ label: 'Facebook page', url: FACEBOOK_PAGE });
  }

  const corner = 'pointer-events-none absolute h-5 w-5 border-[#d6a85f] md:h-7 md:w-7';

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#0d0b0a]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title || 'Film'}
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      {/* Projector glow + grain */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(55%_45%_at_50%_35%,rgba(214,168,95,0.10),transparent_70%)]" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.7px,transparent_0.8px)] [background-size:4px_4px]" />

      {/* On desktop the player is sized from the window height so the details and film navigation stay on screen. */}
      <div className="relative mx-auto flex min-h-full w-full max-w-6xl flex-col px-4 pb-8 pt-4 md:max-w-[max(44rem,min(72rem,calc((100svh-24rem)*1.778)))] md:px-8 md:pb-6 md:pt-6">
        {/* Top bar */}
        <div className="mb-4 flex items-center justify-between gap-4 md:mb-6" onClick={(event) => event.stopPropagation()}>
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#c4473a] shadow-[0_0_10px_rgba(196,71,58,0.9)]" />
            Now playing
            {total > 1 ? (
              <span className="text-white/35">
                <span className="text-[#d6a85f]">{String(index + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
              </span>
            ) : null}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60 outline-none transition hover:text-[#d6a85f] focus-visible:text-[#d6a85f]"
            aria-label="Close video"
          >
            <span className="hidden sm:inline">Close · Esc</span>
            <span className="flex h-10 w-10 items-center justify-center border border-white/20 transition group-hover:border-[#d6a85f] group-hover:bg-[#d6a85f] group-hover:text-[#1a1512] group-focus-visible:border-[#d6a85f]">
              <X className="h-4 w-4" />
            </span>
          </button>
        </div>

        <div className="my-auto" onClick={(event) => event.stopPropagation()}>
          {/* Player in a viewfinder */}
          <motion.div
            key={video.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-2 md:p-3"
          >
            <span aria-hidden="true" className={`${corner} left-0 top-0 border-l border-t`} />
            <span aria-hidden="true" className={`${corner} right-0 top-0 border-r border-t`} />
            <span aria-hidden="true" className={`${corner} bottom-0 left-0 border-b border-l`} />
            <span aria-hidden="true" className={`${corner} bottom-0 right-0 border-b border-r`} />

            <div className="relative aspect-video w-full overflow-hidden bg-black shadow-[0_40px_120px_-30px_rgba(214,168,95,0.22)]">
              {!isLoaded ? (
                <div aria-hidden="true" className="absolute inset-0">
                  {video.thumbnailSrc ? <FilmThumb video={video} loading="eager" className="absolute inset-0 h-full w-full opacity-40" /> : null}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-[#d6a85f]" />
                  </span>
                </div>
              ) : null}
              <iframe
                key={video.src}
                src={withAutoplay(video.src)}
                title={video.title}
                onLoad={() => setLoadedSrc(video.src)}
                className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Details */}
          <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
            <div className="min-w-0">
              <p className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d6a85f]">
                <span className="inline-block h-px w-8 bg-current opacity-60" />
                SHS / Film archive
              </p>
              <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[0.95] tracking-[-0.05em] text-[#f2efe9]">
                {video.title || 'Untitled film'}
              </h2>
              {video.description ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">{video.description}</p> : null}
            </div>

            <div className="flex flex-wrap gap-2 md:max-w-sm md:justify-end">
              {links.map((link) => {
                const Icon = linkIcon(link.url);
                return (
                  <a
                    key={`${link.label}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 border border-white/15 bg-white/[0.03] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/75 transition hover:border-[#d6a85f] hover:bg-[#d6a85f] hover:text-[#1a1512]"
                  >
                    <Icon className="h-3.5 w-3.5 text-[#d6a85f] transition group-hover:text-[#1a1512]" />
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Previous / next film */}
          {hasNavigation && previous && next ? (
            <div className="mt-8 grid grid-cols-2 border-t border-white/10 md:mt-10">
              <button
                type="button"
                onClick={() => onNavigate('previous')}
                className="group flex min-w-0 items-center gap-3 border-r border-white/10 py-5 pr-4 text-left transition hover:bg-white/[0.02]"
                aria-label={`Previous film: ${previous.title || 'Untitled film'}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-[#d6a85f] transition group-hover:border-[#d6a85f] group-hover:bg-[#d6a85f] group-hover:text-[#1a1512]">
                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">Previous film</span>
                  <span className="mt-1 block truncate text-sm text-white/80 transition group-hover:text-[#d6a85f] md:text-base">{previous.title || 'Untitled film'}</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('next')}
                className="group flex min-w-0 items-center justify-end gap-3 py-5 pl-4 text-right transition hover:bg-white/[0.02]"
                aria-label={`Next film: ${next.title || 'Untitled film'}`}
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">Next film</span>
                  <span className="mt-1 block truncate text-sm text-white/80 transition group-hover:text-[#d6a85f] md:text-base">{next.title || 'Untitled film'}</span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-[#d6a85f] transition group-hover:border-[#d6a85f] group-hover:bg-[#d6a85f] group-hover:text-[#1a1512]">
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </button>
            </div>
          ) : null}

          <p className="mt-4 hidden text-center font-mono text-[9px] uppercase tracking-[0.25em] text-white/25 md:block">
            {hasNavigation ? '← → to browse · Esc to close' : 'Esc to close'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const CONTACT_EMAIL = 'shohorabhshawon@gmail.com';
// Pre-filled subject so enquiries from the site are easy to spot in the inbox.
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Project inquiry — shohorab.com')}`;

const SOCIAL_ICONS = { Instagram: FaInstagram, Facebook: FaFacebookF, LinkedIn: FaLinkedinIn };

// Many desktop visitors have no mail app set up, so the address can also be copied.
function ContactEmail() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      window.prompt('Copy this email address', CONTACT_EMAIL);
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mt-12 flex flex-col gap-5 border border-white/10 bg-white/[0.02] p-5 md:mt-16 md:flex-row md:items-center md:justify-between md:p-7">
      <div className="min-w-0">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          <Mail className="h-3.5 w-3.5 text-[#d6a85f]" />
          Write to
        </p>
        <a
          href={CONTACT_MAILTO}
          className="mt-2 block break-all text-xl font-medium tracking-[-0.03em] text-[#f2efe9] transition hover:text-[#d6a85f] sm:text-2xl md:text-3xl"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        <button
          type="button"
          onClick={copyEmail}
          aria-live="polite"
          className={`inline-flex items-center gap-2 border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
            copied
              ? 'border-[#d6a85f] bg-[#d6a85f] text-[#1a1512]'
              : 'border-white/20 text-white/75 hover:border-[#d6a85f] hover:text-[#d6a85f]'
          }`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy email'}
        </button>
        <a
          href={CONTACT_MAILTO}
          className="group inline-flex items-center gap-2 bg-[#d6a85f] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1512] transition hover:bg-[#f2efe9]"
        >
          Open in mail
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

const dhakaTimeFormat = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit' });

// Live local time in Dhaka, so clients abroad know when to expect a reply.
// Rendered after mount (the server's clock would not match the visitor's render).
function DhakaTime() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const update = () => setTime(dhakaTimeFormat.format(new Date()));
    const firstId = window.setTimeout(update, 0);
    const intervalId = window.setInterval(update, 30_000);
    return () => {
      window.clearTimeout(firstId);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <p className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c4473a]" />
      <span className="tabular-nums text-white/75">{time || '--:--'}</span> in Dhaka (GMT+6)
    </p>
  );
}

function SprocketRow() {
  return (
    <div
      aria-hidden="true"
      className="h-4 w-full opacity-70 [background-image:linear-gradient(90deg,rgba(242,239,233,0.16)_0_14px,transparent_14px)] [background-position:6px_center] [background-repeat:repeat-x] [background-size:28px_8px]"
    />
  );
}

export default function FilmmakerPhotographyTheme({ videos = [] }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const filmStripRef = useOffscreenPause();
  // Server and first client render share the same strip (no hydration mismatch);
  // a fresh random selection replaces it right after mount, well before it scrolls into view.
  const [filmStrip, setFilmStrip] = useState(() => photos.slice(0, FILM_STRIP_LENGTH));

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setFilmStrip(pickRandomPhotos(FILM_STRIP_LENGTH)));
    return () => cancelAnimationFrame(rafId);
  }, []);

  const closeVideo = useCallback(() => setSelectedVideo(null), []);

  const navigateVideo = useCallback((direction) => {
    if (videos.length < 2) return;

    setSelectedVideo((current) => {
      if (!current) return current;
      const currentIndex = videos.findIndex(
        (video) => (video.id || video.src) === (current.id || current.src),
      );
      const safeIndex = currentIndex >= 0 ? currentIndex : 0;
      const nextIndex = direction === 'next'
        ? (safeIndex + 1) % videos.length
        : (safeIndex - 1 + videos.length) % videos.length;

      return videos[nextIndex];
    });
  }, [videos]);

  const [featuredVideo, ...restVideos] = videos;

  return (
    <div id="top" className="min-h-screen bg-[#1a1512] text-[#f2efe9] selection:bg-[#d6a85f] selection:text-black">
      <SiteNavbar onHome />

      <main className="relative w-full overflow-x-clip">
        {/* Hero */}
        <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-8 pt-24 md:px-10 md:pb-10 md:pt-28">
          <div className="absolute inset-0 overflow-hidden bg-[#120f0d]">
            <HeroVideo />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,21,18,0.94)_0%,rgba(26,21,18,0.78)_24%,rgba(26,21,18,0.28)_52%,rgba(26,21,18,0.1)_78%),linear-gradient(0deg,rgba(26,21,18,0.9)_0%,transparent_40%),linear-gradient(180deg,rgba(26,21,18,0.6)_0%,transparent_22%)]" />
          {/* White dots look the same with normal blending as with `screen`, without re-blending every video frame */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.7px,transparent_0.8px)] [background-size:4px_4px]" />
          <ViewfinderCorners />

          {/* Camera monitor readout */}
          <div aria-hidden="true" className="pointer-events-none absolute right-8 top-24 z-10 hidden flex-col items-end gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 sm:flex md:right-14 md:top-28">
            <span className="flex items-center gap-2 text-white/85">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#a74336]" />
              Rec <Timecode />
            </span>
            <span>A-Cam · 4K · 24 fps</span>
            <span>ISO 800 · 1/50 · 5600K</span>
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[88rem] flex-1 flex-col justify-center py-10 md:py-16">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#d6a85f]">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#a74336] sm:hidden" />
              Dhaka · Bangladesh · {new Date().getFullYear()}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.6 }} className="mb-6 flex items-center gap-2 text-[clamp(0.75rem,1.3vw,1.05rem)] font-medium uppercase tracking-[0.24em] text-white/80">
              {/* The page's main heading is the name (the strongest on-page SEO signal); it looks the same as before. */}
              <h1 className="font-medium">
                Shohorab H Shawon
                <span className="sr-only"> — Filmmaker, Visual Storyteller, Photographer &amp; Software Developer</span>
              </h1>
              <svg aria-label="Verified profile" role="img" viewBox="0 0 24 24" className="h-[clamp(0.85rem,1.6vw,1.15rem)] w-[clamp(0.85rem,1.6vw,1.15rem)] shrink-0 text-[#1877F2]">
                <defs>
                  <mask id="filmmaker-verified-badge-cutout">
                    <rect width="24" height="24" fill="black" />
                    <polygon points="12,0.5 14.46,2.82 17.75,2.04 18.72,5.28 21.96,6.25 21.18,9.54 23.5,12 21.18,14.46 21.96,17.75 18.72,18.72 17.75,21.96 14.46,21.18 12,23.5 9.54,21.18 6.25,21.96 5.28,18.72 2.04,17.75 2.82,14.46 0.5,12 2.82,9.54 2.04,6.25 5.28,5.28 6.25,2.04 9.54,2.82" fill="white" />
                    <path d="m9 12 2 2 4-4" fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
                  </mask>
                </defs>
                <rect width="24" height="24" fill="currentColor" mask="url(#filmmaker-verified-badge-cutout)" />
              </svg>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="max-w-5xl text-[clamp(3.6rem,10vw,9.5rem)] font-medium leading-[0.86] tracking-[-0.07em]">
              Stories that<br />
              <span className="text-[#d6a85f]">move.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.8 }} className="mt-10 max-w-xl">
              <p className="max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                Filmmaker and visual artist crafting intimate films, visual poetry, and images with a pulse.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => scrollToId('work')} className="group flex items-center gap-3 border border-[#d6a85f] bg-[#d6a85f] px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-black transition hover:border-white hover:bg-white">
                  Explore the work <ArrowDownRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:translate-y-1" />
                </button>
                {featuredVideo ? (
                  <button type="button" onClick={() => setSelectedVideo(featuredVideo)} className="group flex items-center gap-3 border border-white/35 px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-white transition hover:border-[#d6a85f] hover:bg-[#d6a85f] hover:text-[#1a1512]">
                    <Play className="h-4 w-4 fill-current transition group-hover:scale-110" />
                    Watch showreel
                  </button>
                ) : null}
                {HERO_SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Shohorab H Shawon on ${label}`}
                    title={label}
                    className="flex h-[42px] w-[42px] items-center justify-center border border-white/35 text-white transition hover:border-[#d6a85f] hover:bg-[#d6a85f] hover:text-[#1a1512]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                <Link href="/photos" className="group inline-flex items-center gap-1.5 transition hover:text-[#d6a85f]">
                  Photographs <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link href="/clients" className="group inline-flex items-center gap-1.5 transition hover:text-[#d6a85f]">
                  Clients <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link href="/journal" className="group inline-flex items-center gap-1.5 transition hover:text-[#d6a85f]">
                  Journal <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[88rem] items-end justify-between gap-6 border-t border-white/20 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
            <span>Independent filmmaker / visual storyteller</span>
            <button type="button" onClick={() => scrollToId('work')} className="hidden items-center gap-3 transition hover:text-[#d6a85f] md:flex">
              Scroll to discover
              <span className="relative block h-8 w-px overflow-hidden bg-white/15">
                <motion.span
                  className="absolute inset-x-0 top-0 h-1/2 bg-[#d6a85f]"
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
            </button>
          </div>
        </section>

        {/* Disciplines ticker */}
        <div className="border-y border-[#d6a85f]/20 bg-[#120f0d] py-5 md:py-6">
          <Marquee
            items={DISCIPLINES}
            duration="45s"
            itemClassName="text-xl font-medium uppercase tracking-[-0.02em] text-[#f2efe9]/80 md:text-3xl"
          />
        </div>

        {/* Work */}
        <section id="work" className="relative isolate overflow-clip bg-[#0d0b0a] px-5 py-20 md:px-10 md:py-28">
          {/* Projector spill + grain: a screening room */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(214,168,95,0.10),transparent_70%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.7px,transparent_0.8px)] [background-size:4px_4px]" />

          <div className="mx-auto w-full max-w-[88rem]">
            <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
              <div>
                <SectionLabel index="01" className="mb-5 text-[#d6a85f]">Selected work</SectionLabel>
                <h2 className="text-[clamp(3rem,8vw,7.5rem)] font-medium leading-[0.86] tracking-[-0.06em]">
                  Films in{' '}
                  <span className="[font-family:var(--font-display),Georgia,serif] font-normal italic tracking-[-0.02em] text-[#d6a85f]">motion.</span>
                </h2>
              </div>
              <div className="max-w-xs md:text-right">
                <p className="text-sm leading-relaxed text-white/50">A quiet reel of stories, gestures, and light.</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                  <span className="text-[#d6a85f]">{String(videos.length).padStart(2, '0')}</span> films · Dhaka
                </p>
              </div>
            </div>

            {videos.length ? (
              <>
                <FeaturedFilm video={featuredVideo} total={videos.length} onPlay={setSelectedVideo} />

                {restVideos.length ? (
                <div className="mt-20 md:mt-28">
                  <div className="mb-6 flex items-end justify-between gap-6">
                    <h3 className="text-2xl font-medium tracking-[-0.04em] md:text-4xl">
                      The <span className="[font-family:var(--font-display),Georgia,serif] font-normal italic text-[#d6a85f]">reel</span>
                    </h3>
                    <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/35 lg:block">
                      Hover to preview · Click to play
                    </p>
                  </div>
                  <FilmReel videos={restVideos} startNumber={2} onPlay={setSelectedVideo} />
                </div>
                ) : null}
              </>
            ) : (
              <p className="border border-white/10 p-10 text-white/55">New films are currently in post-production.</p>
            )}
          </div>
        </section>

        {/* Still frames film strip */}
        <section id="frames" className="bg-[#1a1512] py-20 md:py-28">
          <div className="mx-auto mb-12 flex w-full max-w-[88rem] flex-col justify-between gap-6 px-5 md:flex-row md:items-end md:px-10">
            <div>
              <SectionLabel index="02" className="mb-4 text-[#d6a85f]">Still frames</SectionLabel>
              <h2 className="text-4xl tracking-[-0.05em] md:text-7xl">Between the takes</h2>
            </div>
            <Link href="/photos" className="group inline-flex items-center gap-3 self-start border border-white/30 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 transition hover:border-[#d6a85f] hover:bg-[#d6a85f] hover:text-[#1a1512] md:self-auto">
              View all photographs <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="-rotate-1 border-y border-white/10 bg-[#0d0b0a] py-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
            <SprocketRow />
            <div ref={filmStripRef} className="overflow-hidden py-2">
              <div className="flex w-max animate-marquee gap-2 hover:[animation-play-state:paused] motion-reduce:animate-none" style={{ '--marquee-duration': '70s' }}>
                {[...filmStrip, ...filmStrip].map((photo, index) => (
                  <Link
                    key={`${photo.src}-${index}`}
                    href="/photos"
                    aria-hidden={index >= filmStrip.length}
                    tabIndex={index >= filmStrip.length ? -1 : undefined}
                    className="group relative block h-44 w-64 shrink-0 overflow-hidden bg-[#120f0d] sm:h-56 sm:w-80 md:h-64 md:w-96"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                      className="object-cover opacity-80 grayscale-[35%] transition duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
                      <span className="truncate pr-3">{photo.title}</span>
                      <span className="shrink-0 text-[#d6a85f]">FR {String((index % filmStrip.length) + 1).padStart(3, '0')}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <SprocketRow />
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative isolate overflow-clip border-y border-[#d6a85f]/20 bg-[#120f0d] px-5 py-24 md:px-10 md:py-32">
          {/* Warm key light behind the portrait + grain */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_22%_45%,rgba(214,168,95,0.16),transparent_70%),radial-gradient(35%_40%_at_95%_0%,rgba(167,67,54,0.14),transparent_70%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.7px,transparent_0.8px)] [background-size:4px_4px]" />

          <div className="mx-auto w-full max-w-[88rem]">
            <div className="mb-14 flex items-center justify-between gap-6 border-b border-white/10 pb-5 md:mb-20">
              <SectionLabel index="03" className="text-[#d6a85f]">A little context</SectionLabel>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 sm:block">Behind the lens</span>
            </div>

            <div className="grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
              {/* Portrait */}
              {/* The frame watches the viewport: a clipped element doesn't count as visible on its own. */}
              <motion.figure
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="relative mx-auto w-full max-w-[26rem] lg:sticky lg:top-28 lg:mx-0 lg:max-w-none"
              >
                <span aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 border border-[#d6a85f]/50 md:translate-x-6 md:translate-y-6" />
                <motion.div
                  variants={{
                    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
                    visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="relative aspect-[4/5] overflow-hidden bg-[#1a1512]"
                >
                  <Image
                    src="/shohorab1.JPG"
                    alt="Portrait of Shohorab H Shawon"
                    fill
                    sizes="(max-width: 1024px) 90vw, 560px"
                    className="object-cover object-[50%_30%]"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#120f0d]/85 via-transparent to-[#120f0d]/30" />

                  {/* Viewfinder corners */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-4 md:inset-5">
                    <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-white/60" />
                    <span className="absolute right-0 top-0 h-6 w-6 border-r border-t border-white/60" />
                    <span className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-white/60" />
                    <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-white/60" />
                  </span>

                  <span className="absolute left-7 top-7 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/85 md:left-9 md:top-9">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c4473a]" />
                    Self portrait
                  </span>
                  <figcaption className="absolute inset-x-7 bottom-7 flex items-end justify-between gap-4 md:inset-x-9 md:bottom-9">
                    <span>
                      <span className="block [font-family:var(--font-display),Georgia,serif] text-2xl leading-none text-white md:text-3xl">Shohorab H Shawon</span>
                      <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.22em] text-[#d6a85f]">Film · Photo · Code</span>
                    </span>
                    <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.22em] text-white/60">Dhaka, BD</span>
                  </figcaption>
                </motion.div>

                {/* Rotating stamp */}
                <span aria-hidden="true" className="absolute -right-2 -top-8 flex h-28 w-28 items-center justify-center rounded-full bg-[#120f0d] md:-right-10 md:-top-10 md:h-32 md:w-32">
                  <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite] motion-reduce:animate-none">
                    <defs>
                      <path id="about-stamp-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
                    </defs>
                    <text className="fill-[#d6a85f] font-mono text-[9.5px] uppercase tracking-[0.32em]">
                      <textPath href="#about-stamp-circle">Film · Photo · Code · Dhaka · </textPath>
                    </text>
                  </svg>
                  <span className="[font-family:var(--font-display),Georgia,serif] text-3xl italic text-[#f2efe9]">S</span>
                </span>
              </motion.figure>

              {/* Story */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                <motion.p variants={reveal} className="max-w-3xl text-[clamp(2.4rem,5.4vw,5.2rem)] font-medium leading-[0.95] tracking-[-0.055em] text-[#f2efe9]">
                  A Software Engineer who is doing what he really{' '}
                  <span className="[font-family:var(--font-display),Georgia,serif] font-normal italic tracking-[-0.02em] text-[#d6a85f]">loves.</span>
                </motion.p>
                <motion.p variants={reveal} className="mt-9 max-w-xl text-lg leading-relaxed text-white/60">
                  I specialize in brand shoots and visual storytelling, bringing narratives to life with intentional craft. Through cinematic color grading and street photography, I capture authentic moments that resonate on a deeper level.
                </motion.p>
                <motion.p variants={reveal} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  <span className="text-[#d6a85f]">B.Sc. in CSE</span>
                  <span aria-hidden="true" className="text-white/25">·</span>
                  American International University-Bangladesh (AIUB)
                </motion.p>

                <motion.ul variants={reveal} className="mt-14 grid gap-3 sm:grid-cols-2">
                  {SERVICES.map((service, index) => (
                    <li
                      key={service.title}
                      className="group relative overflow-hidden border border-white/10 bg-[#1a1512]/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d6a85f]/60 hover:bg-[#211914]"
                    >
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[#d6a85f] transition-transform duration-500 group-hover:scale-x-100" />
                      <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[#d6a85f]/80">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <ArrowUpRight className="h-4 w-4 opacity-0 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </span>
                      <p className="mt-8 text-2xl font-medium tracking-[-0.03em] text-[#f2efe9]">{service.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">{service.detail}</p>
                    </li>
                  ))}
                </motion.ul>

                <motion.div variants={reveal} className="mt-12 flex flex-wrap items-center gap-3">
                  <Link href="/dev" className="group inline-flex items-center gap-3 bg-[#d6a85f] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1512] transition hover:bg-[#f2efe9]">
                    The engineering side <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => scrollToId('contact')}
                    className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/75 transition hover:border-[#d6a85f] hover:text-[#d6a85f]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a74336]" />
                    Book a shoot
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section id="collaborations" className="bg-[#211914] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto w-full max-w-[88rem]">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <SectionLabel index="04" className="mb-5 text-[#d6a85f]">Collaborations</SectionLabel>
                <h2 className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.055em]">
                  Worked{' '}
                  <span className="[font-family:var(--font-display),Georgia,serif] font-normal italic tracking-[-0.02em] text-[#d6a85f]">with</span>
                </h2>
              </div>
              <Link href="/clients" className="group inline-flex items-center gap-2 self-start border border-white/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 transition hover:border-[#d6a85f] hover:text-[#d6a85f] md:self-auto">
                All clients <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
              {clients.map((client) => (
                <Link
                  key={client.name}
                  href="/clients"
                  className="group relative flex aspect-square flex-col overflow-hidden bg-[#1a1512] p-4 outline-none transition-colors duration-500 hover:bg-[#1d1713] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d6a85f] md:p-5"
                >
                  {/* Warm light that rises on hover */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_55%,rgba(214,168,95,0.16),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="relative flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em]">
                    <span className="text-[#d6a85f]/70">{client.number}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#d6a85f] opacity-0 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>

                  {/* Single-colour logo (see scripts/make-mono-logos.mjs), tinted with CSS */}
                  <span className="relative flex flex-1 items-center justify-center px-[12%] py-[6%]">
                    <span
                      role="img"
                      aria-label={`${client.name} logo`}
                      className="block h-full w-full bg-[#f2efe9]/70 transition duration-500 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] group-hover:scale-[1.06] group-hover:bg-[#d6a85f]"
                      style={{
                        maskImage: `url(${client.logo || client.image})`,
                        WebkitMaskImage: `url(${client.logo || client.image})`,
                      }}
                    />
                  </span>

                  <span className="relative block">
                    <span className="block truncate font-mono text-[9px] uppercase tracking-[0.18em] text-white/55 transition-colors group-hover:text-white/90">{client.name}</span>
                    <span className="mt-1 block truncate font-mono text-[8px] uppercase tracking-[0.18em] text-white/30 transition duration-300 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">{client.type}</span>
                  </span>
                </Link>
              ))}

              {/* Invitation tile */}
              <button
                type="button"
                onClick={() => scrollToId('contact')}
                className="group relative flex aspect-square flex-col justify-between overflow-hidden bg-[#d6a85f] p-4 text-left text-[#1a1512] outline-none transition-colors duration-500 hover:bg-[#e2b872] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f2efe9] md:p-5"
              >
                <span className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-[#1a1512]/60">
                  <span>{String(clients.length + 1).padStart(2, '0')}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a74336]" />
                </span>
                <span className="[font-family:var(--font-display),Georgia,serif] text-[clamp(1.6rem,2.6vw,2.4rem)] italic leading-[0.95]">
                  Your brand,
                  <br />
                  next?
                </span>
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em]">
                  Let&apos;s talk
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Contact / footer */}
        <footer id="contact" className="relative overflow-hidden border-t border-white/15 px-5 pb-8 pt-24 md:px-10 md:pt-32">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-10 select-none font-mono text-[22vw] font-bold leading-none tracking-[-0.08em] text-white/[0.025]">
            SHS
          </div>
          <div className="relative mx-auto w-full max-w-[88rem]">
            <SectionLabel index="05" className="mb-8 text-[#d6a85f]">Have a story in mind?</SectionLabel>
            <a href={CONTACT_MAILTO} className="group inline-flex items-center gap-4 text-[clamp(2.8rem,9vw,8rem)] font-medium leading-[0.9] tracking-[-0.06em] transition hover:text-[#d6a85f]">
              <span>
                Let&apos;s make{' '}
                <span className="[font-family:var(--font-display),Georgia,serif] font-normal italic tracking-[-0.02em] text-[#d6a85f]">it</span>
              </span>
              <ArrowUpRight className="h-[0.6em] w-[0.6em] shrink-0 transition group-hover:-translate-y-2 group-hover:translate-x-2" />
            </a>

            <ContactEmail />

            <div className="mt-16 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Based in</p>
                <p className="mt-3 text-sm text-white/80">Dhaka, Bangladesh</p>
                <p className="text-sm text-white/45">Available worldwide</p>
                <DhakaTime />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Follow</p>
                <ul className="mt-3 space-y-2">
                  {SOCIALS.map((social) => {
                    const Icon = SOCIAL_ICONS[social.label] || ArrowUpRight;
                    return (
                      <li key={social.label}>
                        <a href={social.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2.5 text-sm text-white/80 transition hover:text-[#d6a85f]">
                          <span className="flex h-7 w-7 items-center justify-center border border-white/15 text-[#d6a85f] transition group-hover:border-[#d6a85f] group-hover:bg-[#d6a85f] group-hover:text-[#1a1512]">
                            <Icon className="h-3 w-3" />
                          </span>
                          {social.label}
                          <ArrowUpRight className="h-3 w-3 opacity-50 transition group-hover:opacity-100" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Explore</p>
                <ul className="mt-3 space-y-1.5 text-sm text-white/80">
                  <li><Link href="/photos" className="transition hover:text-[#d6a85f]">Photographs</Link></li>
                  <li><Link href="/clients" className="transition hover:text-[#d6a85f]">Clients</Link></li>
                  <li><Link href="/journal" className="transition hover:text-[#d6a85f]">Journal</Link></li>
                  <li><Link href="/dev" className="transition hover:text-[#d6a85f]">Developer portfolio</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-20 flex flex-col justify-between gap-3 border-t border-white/15 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 sm:flex-row">
              <span>© {new Date().getFullYear()} Shohorab H Shawon (Shohorab Hossain Shawon) · SHS Films</span>
              <button type="button" onClick={() => scrollToId('top')} className="self-start uppercase transition hover:text-white sm:self-auto">
                Back to top ↑
              </button>
            </div>
          </div>
        </footer>
      </main>

      <VideoModal video={selectedVideo} videos={videos} onClose={closeVideo} onNavigate={navigateVideo} hasNavigation={videos.length > 1} />
    </div>
  );
}
