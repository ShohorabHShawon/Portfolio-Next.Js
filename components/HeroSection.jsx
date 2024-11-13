'use client';
import React from 'react';
import Link from 'next/link';
import { Spotlight } from '@/components/ui/Spotlight';
import { FlipW } from './FlipW';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';

function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="h-screen pt-0 sm:pt-44 md:pt-12 lg:pt-5 flex items-center justify-center text-center bg-zinc-900 overflow-hidden"
        id="home"
      >
        <Spotlight
          className="-top-0 left-0 md:left-40 md:-top-20 lg:-top-60"
          fill="white"
        />
        <div className="container mx-auto z-20 overflow-hidden">
          {/* Circular Image */}
          <motion.div
            whileTap={{
              scale: 0.5,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="mb-10 mt-10"
          >
            <Image
              src="/profile.jpg"
              alt="Shohorab Hossain Shawon"
              width={250}
              height={250}
              className="z-10 h-auto w-48 md:w-56 lg:w-60 rounded-full mx-auto my-auto shadow-lg border-4 border-white hover:scale-110 transition duration-300 ease-in-out"
            />{' '}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3 }}
          >
            <h1
              className="font-lexend font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl px-2 mb-4 text-white 
            hover:text-red-900 transform transition duration-300 ease-in-out inline-block"
            >
              SHOHORAB HOSSAIN SHAWON
              <FlipW />
            </h1>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            whileTap={{ scale: 0.7 }}
            className="relative inline-flex items-center justify-center mb-2 overflow-hidden text-xs sm:text-sm md:text-base font-medium text-black bg-white border-2 border-black hover:border-white rounded-lg group hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800"
          >
            {' '}
            <span className=" font-bold relative p-1 px-3 sm:px-2 sm:py-1.0 md:px-4 md:py-1.0 lg:px-6 lg:py-1.0 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              <Link
                href="/Shohorab_Hossain_Shawon.pdf"
                download="Shohorab_Hossain_Shawon.pdf"
              >
                CV
              </Link>
            </span>
          </motion.button>
          <SocialLinks className="" />
        </div>
      </section>
    </>
  );
}

export default HeroSection;
