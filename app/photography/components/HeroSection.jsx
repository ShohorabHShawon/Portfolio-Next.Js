'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = ({ photos }) => {
  if (!photos || photos.length === 0) return null;

  const scrollToGallery = () => {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    if (window.lenis) {
      window.lenis.scrollTo(gallery, { offset: -12 });
      return;
    }

    gallery.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative flex flex-col items-center overflow-hidden bg-[#1a1512] text-[#f2efe9]">
      {/* Top Decorative Element */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6a85f] to-transparent" />
      <Link
        href="/"
        className="absolute left-5 top-5 z-30 inline-flex items-center gap-2 border border-[#d6a85f]/45 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d6a85f] transition hover:border-[#d6a85f] hover:bg-[#d6a85f] hover:text-[#1a1512] md:left-8 md:top-7"
      >
        <span aria-hidden="true">←</span>
        Back Home
      </Link>

      {/* Main Content */}
      <motion.div
        className="relative z-20 w-full max-w-6xl px-6 mx-auto pt-16 md:pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Profile Avatar - Circular with Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-[#d6a85f]/50 bg-[#211914]"
          >
            {photos[0] && (
              <Image
                src="/shohorab1.JPG"
                alt="Profile"
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2"
          >
            <h1 className="flex flex-wrap items-center justify-center gap-[0.1em] text-[clamp(1.55rem,6.5vw,3.4rem)] font-light leading-tight text-white">
              Shohorab H Shawon
              <svg
                aria-label="Verified profile"
                role="img"
                viewBox="0 0 24 24"
                className="h-[0.86em] w-[0.86em] shrink-0 text-[#1877F2]"
              >
                <defs>
                  <mask id="verified-badge-cutout">
                    <rect width="24" height="24" fill="black" />
                    <polygon
                      points="12,0.5 14.46,2.82 17.75,2.04 18.72,5.28 21.96,6.25 21.18,9.54 23.5,12 21.18,14.46 21.96,17.75 18.72,18.72 17.75,21.96 14.46,21.18 12,23.5 9.54,21.18 6.25,21.96 5.28,18.72 2.04,17.75 2.82,14.46 0.5,12 2.82,9.54 2.04,6.25 5.28,5.28 6.25,2.04 9.54,2.82"
                      fill="white"
                    />
                    <path d="m9 12 2 2 4-4" fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
                  </mask>
                </defs>
                <rect width="24" height="24" fill="currentColor" mask="url(#verified-badge-cutout)" />
              </svg>
            </h1>
            <p className="text-lg font-light text-[#d6a85f]/80">Visual Storyteller & Aspiring Filmmaker</p>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl text-base leading-relaxed text-white/65"
          >
            Capturing moments that tell stories. Exploring the aesthetics of light, shadow, and composition through photography, visual design, and filmmaking.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-6"
          >
            <motion.a
              href="https://www.instagram.com/shohorabs.pov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 transition-colors hover:text-[#d6a85f] text-sm font-medium"
              whileHover={{ y: -2 }}
            >
              Instagram
            </motion.a>
            <span className="text-[#d6a85f]/60">•</span>
            <motion.a
              href="https://www.facebook.com/shohorabhshawon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 transition-colors hover:text-[#d6a85f] text-sm font-medium"
              whileHover={{ y: -2 }}
            >
              Facebook
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
