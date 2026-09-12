'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Menu, Play, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { photos } from '../../components/photoData';

const stills = photos.slice(0, 6);

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

function VideoCard({ video, index, onSelect }) {
  return (
    <motion.article
      variants={reveal}
      className="group relative"
    >
      <div className="flex items-center justify-between border-t border-white/20 pb-3 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors group-hover:border-[#d6a85f]/70 group-hover:text-[#d6a85f]">
        <span>0{index + 1} / Moving image</span>
        <span>SHS archive</span>
      </div>
      <button
        type="button"
        onClick={() => onSelect(video)}
        className="relative block aspect-video w-full overflow-hidden rounded-sm bg-[#120f0d] text-left focus:outline-none focus:ring-2 focus:ring-[#d6a85f]"
        aria-label={`Play ${video.title || 'film'}`}
      >
        {video.thumbnailSrc ? (
          <img
            src={video.thumbnailSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
          />
        ) : (
          <img
            src={stills[index % stills.length].src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent opacity-45 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d6a85f] bg-[#d6a85f] text-[#1a1512] opacity-0 shadow-xl transition duration-300 group-hover:scale-110 group-hover:opacity-100 group-focus-within:opacity-100">
          <Play className="ml-0.5 h-4 w-4 fill-current" />
        </span>
        <span className="absolute bottom-5 left-5 right-5 flex translate-y-2 items-end justify-between gap-4 text-[#f2efe9] opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <span className="block max-w-[80%] text-lg font-medium leading-tight text-[#d6a85f] md:text-2xl">{video.title}</span>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-[#d6a85f]" />
        </span>
      </button>
    </motion.article>
  );
}

function VideoModal({ video, onClose, onNavigate, hasNavigation }) {
  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1512]/55 p-4 backdrop-blur-xl md:p-10"
      onClick={onClose}
      role="presentation"
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
        className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-5xl flex-col overflow-y-auto rounded-xl border border-white/20 bg-[#1a1512]/70 shadow-2xl backdrop-blur-xl md:max-h-[calc(100vh-5rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-video w-full shrink-0 bg-black/70">
          <iframe
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
        <div className="border-t border-white/15 bg-white/[0.07] p-5 text-white/80 backdrop-blur-xl md:p-7">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:gap-10">
            <div className="min-w-0">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#d6a85f]">SHS / Film archive</p>
              <h2 className="text-2xl font-medium leading-tight tracking-[-0.03em] text-white md:text-3xl">{video.title || 'Untitled film'}</h2>
              {video.description ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">{video.description}</p> : null}
            </div>
            <div className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">{video.type || 'Film'} / {video.id || 'Archive'}</div>
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

export default function FilmmakerPhotographyTheme({ videos = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [visibleVideoCount, setVisibleVideoCount] = useState(4);

  const navigateVideo = (direction) => {
    if (!selectedVideo || videos.length < 2) return;

    const currentIndex = videos.findIndex(
      (video) => (video.id || video.src) === (selectedVideo.id || selectedVideo.src),
    );
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex = direction === 'next'
      ? (safeIndex + 1) % videos.length
      : (safeIndex - 1 + videos.length) % videos.length;

    setSelectedVideo(videos[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-[#1a1512] text-[#f2efe9] selection:bg-[#d6a85f] selection:text-black">
      <main className="relative min-h-screen w-full overflow-hidden bg-[#1a1512]">
      <section className="relative flex min-h-[min(860px,100vh)] flex-col justify-between overflow-hidden px-5 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8">
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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,21,18,0.94)_0%,rgba(26,21,18,0.78)_24%,rgba(26,21,18,0.28)_48%,rgba(26,21,18,0)_72%),linear-gradient(0deg,rgba(26,21,18,0.62)_0%,transparent_42%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-screen [background-image:radial-gradient(rgba(255,255,255,0.9)_0.7px,transparent_0.8px)] [background-size:4px_4px]" />
        <div className="pointer-events-none absolute inset-y-0 right-4 hidden w-5 border-x border-white/10 opacity-60 [background-image:radial-gradient(circle,rgba(255,255,255,0.32)_0_2px,transparent_2.5px)] [background-size:100%_18px] md:block" />

        <nav className="relative z-50 mx-auto flex w-full max-w-[88rem] items-center justify-between border-b border-white/15 pb-1 md:border-0 md:pb-0">
          <button type="button" onClick={() => scrollToId('top')} className="font-mono text-[clamp(0.7rem,2vw,0.875rem)] font-bold uppercase tracking-[0.22em] text-white">
            SHS / FILMS
          </button>
          <div className="hidden items-center gap-10 text-xs uppercase tracking-[0.22em] text-white/70 md:flex">
            <button type="button" onClick={() => scrollToId('work')} className="transition hover:text-[#d6a85f]">Work</button>
            <button type="button" onClick={() => scrollToId('about')} className="transition hover:text-[#d6a85f]">About</button>
            <button type="button" onClick={() => scrollToId('contact')} className="transition hover:text-[#d6a85f]">Contact</button>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex items-center gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 transition hover:bg-[#d6a85f] hover:text-[#1a1512] md:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="absolute left-0 right-0 top-full mt-3 overflow-hidden border border-[#d6a85f]/35 bg-[#1a1512]/95 p-2 shadow-2xl backdrop-blur-xl md:hidden">
              <div className="grid grid-cols-2 gap-1">
                {[
                  ['Work', 'work'],
                  ['About', 'about'],
                  ['Photos', '/photos'],
                  ['Clients', '/clients'],
                  ['Contact', 'contact'],
                ].map(([label, destination]) => (
                  destination.startsWith('/') ? (
                    <Link key={label} href={destination} onClick={() => setIsMenuOpen(false)} className="border border-white/10 px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 transition hover:border-[#d6a85f]/60 hover:bg-[#d6a85f]/10 hover:text-[#d6a85f]">{label}</Link>
                  ) : (
                    <button key={label} type="button" onClick={() => { scrollToId(destination); setIsMenuOpen(false); }} className="border border-white/10 px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 transition hover:border-[#d6a85f]/60 hover:bg-[#d6a85f]/10 hover:text-[#d6a85f]">{label}</button>
                  )
                ))}
              </div>
              <p className="mt-2 border-t border-white/10 px-2 pt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Independent filmmaker / visual storyteller</p>
            </motion.div>
          )}
        </nav>

        <div id="top" className="relative z-10 mx-auto w-full max-w-[88rem] pb-12 pt-8 sm:pb-16 sm:pt-14 md:pb-24 md:pt-28">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#d6a85f]">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#a74336]" /> Rec · Dhaka · Bangladesh · 2026
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
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="max-w-4xl text-[clamp(3.8rem,10vw,9.5rem)] font-medium leading-[0.86] tracking-[-0.07em]">
            Stories that<br /><span className="text-[#d6a85f]">move.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.8 }} className="mt-10 max-w-xl">
            <p className="max-w-sm text-base leading-relaxed text-white/70 md:text-lg">Filmmaker and visual artist crafting intimate films, visual poetry, and images with a pulse.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => scrollToId('work')} className="group flex items-center gap-[clamp(0.4rem,1vw,0.75rem)] border border-[#d6a85f] bg-[#d6a85f] px-[clamp(0.75rem,2vw,1.25rem)] py-[clamp(0.55rem,1.2vw,0.75rem)] text-[clamp(0.6rem,1vw,0.75rem)] uppercase tracking-[0.16em] text-black transition hover:bg-white hover:border-white">
                Explore the work <ArrowDownRight className="h-[clamp(0.8rem,1.5vw,1rem)] w-[clamp(0.8rem,1.5vw,1rem)] transition group-hover:translate-x-1 group-hover:translate-y-1" />
              </button>
              {videos[0] ? (
                <button type="button" onClick={() => setSelectedVideo(videos[0])} className="group flex items-center gap-[clamp(0.4rem,1vw,0.75rem)] border border-white/35 px-[clamp(0.75rem,2vw,1.25rem)] py-[clamp(0.55rem,1.2vw,0.75rem)] text-[clamp(0.6rem,1vw,0.75rem)] uppercase tracking-[0.16em] text-white transition hover:border-[#d6a85f] hover:bg-[#d6a85f] hover:text-[#1a1512]">
                  <Play className="h-[clamp(0.8rem,1.5vw,1rem)] w-[clamp(0.8rem,1.5vw,1rem)] fill-current transition group-hover:scale-110" />
                  Watch showreel
                </button>
              ) : null}
              <Link href="/photos" className="flex items-center gap-[clamp(0.4rem,1vw,0.75rem)] border border-white/35 px-[clamp(0.75rem,2vw,1.25rem)] py-[clamp(0.55rem,1.2vw,0.75rem)] text-[clamp(0.6rem,1vw,0.75rem)] uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white hover:text-black">
                Photos <ArrowUpRight className="h-[clamp(0.8rem,1.5vw,1rem)] w-[clamp(0.8rem,1.5vw,1rem)]" />
              </Link>
              <Link href="/clients" className="flex items-center gap-[clamp(0.4rem,1vw,0.75rem)] border border-white/35 px-[clamp(0.75rem,2vw,1.25rem)] py-[clamp(0.55rem,1.2vw,0.75rem)] text-[clamp(0.6rem,1vw,0.75rem)] uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white hover:text-black">
                Clients <ArrowUpRight className="h-[clamp(0.8rem,1.5vw,1rem)] w-[clamp(0.8rem,1.5vw,1rem)]" />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[88rem] items-end justify-between border-t border-white/20 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
          <span>Independent filmmaker / visual storyteller</span>
          <span className="hidden md:block">Scroll to discover ↓</span>
        </div>
      </section>

      <section id="work" className="border-y border-[#d6a85f]/20 bg-[#211914] px-5 py-20 md:py-28">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-white/15 pb-7 md:flex-row md:items-end">
            <div><p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d6a85f]">Selected work / 01</p><h2 className="text-4xl tracking-[-0.05em] md:text-6xl">Films in motion</h2></div>
            <div className="flex items-end gap-6"><p className="max-w-xs text-sm leading-relaxed text-white/50">A quiet reel of stories, gestures, and light.</p><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d6a85f]/60">{videos.length} films</span></div>
          </div>
        </div>
        {videos.length ? (
          <>
          <motion.div key={visibleVideoCount} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="mx-auto grid w-full max-w-[88rem] gap-x-6 gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-14">
            {videos.slice(0, visibleVideoCount).map((video, index) => <VideoCard key={video.id || video.src} video={video} index={index} onSelect={setSelectedVideo} />)}
          </motion.div>
          {visibleVideoCount < videos.length ? (
            <div className="mt-12 flex justify-center">
              <button type="button" onClick={() => setVisibleVideoCount((count) => Math.min(count + 4, videos.length))} className="group inline-flex items-center gap-3 border border-[#d6a85f]/60 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d6a85f] transition hover:bg-[#d6a85f] hover:text-[#1a1512]">
                Show more films <ArrowDownRight className="h-4 w-4 transition group-hover:translate-y-1 group-hover:translate-x-1" />
              </button>
            </div>
          ) : null}
          </>
        ) : (
          <p className="border border-white/10 p-10 text-white/55">New films are currently in post-production.</p>
        )}
      </section>

      <section id="about" className="border-y border-[#d6a85f]/40 bg-[#d6a85f] px-5 py-24 text-[#0b0b0b] md:px-10 md:py-32">
        <div className="mx-auto grid w-full max-w-[88rem] gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em]">A little context / 02</p>
          <div>
            <p className="mt-10 max-w-3xl text-4xl leading-[0.95] tracking-[-0.06em] md:text-7xl">A Software Engineer who is doing what he really loves.</p>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-black/70">I specialize in brand shoots and visual storytelling, bringing narratives to life with intentional craft. Through cinematic color grading and street photography, I capture authentic moments that resonate on a deeper level.</p>
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-white/15 px-5 pb-8 pt-20 md:px-10 md:pt-28">
        <div className="mx-auto flex w-full max-w-[88rem] flex-col justify-between gap-16 md:flex-row">
          <div><p className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d6a85f]">Have a story in mind?</p><a href="mailto:hello@shohorab.com" className="group flex items-center gap-4 text-3xl tracking-[-0.05em] transition hover:text-[#d6a85f] md:text-6xl">Let&apos;s make it <ArrowUpRight className="h-8 w-8 transition group-hover:-translate-y-2 group-hover:translate-x-2 md:h-12 md:w-12" /></a></div>
          <div className="flex flex-wrap gap-8 text-xs uppercase tracking-[0.2em] text-white/55">
            <Link href="/dev" className="hover:text-white">Developer</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <a href="https://www.instagram.com/shohorabs.pov/" target="_blank" rel="noreferrer" className="hover:text-white">Instagram <ExternalLink className="ml-1 inline h-3 w-3" /></a>
            <a href="https://www.linkedin.com/in/shohorabhshawon/" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn <ExternalLink className="ml-1 inline h-3 w-3" /></a>
          </div>
        </div>
        <div className="mx-auto mt-24 flex w-full max-w-[88rem] justify-between border-t border-white/15 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35"><span>© {new Date().getFullYear()} Shohorab H Shawon</span><button type="button" onClick={() => scrollToId('top')} className="hover:text-white">Back to top ↑</button></div>
      </footer>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} onNavigate={navigateVideo} hasNavigation={videos.length > 1} />
      </main>
    </div>
  );
}