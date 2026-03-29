'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = ({ photos }) => {
  if (!photos || photos.length === 0) return null;

  return (
    <div className="relative bg-white dark:bg-[#181A1B] flex flex-col items-center overflow-hidden">
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
            <h1 className="font-poppins text-4xl md:text-5xl font-light text-[#181A1B]/90 dark:text-white">
              Shohorab H Shawon
            </h1>
            <p className="text-lg text-[#181A1B]/70 dark:text-gray-400 font-light">Photographer & Visual Creator</p>
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
            className="flex w-full max-w-md flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
          >
            <motion.button
              onClick={() =>
                document
                  .getElementById('gallery')
                  .scrollIntoView({ behavior: 'smooth' })
              }
              className="w-full sm:w-auto sm:min-w-[155px] px-6 sm:px-7 py-2.5 sm:py-2.5 text-sm sm:text-sm bg-[#181A1B] dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-[#181A1B]/90 dark:hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Gallery
            </motion.button>

            <Link href="/" className="w-full sm:w-auto">
              <motion.button
                className="w-full sm:w-auto sm:min-w-[155px] px-6 sm:px-7 py-2.5 sm:py-2.5 text-sm sm:text-sm border-2 border-[#181A1B] dark:border-white text-[#181A1B] dark:text-white rounded-full font-medium hover:bg-[#181A1B]/5 dark:hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Full Portfolio
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
