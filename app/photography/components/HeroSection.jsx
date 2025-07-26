'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Bubblegum_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const bubblegum = Bubblegum_Sans({
  subsets: ['latin'],
  weight: ['400'],
});

const HeroSection = ({ photos }) => {
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    if (!photos || photos.length === 0) return;

    const interval = setInterval(() => {
      setHeroImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [photos]);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Animated Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={photos[heroImageIndex].src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        >
          <Image
            src={photos[heroImageIndex].src}
            alt="Hero"
            fill
            className="object-cover"
            priority={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Animated Content */}
      <motion.div
        className="relative z-20 text-center text-white max-w-7xl px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h1
          className={`font-poppins font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 md:mb-10 tracking-wider text-center`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Shohorab H Shawon
        </motion.h1>

        <motion.p
          className="font-poppins text-md md:text-xl lg:text-2xl font-normal tracking-wide opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Visual Storyteller & Photographer
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <motion.button
            onClick={() =>
              document
                .getElementById('gallery')
                .scrollIntoView({ behavior: 'smooth' })
            }
            className="px-4 mx-2 py-2 md:px-6 md:mx-2 md:py-3 text-xs md:text-sm lg:text-base rounded-xl border border-white/30 text-black bg-white hover:bg-transparent hover:text-white transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Gallery
          </motion.button>

          <Link href="/">
            <motion.button
              className="px-5 mx-2 py-2 md:px-7 md:mx-2 md:py-3 text-xs md:text-sm lg:text-base rounded-xl border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
