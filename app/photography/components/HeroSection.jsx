'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = ({ photos }) => {
  if (!photos || photos.length === 0) return null;

  return (
    <div className="relative bg-[#181A1B] flex flex-col items-center overflow-hidden">
      {/* Top Decorative Element */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

      {/* Main Content */}
      <motion.div
        className="relative z-20 w-full max-w-6xl px-6 mx-auto pt-16 md:pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Profile Avatar - Circular with Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-28 h-28 rounded-full border-2 border-white/40 overflow-hidden bg-gray-800 flex items-center justify-center"
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
            <h1 className="font-poppins text-4xl md:text-5xl font-light text-white">
              Shohorab H Shawon
            </h1>
            <p className="text-lg text-white/70 font-light">Photographer & Visual Creator</p>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl text-gray-300 text-base leading-relaxed"
          >
            Capturing moments that tell stories. Exploring the aesthetics of light, shadow, and composition through photography and visual design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={() =>
                document
                  .getElementById('gallery')
                  .scrollIntoView({ behavior: 'smooth' })
              }
              className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Gallery
            </motion.button>

            <Link href="/">
              <motion.button
                className="px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors"
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
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              whileHover={{ y: -2 }}
            >
              Instagram
            </motion.a>
            <span className="text-gray-600">•</span>
            <motion.a
              href="https://www.facebook.com/shohorabhshawon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
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
