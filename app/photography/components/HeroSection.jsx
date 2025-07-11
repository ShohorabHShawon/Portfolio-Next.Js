'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bubblegum_Sans } from 'next/font/google';

const bubblegum = Bubblegum_Sans({
  subsets: ['latin'],
  weight: ['400'],
});

const HeroSection = ({ photos }) => {
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="absolute inset-0">
        <Image
          key={photos[heroImageIndex].src}
          src={photos[heroImageIndex].src}
          alt="Hero"
          fill
          className="object-cover transition-opacity duration-1000"
          priority={true}
        />
      </div>
      <div className="relative z-20 text-center text-white max-w-7xl px-6">
        <h1
          className={`font-bestia text-3xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 md:mb-10 tracking-wider text-center`}
        >
          Shohorab H Shawon
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-wide opacity-90">
          Visual Storyteller & Photographer
        </p>
        <div className="mt-8">
          <button
            onClick={() =>
              document
                .getElementById('gallery')
                .scrollIntoView({ behavior: 'smooth' })
            }
            className="px-5 mx-2 py-2 md:px-8 md:mx-2 md:py-3 rounded-xl border border-white/30 text-black  bg-white hover:bg-transparent hover:text-white transition-all duration-300 backdrop-blur-sm"
          >
            Explore Gallery
          </button>
          <Link href="/">
            <button className="px-5 mx-2 py-2 md:px-8 md:mx-2 md:py-3 rounded-xl border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm">
              Portfolio
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
