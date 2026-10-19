'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Menu, Play, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { clients } from '../../../clients/clientData';
import { photos } from '../../components/photoData';

const stills = photos.slice(0, 6);
const filmStrip = photos.slice(0, 12);

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

const NAV_ITEMS = [
  { label: 'Work', target: 'work' },
  { label: 'Frames', target: 'frames' },
  { label: 'About', target: 'about' },
  { label: 'Photos', href: '/photos' },
  { label: 'Clients', href: '/clients' },
  { label: 'Journal', href: '/journal' },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const scrollToId = (id) => {
  const element = document.getElementById(id);
  if (!element) return;

  if (window.lenis) {
    window.lenis.scrollTo(element, { offset: -72 });
    return;
  }

  element.scrollIntoView({ behavior: 'smooth' });
};

function SectionLabel({ index, children, className = '' }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] ${className}`}>
      <span className="inline-block h-px w-8 bg-current opacity-60" />
      {children} / {index}
    </p>
  );
}

function BrandMark({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="group inline-flex items-center gap-3" aria-label="Back to top">
      <span className="relative flex h-10 w-10 items-center justify-center border border-[#d6a85f] text-[11px] font-bold tracking-[-0.12em] text-[#d6a85f] transition group-hover:bg-[#d6a85f] group-hover:text-[#1a1512]">
        SHS
        <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-[#a74336]" aria-hidden="true" />
      </span>
      <span className="hidden text-left leading-none sm:block">
        <span className="block text-sm font-semibold tracking-[0.16em] text-white">SHOHORAB</span>
        <span className="mt-1 block font-mono text-[9px] tracking-[0.3em] text-white/45">FILM / PHOTO</span>
      </span>
    </button>
  );
}

// Running 24fps timecode, like a camera monitor.
function Timecode() {
  const [frames, setFrames] = useState(0);

  useEffect(() => {
    let rafId;
    const start = performance.now();
    const tick = (now) => {
      setFrames(Math.floor(((now - start) / 1000) * 24));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const pad = (value) => String(value).padStart(2, '0');
  const totalSeconds = Math.floor(frames / 24);
  const value = `${pad(Math.floor(totalSeconds / 3600))}:${pad(Math.floor(totalSeconds / 60) % 60)}:${pad(totalSeconds % 60)}:${pad(frames % 24)}`;

  return <span className="tabular-nums">{value}</span>;
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
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
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

function VideoCard({ video, index, onSelect, featured = false }) {
  const thumbnail = video.thumbnailSrc || stills[index % stills.length].src;

  return (
    <motion.article variants={reveal} className={`group relative ${featured ? 'md:col-span-2' : ''}`}>
      <div className="flex items-center justify-between border-t border-white/20 pb-3 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors group-hover:border-[#d6a85f]/70 group-hover:text-[#d6a85f]">
        <span>
          {String(index + 1).padStart(2, '0')} / {featured ? 'Latest release' : 'Moving image'}
        </span>
        <span>SHS archive</span>
      </div>
      <button
        type="button"
        onClick={() => onSelect(video)}
        className={`relative block w-full overflow-hidden rounded-sm bg-[#120f0d] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a85f] ${featured ? 'aspect-video md:aspect-[21/9]' : 'aspect-video'}`}
        aria-label={`Play ${video.title || 'film'}`}
      >
        <img
          src={thumbnail}
          alt=""
          loading={featured ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        {featured ? (
          <span className="absolute inset-x-0 top-0 h-[8%] bg-black/70" aria-hidden="true" />
        ) : null}
        {featured ? (
          <span className="absolute inset-x-0 bottom-0 h-[8%] bg-black/70" aria-hidden="true" />
        ) : null}
        <span
          className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d6a85f] bg-[#d6a85f]/90 text-[#1a1512] shadow-xl transition duration-300 group-hover:scale-110 ${
            featured ? 'h-16 w-16 md:h-20 md:w-20' : 'h-12 w-12 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
          }`}
        >
          <Play className={`ml-0.5 fill-current ${featured ? 'h-5 w-5 md:h-6 md:w-6' : 'h-4 w-4'}`} />
        </span>
        <span className="absolute bottom-[10%] left-5 right-5 flex items-end justify-between gap-4 text-[#f2efe9] md:left-7 md:right-7">
          <span className="block min-w-0">
            <span
              className={`block truncate font-medium leading-tight tracking-[-0.02em] text-[#f2efe9] transition-colors group-hover:text-[#d6a85f] ${
                featured ? 'text-2xl md:text-5xl' : 'text-lg md:text-2xl'
              }`}
            >
              {video.title || 'Untitled film'}
            </span>
            {featured && video.description ? (
              <span className="mt-2 hidden max-w-xl text-sm text-white/60 md:block">{video.description}</span>
            ) : null}
          </span>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-[#d6a85f] transition group-hover:-translate-y-1 group-hover:translate-x-1" />
        </span>
      </button>
    </motion.article>
  );
}

function VideoModal({ video, onClose, onNavigate, hasNavigation }) {
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

    return () => {
      document.body.style.overflow = previousOverflow;
      window.lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose, onNavigate, hasNavigation]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1512]/70 p-4 backdrop-blur-xl md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title || 'Film'}
      data-lenis-prevent
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
        aria-label="Close video"
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-5xl flex-col overflow-y-auto rounded-xl border border-white/20 bg-[#1a1512]/80 shadow-2xl backdrop-blur-xl md:max-h-[calc(100vh-5rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-video w-full shrink-0 bg-black/70">
          <iframe
            key={video.src}
            src={video.src}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          {hasNavigation ? (
            <>
              <button type="button" onClick={() => onNavigate('previous')} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#1a1512]/65 text-[#d6a85f] backdrop-blur-xl transition hover:border-[#d6a85f] hover:bg-[#d6a85f] hover:text-[#1a1512] md:left-5" aria-label="Previous video">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => onNavigate('next')} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#1a1512]/65 text-[#d6a85f] backdrop-blur-xl transition hover:border-[#d6a85f] hover:bg-[#d6a85f] hover:text-[#1a1512] md:right-5" aria-label="Next video">
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          ) : null}
        </div>
        <div className="border-t border-white/15 bg-white/[0.05] p-5 text-white/80 md:p-7">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:gap-10">
            <div className="min-w-0">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#d6a85f]">SHS / Film archive</p>
              <h2 className="text-2xl font-medium leading-tight tracking-[-0.03em] text-white md:text-3xl">{video.title || 'Untitled film'}</h2>
              {video.description ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">{video.description}</p> : null}
            </div>
            <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              {hasNavigation ? '← → to browse · Esc to close' : 'Esc to close'}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
            {(video.links || []).map((link) => (
              <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/70 transition hover:border-[#d6a85f] hover:text-[#d6a85f]">
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
            <a href="https://www.facebook.com/shohorabhshawon/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/70 transition hover:border-[#d6a85f] hover:text-[#d6a85f]">
              Facebook page
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [visibleVideoCount, setVisibleVideoCount] = useState(5);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    const rafId = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
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

  const handleNav = (item) => {
    setIsMenuOpen(false);
    if (item.target) scrollToId(item.target);
  };

  const [featuredVideo, ...restVideos] = videos;

  return (
    <div id="top" className="min-h-screen bg-[#1a1512] text-[#f2efe9] selection:bg-[#d6a85f] selection:text-black">
      {/* Navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          isScrolled || isMenuOpen
            ? 'border-b border-white/10 bg-[#1a1512]/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="relative mx-auto flex h-16 w-full max-w-[88rem] items-center justify-between px-5 md:h-20 md:px-10">
          <BrandMark onClick={() => scrollToId('top')} />

          <div className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.22em] text-white/65 lg:flex">
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <Link key={item.label} href={item.href} className="transition hover:text-[#d6a85f]">
                  {item.label}
                </Link>
              ) : (
                <button key={item.label} type="button" onClick={() => handleNav(item)} className="uppercase transition hover:text-[#d6a85f]">
                  {item.label}
                </button>
              ),
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="hidden items-center gap-2 border border-[#d6a85f]/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d6a85f] transition hover:bg-[#d6a85f] hover:text-[#1a1512] sm:inline-flex"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#a74336]" />
              Book a shoot
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex items-center gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 transition hover:text-[#d6a85f] lg:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-5 right-5 top-full mt-2 overflow-hidden border border-[#d6a85f]/35 bg-[#1a1512]/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <div className="grid grid-cols-2 gap-1">
                {[...NAV_ITEMS, { label: 'Contact', target: 'contact' }].map((item, index) =>
                  item.href ? (
                    <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between border border-white/10 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 transition hover:border-[#d6a85f]/60 hover:bg-[#d6a85f]/10 hover:text-[#d6a85f]">
                      {item.label}
                      <span className="text-white/25">{String(index + 1).padStart(2, '0')}</span>
                    </Link>
                  ) : (
                    <button key={item.label} type="button" onClick={() => handleNav(item)} className="flex items-center justify-between border border-white/10 px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 transition hover:border-[#d6a85f]/60 hover:bg-[#d6a85f]/10 hover:text-[#d6a85f]">
                      {item.label}
                      <span className="text-white/25">{String(index + 1).padStart(2, '0')}</span>
                    </button>
                  ),
                )}
              </div>
              <p className="mt-2 border-t border-white/10 px-2 pt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Independent filmmaker / visual storyteller</p>
            </motion.div>
          )}
        </nav>
      </header>

      <main className="relative w-full overflow-x-clip">
        {/* Hero */}
        <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-8 pt-24 md:px-10 md:pb-10 md:pt-28">
          <div className="absolute inset-0 overflow-hidden bg-[#120f0d]">
            <video
              src="/herocover.mp4"
              poster="/cover.jpeg"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-65"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,21,18,0.94)_0%,rgba(26,21,18,0.78)_24%,rgba(26,21,18,0.28)_52%,rgba(26,21,18,0.1)_78%),linear-gradient(0deg,rgba(26,21,18,0.9)_0%,transparent_40%),linear-gradient(180deg,rgba(26,21,18,0.6)_0%,transparent_22%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-screen [background-image:radial-gradient(rgba(255,255,255,0.9)_0.7px,transparent_0.8px)] [background-size:4px_4px]" />
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
              <span>Shohorab H Shawon</span>
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
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="max-w-5xl text-[clamp(3.6rem,10vw,9.5rem)] font-medium leading-[0.86] tracking-[-0.07em]">
              Stories that<br />
              <span className="text-[#d6a85f]">move.</span>
            </motion.h1>
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
        <section id="work" className="bg-[#211914] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto w-full max-w-[88rem]">
            <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/15 pb-7 md:flex-row md:items-end">
              <div>
                <SectionLabel index="01" className="mb-4 text-[#d6a85f]">Selected work</SectionLabel>
                <h2 className="text-4xl tracking-[-0.05em] md:text-7xl">Films in motion</h2>
              </div>
              <div className="flex items-end gap-6">
                <p className="max-w-xs text-sm leading-relaxed text-white/50">A quiet reel of stories, gestures, and light.</p>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d6a85f]/70">
                  {String(videos.length).padStart(2, '0')} films
                </span>
              </div>
            </div>

            {videos.length ? (
              <>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                  className="grid gap-x-6 gap-y-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16"
                >
                  <VideoCard video={featuredVideo} index={0} onSelect={setSelectedVideo} featured />
                  {restVideos.slice(0, visibleVideoCount - 1).map((video, index) => (
                    <VideoCard key={video.id || video.src} video={video} index={index + 1} onSelect={setSelectedVideo} />
                  ))}
                </motion.div>
                {visibleVideoCount < videos.length ? (
                  <div className="mt-14 flex justify-center">
                    <button type="button" onClick={() => setVisibleVideoCount((count) => Math.min(count + 4, videos.length))} className="group inline-flex items-center gap-3 border border-[#d6a85f]/60 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d6a85f] transition hover:bg-[#d6a85f] hover:text-[#1a1512]">
                      Show more films <ArrowDownRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:translate-y-1" />
                    </button>
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
            <div className="overflow-hidden py-2">
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
        <section id="about" className="border-y border-[#d6a85f]/40 bg-[#d6a85f] px-5 py-24 text-[#0b0b0b] md:px-10 md:py-32">
          <div className="mx-auto grid w-full max-w-[88rem] gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
            <div>
              <SectionLabel index="03">A little context</SectionLabel>
              <figure className="mt-10 max-w-sm">
                <div className="relative aspect-[4/5] overflow-hidden border-[10px] border-[#1a1512] bg-[#1a1512] shadow-[12px_12px_0_rgba(26,21,18,0.25)]">
                  <Image
                    src="/shohorab1.JPG"
                    alt="Portrait of Shohorab H Shawon"
                    fill
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="object-cover object-[50%_30%]"
                  />
                  <span className="absolute left-3 top-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a74336]" />
                    Self portrait
                  </span>
                </div>
                <figcaption className="mt-4 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-black/60">
                  <span>Shohorab H Shawon</span>
                  <span>Dhaka, BD</span>
                </figcaption>
              </figure>
            </div>

            <div className="md:pt-16">
              <p className="max-w-3xl text-4xl leading-[0.95] tracking-[-0.06em] md:text-7xl">
                A Software Engineer who is doing what he really loves.
              </p>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-black/70">
                I specialize in brand shoots and visual storytelling, bringing narratives to life with intentional craft. Through cinematic color grading and street photography, I capture authentic moments that resonate on a deeper level.
              </p>

              <ul className="mt-14 grid gap-x-10 border-t border-black/20 sm:grid-cols-2">
                {SERVICES.map((service, index) => (
                  <li key={service.title} className="border-b border-black/20 py-5">
                    <p className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-black/50">{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-xl font-medium tracking-[-0.03em]">{service.title}</span>
                    </p>
                    <p className="mt-1.5 pl-8 text-sm leading-relaxed text-black/60">{service.detail}</p>
                  </li>
                ))}
              </ul>

              <Link href="/dev" className="group mt-10 inline-flex items-center gap-3 border border-black px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition hover:bg-black hover:text-[#d6a85f]">
                The engineering side <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="bg-[#211914] px-5 py-20 md:px-10 md:py-24">
          <div className="mx-auto w-full max-w-[88rem]">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <SectionLabel index="04" className="mb-4 text-[#d6a85f]">Collaborations</SectionLabel>
                <h2 className="text-3xl tracking-[-0.05em] md:text-5xl">Worked with</h2>
              </div>
              <Link href="/clients" className="group inline-flex items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition hover:text-[#d6a85f] md:self-auto">
                All clients <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-px border border-[#d6a85f]/25 bg-[#d6a85f]/25 sm:grid-cols-3 lg:grid-cols-5">
              {clients.map((client) => (
                <Link
                  key={client.name}
                  href="/clients"
                  className="group relative flex aspect-[4/3] flex-col bg-[#ebe5da] p-4 transition hover:bg-[#f7f3ec]"
                >
                  <span className="relative flex-1">
                    <Image
                      src={client.image}
                      alt={`${client.name} logo`}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                      className="object-contain p-3 opacity-75 mix-blend-multiply grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </span>
                  <span className="flex justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-black/45 transition group-hover:text-black/70">
                    <span className="truncate pr-2">{client.name}</span>
                    <span>{client.number}</span>
                  </span>
                </Link>
              ))}
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
            <a href="mailto:shohorabhshawon@gmail.com" className="group inline-flex items-center gap-4 text-[clamp(2.8rem,9vw,8rem)] font-medium leading-[0.9] tracking-[-0.06em] transition hover:text-[#d6a85f]">
              Let&apos;s make it
              <ArrowUpRight className="h-[0.6em] w-[0.6em] shrink-0 transition group-hover:-translate-y-2 group-hover:translate-x-2" />
            </a>

            <div className="mt-16 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Email</p>
                <a href="mailto:shohorabhshawon@gmail.com" className="mt-3 block break-all text-sm text-white/80 transition hover:text-[#d6a85f]">
                  shohorabhshawon@gmail.com
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Based in</p>
                <p className="mt-3 text-sm text-white/80">Dhaka, Bangladesh</p>
                <p className="text-sm text-white/45">Available worldwide</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Follow</p>
                <ul className="mt-3 space-y-1.5">
                  {SOCIALS.map((social) => (
                    <li key={social.label}>
                      <a href={social.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-white/80 transition hover:text-[#d6a85f]">
                        {social.label}
                        <ArrowUpRight className="h-3 w-3 opacity-50 transition group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
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
              <span>© {new Date().getFullYear()} Shohorab H Shawon · SHS Films</span>
              <button type="button" onClick={() => scrollToId('top')} className="self-start uppercase transition hover:text-white sm:self-auto">
                Back to top ↑
              </button>
            </div>
          </div>
        </footer>
      </main>

      <VideoModal video={selectedVideo} onClose={closeVideo} onNavigate={navigateVideo} hasNavigation={videos.length > 1} />
    </div>
  );
}
