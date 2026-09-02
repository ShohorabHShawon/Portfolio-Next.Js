'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import ThemeToggle from '@/components/ThemeToggle';

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
    <div className="relative bg-white dark:bg-[#181A1B] flex flex-col items-center overflow-hidden">
      <div className="absolute right-4 top-4 z-30 md:right-6 md:top-6">
        <ThemeToggle />
      </div>

      {/* Top Decorative Element */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

      {/* Main Content */}
      <motion.div
        className="relative z-20 w-full max-w-6xl px-6 mx-auto pt-16 md:pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Profile Avatar - Circular with Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-28 h-28 rounded-full border-2 border-[#181A1B]/20 dark:border-white/40 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
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
            <h1 className="flex flex-wrap items-center justify-center gap-[0.22em] font-poppins text-4xl font-light text-[#181A1B]/90 dark:text-white md:text-5xl">
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
            <p className="text-lg text-[#181A1B]/70 dark:text-gray-400 font-light">Photographer & Visual Storyteller</p>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl text-[#181A1B]/70 dark:text-gray-300 text-base leading-relaxed"
          >
            Capturing moments that tell stories. Exploring the aesthetics of light, shadow, and composition through photography and visual design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex w-full max-w-md flex-row flex-wrap items-center justify-center gap-3 sm:max-w-none sm:gap-4"
          >
            <Link href="/dev" className="w-[calc(50%-0.25rem)] min-w-[120px] max-w-[150px] sm:w-auto sm:max-w-none sm:min-w-[155px]">
              <motion.button
                className="inline-flex w-full min-w-0 items-center justify-center rounded-full border-2 border-[#181A1B] px-2.5 py-2 text-xs font-medium leading-none tracking-[0.01em] text-[#181A1B] transition-colors hover:bg-[#181A1B]/5 dark:border-white dark:text-white dark:hover:bg-white/10 sm:min-w-[155px] sm:px-7 sm:py-2.5 sm:text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Developer Portfolio
              </motion.button>
            </Link>

            <Link href="/blog" className="w-[calc(50%-0.25rem)] min-w-[120px] max-w-[150px] sm:w-auto sm:max-w-none sm:min-w-[155px]">
              <motion.button
                className="inline-flex w-full min-w-0 items-center justify-center rounded-full border-2 border-[#181A1B] px-2.5 py-2 text-xs font-medium leading-none tracking-[0.01em] text-[#181A1B] transition-colors hover:bg-[#181A1B]/5 dark:border-white dark:text-white dark:hover:bg-white/10 sm:min-w-[155px] sm:px-7 sm:py-2.5 sm:text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Blog
              </motion.button>
            </Link>
          </motion.div>

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
              className="text-[#181A1B]/70 dark:text-gray-400 hover:text-[#181A1B] dark:hover:text-white transition-colors text-sm font-medium"
              whileHover={{ y: -2 }}
            >
              Instagram
            </motion.a>
            <span className="text-[#181A1B]/70 dark:text-gray-600">•</span>
            <motion.a
              href="https://www.facebook.com/shohorabhshawon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#181A1B]/70 dark:text-gray-400 hover:text-[#181A1B] dark:hover:text-white transition-colors text-sm font-medium"
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
