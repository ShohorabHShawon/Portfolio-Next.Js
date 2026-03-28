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
          className={`font-poppins uppercase font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 md:mb-10 tracking-wider text-center`}
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
          Visual Storyteller | Cinematographer | Photographer
        </motion.p>

        

          {/* Social Media Buttons */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <motion.a
              href="https://www.instagram.com/shohorabs.pov/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 md:gap-2 px-2 py-1.5 md:px-4 md:py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.779.263-1.613.686-2.228 1.3-.637.637-1.022 1.438-1.3 2.228-.267.788-.468 1.658-.6 2.936C.015 8.333 0 8.74 0 12s.015 3.667.072 5.053c.06 1.278.261 2.148.6 2.936.279.79.663 1.591 1.3 2.229.637.637 1.438 1.022 2.228 1.3.788.267 1.658.468 2.936.6 1.28.057 1.687.072 5.053.072s3.667-.015 5.053-.072c1.278-.132 2.148-.333 2.936-.6.79-.279 1.591-.663 2.229-1.3.637-.637 1.022-1.438 1.3-2.228.267-.788.468-1.658.6-2.936.057-1.28.072-1.687.072-5.053s-.015-3.667-.072-5.053c-.132-1.278-.333-2.148-.6-2.936-.279-.79-.663-1.591-1.3-2.229C21.137 1.022 20.336.637 19.546.6c-.788-.267-1.658-.468-2.936-.6C15.667.015 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.07 1.171.053 1.805.248 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.361 1.057.413 2.227.061 1.266.07 1.646.07 4.849s-.009 3.585-.07 4.849c-.053 1.171-.248 1.805-.415 2.231-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.056.361-2.227.413-1.231.061-1.617.07-4.849.07s-3.628-.009-4.849-.07c-1.171-.052-1.805-.248-2.231-.415-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.361-1.056-.413-2.227-.061-1.266-.07-1.646-.07-4.849s.009-3.585.07-4.849c.052-1.171.248-1.805.415-2.231.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.056-.361 2.227-.413 1.266-.061 1.646-.07 4.849-.07z" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="18.5" cy="5.5" r=".5" />
              </svg>
              <span className="text-xs md:text-sm lg:text-base font-poppins">Instagram</span>
            </motion.a>
            <motion.a
              href="https://www.facebook.com/shohorabhshawon/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 md:gap-2 px-2 py-1.5 md:px-4 md:py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-xs md:text-sm lg:text-base font-poppins">Facebook</span>
            </motion.a>
        </motion.div>
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
