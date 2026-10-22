'use client';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

// A fresh random hand of prints for the "darkroom table" (Fisher-Yates).
const pickRandomPrints = (photos, count) => {
  const pool = [...photos];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
};

// Position, tilt and parallax depth for each print (percentages of the table).
const PRINT_LAYOUT = [
  { left: '0%', top: '16%', width: '44%', rotate: -11, depth: 10 },
  { left: '20%', top: '0%', width: '41%', rotate: -3, depth: 18 },
  { left: '46%', top: '12%', width: '43%', rotate: 8, depth: 26 },
  { left: '9%', top: '46%', width: '39%', rotate: 5, depth: 14 },
  { left: '51%', top: '50%', width: '37%', rotate: -7, depth: 22 },
];

const EDGE_MARKINGS = Array.from({ length: 24 }, (_, index) => `◂ ${index + 1}  ◂ ${index + 1}A`).join('     ');

const scrollToGallery = () => {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  if (window.lenis) {
    window.lenis.scrollTo(gallery, { offset: -72 });
    return;
  }

  gallery.scrollIntoView({ behavior: 'smooth' });
};

const frameNumber = (src) => (String(src).match(/(\d+)\.\w+$/)?.[1] || '').padStart(3, '0');

function VerifiedBadge() {
  return (
    <svg aria-label="Verified profile" role="img" viewBox="0 0 24 24" className="h-[0.8em] w-[0.8em] shrink-0 text-[#1877F2]">
      <defs>
        <mask id="darkroom-verified-badge-cutout">
          <rect width="24" height="24" fill="black" />
          <polygon
            points="12,0.5 14.46,2.82 17.75,2.04 18.72,5.28 21.96,6.25 21.18,9.54 23.5,12 21.18,14.46 21.96,17.75 18.72,18.72 17.75,21.96 14.46,21.18 12,23.5 9.54,21.18 6.25,21.96 5.28,18.72 2.04,17.75 2.82,14.46 0.5,12 2.82,9.54 2.04,6.25 5.28,5.28 6.25,2.04 9.54,2.82"
            fill="white"
          />
          <path d="m9 12 2 2 4-4" fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </mask>
      </defs>
      <rect width="24" height="24" fill="currentColor" mask="url(#darkroom-verified-badge-cutout)" />
    </svg>
  );
}

const HeroSection = ({ photos, categoryCount = 0, onOpenPhoto }) => {
  const tableRef = useRef(null);
  const frameRef = useRef(0);
  // Chosen once per page load, so every visit or refresh deals a new set.
  // The gallery renders only in the browser (it reads the URL), so this can't mismatch the server HTML.
  const [randomPrints] = useState(() => pickRandomPrints(photos || [], PRINT_LAYOUT.length));

  if (!photos || photos.length === 0) return null;

  const prints = randomPrints.map((photo, index) => ({ photo, ...PRINT_LAYOUT[index] }));

  // Gentle parallax: written to CSS variables so React never re-renders on mouse move.
  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse' || !tableRef.current) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const element = tableRef.current;
      if (!element) return;
      element.style.setProperty('--mx', ((clientX / window.innerWidth) - 0.5).toFixed(3));
      element.style.setProperty('--my', ((clientY / window.innerHeight) - 0.5).toFixed(3));
    });
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      className="relative isolate overflow-hidden bg-[#0d0b0a] text-[#f2efe9]"
    >
      {/* Safelight glow + grain */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_78%_8%,rgba(167,67,54,0.32),transparent_70%),radial-gradient(45%_40%_at_10%_95%,rgba(214,168,95,0.10),transparent_70%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.7px,transparent_0.8px)] [background-size:4px_4px]" />

      {/* Room for the fixed site navbar */}
      <div className="relative z-10 mx-auto grid w-full max-w-[88rem] items-center gap-10 px-5 pb-14 pt-24 md:px-10 md:pb-20 md:pt-28 lg:min-h-[calc(100svh-3rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        {/* Words */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d6a85f]"
          >
            <span className="inline-block h-px w-10 bg-current opacity-60" />
            Photographs · Dhaka, Bangladesh
            <span className="flex items-center gap-2 text-white/50">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#c4473a] shadow-[0_0_12px_rgba(196,71,58,0.9)]" />
              Safelight on
            </span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="[font-family:var(--font-darkroom),Georgia,serif] text-[clamp(4.2rem,13vw,11.5rem)] font-normal leading-[0.82] tracking-[-0.035em]"
          >
            Still
            <br />
            <span className="italic text-[#d6a85f]">frames.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex items-center gap-4"
          >
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-[#d6a85f]/50">
              <Image src="/shohorab1.JPG" alt="Shohorab H Shawon" fill sizes="112px" className="scale-[1.35] object-cover [transform-origin:49%_28%]" />
            </span>
            <span>
              <span className="flex items-center gap-1.5 text-lg font-medium text-white md:text-xl">
                Shohorab H Shawon <VerifiedBadge />
              </span>
              <span className="mt-0.5 block text-sm text-[#d6a85f]/80">Visual Storyteller &amp; Aspiring Filmmaker</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/60"
          >
            Capturing moments that tell stories. Exploring the aesthetics of light, shadow, and composition through photography, visual design, and filmmaking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={scrollToGallery}
              className="group inline-flex items-center gap-3 bg-[#d6a85f] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1a1512] transition hover:bg-[#f2efe9]"
            >
              Enter the darkroom
              <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
            </button>
            <a
              href="https://www.instagram.com/shohorabs.pov/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-white/75 transition hover:border-[#d6a85f] hover:text-[#d6a85f]"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/shohorabhshawon/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-white/75 transition hover:border-[#d6a85f] hover:text-[#d6a85f]"
            >
              Facebook
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid max-w-md grid-cols-3 border-t border-white/10 pt-5"
          >
            {[
              [String(photos.length), 'Exposures'],
              [String(categoryCount).padStart(2, '0'), 'Rolls'],
              ['01', 'City'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">{label}</dt>
                <dd className="mt-1 [font-family:var(--font-darkroom),Georgia,serif] text-4xl text-white">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Prints on the table */}
        <div
          ref={tableRef}
          className="relative order-1 mx-auto mt-4 aspect-[1/0.92] w-[86%] max-w-[34rem] sm:w-full lg:order-2 lg:mt-0 lg:max-w-none"
          style={{ '--mx': 0, '--my': 0 }}
        >
          {prints.map(({ photo, left, top, width, rotate, depth }, index) => (
            <div
              key={photo.src}
              className="absolute transition-transform duration-500 ease-out will-change-transform hover:!z-30 focus-within:!z-30"
              style={{
                left,
                top,
                width,
                zIndex: index + 1,
                transform: `translate3d(calc(var(--mx) * ${depth}px), calc(var(--my) * ${depth}px), 0)`,
              }}
            >
              <motion.button
                type="button"
                onClick={() => onOpenPhoto?.(photo)}
                aria-label={`Open ${photo.title}`}
                initial={{ opacity: 0, y: 80, rotate: 0, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, rotate, scale: 1 }}
                whileHover={{ y: -14, rotate: rotate * 0.4, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.15 + index * 0.09 }}
                className="relative block w-full bg-[#f2efe9] p-[4%] pb-[13%] text-left shadow-[0_30px_60px_-18px_rgba(0,0,0,0.85)] outline-none focus-visible:ring-2 focus-visible:ring-[#d6a85f]"
              >
                <span className="relative block aspect-[4/5] overflow-hidden bg-[#1a1512]">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="object-cover"
                  />
                </span>
                <span className="absolute inset-x-[4%] bottom-[3.5%] flex items-center justify-between font-mono text-[clamp(6px,0.75vw,9px)] uppercase tracking-[0.18em] text-[#1a1512]/60">
                  <span>№ {frameNumber(photo.src)}</span>
                  <span>{photo.category}</span>
                </span>
              </motion.button>
            </div>
          ))}
        </div>
      </div>

      {/* Film edge markings */}
      <div aria-hidden="true" className="relative z-10 overflow-hidden border-y border-[#d6a85f]/15 bg-[#120f0d] py-2">
        <p className="whitespace-nowrap font-mono text-[10px] tracking-[0.3em] text-[#d6a85f]/45">
          SHS 400 SAFETY FILM     {EDGE_MARKINGS}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
