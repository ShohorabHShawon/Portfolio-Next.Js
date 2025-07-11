'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FlipW } from './FlipW';

// This animation variant staggers the children components, making them appear one by one.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// This variant defines how each individual item will animate in.
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 10 },
  },
};

function Hero() {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen w-full bg-gray-50 dark:bg-black overflow-hidden px-4"
      id="home"
    >
      {/* Background with a subtle grid */}
      <div className="absolute inset-0 bg-grid-black/[0.04] dark:bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
      {/* A radial gradient for depth */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black dark:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <motion.div
        className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* === LEFT COLUMN: TEXT CONTENT === */}
        <div className="md:col-span-7 order-2 md:order-2 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.h1
            className="text-5xl font-lexend md:text-6xl lg:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white"
            variants={{
              hidden: { x: -50, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 12,
                  delay: 0.5,
                },
              },
            }}
          >
            <span className="text-gray-800 font-mono px-1 dark:text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl transition-colors duration-300">
              Hey! I&apos;m
            </span>
            <br />
            <span className="text-green-600">SHOHORAB</span>
            <br />
            HOSSAIN SHAWON
          </motion.h1>

          <motion.h2
            className="text-xl md:text-2xl font-medium text-green-600 dark:text-green-400"
            variants={itemVariants}
          >
            <FlipW className="text-center lg:text-left" />
          </motion.h2>

          <motion.p
            className="max-w-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            I&apos;m a Software Engineer and Full Stack Developer who transforms
            ideas into digital experiences.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-all transform hover:scale-105"
            >
              View Projects <FiArrowRight />
            </Link>
            <a
              href="/Shohorab_Hossain_Shawon.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Resume
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </a>
            <Link
              href="/photography"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Photography
              <svg
                className="w-5 h-5"
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
            </Link>
          </motion.div>
        </div>

        {/* === RIGHT COLUMN: IMAGE & SOCIALS === */}
        <div className="md:col-span-5 flex flex-col items-center md:items-end gap-10 order-1 md:order-2 mt-14 md:mt-0">
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80"
            variants={{
              hidden: { scale: 0.5, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  type: 'spring',
                  stiffness: 120,
                  damping: 15,
                  delay: 0.8,
                },
              },
            }}
          >
            {/* Decorative background shape */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-gray-200 dark:bg-gray-800 rounded-2xl transform -rotate-6"></div>
            <Image
              src="/profile.jpg"
              alt="Shohorab Hossain"
              width={400}
              height={400}
              className="relative w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white dark:border-gray-900"
              priority
            />
          </motion.div>

          <motion.div className="flex gap-6" variants={containerVariants}>
            <motion.a
              href="https://github.com/ShohorabHShawon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              variants={itemVariants}
              className="text-gray-400 hover:text-green-500 transition-colors"
            >
              <FiGithub size={24} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/shohorabhshawon/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              variants={itemVariants}
              className="text-gray-400 hover:text-green-500 transition-colors"
            >
              <FiLinkedin size={24} />
            </motion.a>
            <motion.a
              href="mailto:shohorabhshawon@gmail.com"
              aria-label="Email"
              variants={itemVariants}
              className="text-gray-400 hover:text-green-500 transition-colors"
            >
              <FiMail size={24} />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
