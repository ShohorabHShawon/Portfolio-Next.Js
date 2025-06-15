'use client';
import React from 'react';
import Link from 'next/link';
import { Spotlight } from '@/components/ui/Spotlight';
import { FlipW } from './FlipW';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';
import { BorderBeam } from './magicui/border-beam';

function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-white via-gray-100 to-white dark:from-black dark:via-gray-900 dark:to-black overflow-hidden transition-colors duration-300"
        id="home"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/20 via-gray-100 to-white dark:from-purple-900/20 dark:via-slate-900 dark:to-black transition-colors duration-300"></div>

        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:60px_60px] transition-colors duration-300" />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)] dark:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] transition-colors duration-300"></div>

        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
          {/* Floating particles with various animations */}
          <div className="absolute top-2/4 left-2/4 w-1 h-1 bg-gray-800 dark:bg-white rounded-full animate-pulse opacity-70 transition-colors duration-300" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce opacity-60 transition-colors duration-300" />
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-gray-800/50 dark:bg-white/50 rounded-full animate-ping opacity-40 transition-colors duration-300" />
          <div className="absolute top-1/6 right-1/3 w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-pulse opacity-50 transition-colors duration-300" />
          <div className="absolute top-2/3 left-1/6 w-2 h-2 bg-pink-600 dark:bg-pink-400 rounded-full animate-bounce opacity-60 transition-colors duration-300" />
          <div className="absolute top-1/3 right-1/6 w-1 h-1 bg-gray-800/70 dark:bg-white/70 rounded-full animate-ping opacity-80 transition-colors duration-300" />
          <div className="absolute top-5/6 left-2/3 w-2 h-2 bg-gray-800 dark:bg-white rounded-full animate-pulse opacity-50 transition-colors duration-300" />
          <div className="absolute top-1/12 left-1/2 w-1 h-1 bg-purple-500 dark:bg-purple-300 rounded-full animate-bounce opacity-70 transition-colors duration-300" />
          <div className="absolute bottom-1/4 right-2/3 w-2 h-2 bg-pink-500 dark:bg-pink-300 rounded-full animate-ping opacity-40 transition-colors duration-300" />
          <div className="absolute top-1/2 right-1/12 w-1 h-1 bg-gray-800/30 dark:bg-white/30 rounded-full animate-pulse opacity-60 transition-colors duration-300" />
          <div className="absolute top-3/4 left-1/12 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce opacity-50 transition-colors duration-300" />
          <div className="absolute top-1/8 right-2/4 w-1 h-1 bg-gray-800 dark:bg-white rounded-full animate-ping opacity-70 transition-colors duration-300" />
          <div className="absolute bottom-1/6 left-3/4 w-2 h-2 bg-purple-700 dark:bg-purple-500 rounded-full animate-pulse opacity-40 transition-colors duration-300" />
          <div className="absolute top-2/4 left-1/8 w-1 h-1 bg-pink-700 dark:bg-pink-500 rounded-full animate-bounce opacity-60 transition-colors duration-300" />
          <div className="absolute bottom-1/3 right-1/8 w-2 h-2 bg-gray-800/40 dark:bg-white/40 rounded-full animate-ping opacity-50 transition-colors duration-300" />
        </div>

        <div className="container mx-auto px-4 z-20 text-center max-w-6xl my-16 md:my-0">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left col-span-1 lg:col-span-2">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-center lg:text-left font-lexend font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight"
              >
                <span className="text-gray-800 dark:text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl transition-colors duration-300">
                  Hi, I&apos;m
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-500 dark:to-red-500 bg-clip-text text-transparent">
                  SHOHORAB
                </span>
                <br />
                <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  HOSSAIN SHAWON
                </span>
                <FlipW className="text-center lg:text-left" />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileTap={{ scale: 0.85 }}
                className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-lg mx-auto lg:mx-0 text-center lg:text-left transition-colors duration-300"
              >
                Front-end developer passionate about creating exceptional
                digital experiences with modern technologies.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start text-center lg:text-left ">
                <motion.button
                  initial={{ opacity: 0, x: -90 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.9,
                    scale: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.85 }}
                  className="group relative px-4 py-1 md:px-6 md:py-2 lg:px-8 lg:py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white overflow-hidden"
                >
                  <span className="relative z-10 text-white">
                    <Link
                      href="/Shohorab_Hossain_Shawon.pdf"
                      download="Shohorab_Hossain_Shawon.pdf"
                    >
                      Download CV
                      <span>
                        <svg
                          className="inline-block ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                          />
                        </svg>
                      </span>
                    </Link>
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                <Link href="/photography">
                  <motion.button
                    initial={{ opacity: 0, x: 90 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.15 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.0,
                      scale: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.85 }}
                    className="group relative px-3 py-1 md:px-6 md:py-2 lg:px-8 lg:py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg font-semibold text-white overflow-hidden"
                  >
                    Gallery
                    <span>
                      <svg
                        className="inline-block ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                </Link>

                <SocialLinks className="flex gap-4" />
              </div>
            </div>

            {/* Right Column - Image */}
            <motion.div
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  className="relative"
                >
                  <BorderBeam
                    className={'rounded-full'}
                    colorFrom="#60a5fa"
                    colorTo="#f472b6"
                    size={150}
                    duration={10}
                    borderWidth={9}
                  />
                  <Image
                    src="/profile.jpg"
                    alt="Display Picture"
                    width={250}
                    height={250}
                    className="relative z-10 h-auto w-48 md:w-60 lg:w-72 rounded-full shadow-2xl border-4 border-gray-200/50 dark:border-white/20 hover:scale-105 transition duration-300 ease-in-out"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
