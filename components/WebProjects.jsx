'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiFile, FiFolder, FiArrowUpRight, FiGithub } from 'react-icons/fi';

// All your project data, enriched with filenames and tags for the new design.
const webProjects = [
  {
    id: 1,
    title: 'Responsive Travel Agency Site',
    filename: 'TravelAgency.jsx',
    description:
      'A responsive landing page for a travel agency, built with Next.js and Tailwind CSS to create a seamless and visually appealing user experience.',
    image: '/projects/travel-agency-landing-page.png',
    live: 'https://travel-agency-landing-page-eight.vercel.app/',
    github:
      'https://github.com/ShohorabHShawon/Travel-Agency-Landing-Page-NextJs-15',
    tags: ['Next.js', 'TailwindCSS', 'Responsive'],
  },
  {
    id: 2,
    title: 'Restaurant Website',
    filename: 'Restaurant.jsx',
    description:
      'A modern and sophisticated website designed for a restaurant, featuring a full menu, about section, and contact page using Next.js.',
    image: '/projects/restaurant-landing-page.png',
    live: 'https://projectrestaurant.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/restaurant',
    tags: ['React', 'Next.js', 'UI/UX'],
  },
  {
    id: 3,
    title: 'Movie Database App',
    filename: 'MovieDB.tsx',
    description:
      'A dynamic movie database app that leverages the TMDB API to fetch and display movie data, including ratings and details, in real-time.',
    image: '/projects/movie-database.png',
    live: 'https://movieocean.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/Movie-Ocean-Next.JS',
    tags: ['API', 'Next.js', 'TypeScript'],
  },
  {
    id: 4,
    title: 'Real Estate Landing Page',
    filename: 'Real-Estate.jsx',
    description:
      'A clean and professional landing page for a real estate agency, designed to capture leads and showcase properties effectively.',
    image: '/projects/real-estate-landing-page.png',
    live: 'https://real-estate-landing-page-five-murex.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/Real-Estate_Landing-Page',
    tags: ['Next.js', 'Lead Gen', 'CSS Grid'],
  },
  {
    id: 5,
    title: 'Hungry Restaurant Theme',
    filename: 'Hungry.jsx',
    description:
      'A vibrant and mobile-first restaurant website theme with a focus on visual appeal and a great user experience on any device.',
    image: '/projects/modern-restaurant-website.png',
    live: 'https://hungryrestaurant.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/Hungry',
    tags: ['Mobile-First', 'Next.js', 'TailwindCSS'],
  },
  {
    id: 6,
    title: 'AI Content Generator',
    filename: 'AiGenerator.tsx',
    description:
      'A web application that harnesses the Google Gemini API to automatically generate high-quality, creative content on any given topic.',
    image: '/projects/ai-content-generator.png',
    live: '',
    github: 'https://github.com/ShohorabHShawon/AI-Content-Generator',
    tags: ['Generative-AI', 'Gemini API', 'Python'],
  },
];

export default function WebProjects() {
  const [activeProject, setActiveProject] = useState(webProjects[0]);

  const editorContentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <section id="projects" className="w-full py-24 bg-white dark:bg-[#181A1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            WEB PROJECTS
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Here&apos;s a selection of projects where I&apos;ve turned complex
            problems into elegant, user-friendly solutions.
          </p>
        </motion.div>

        {/* --- Code Editor Layout --- */}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row w-full min-h-[600px] bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl shadow-gray-500/10"
        >
          {/* File Explorer (Left Panel) */}
          <div className="w-full lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 p-4">
            <div className="dark:border-gray-600 rounded-t-xl flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
              <FiFolder />
              <h3 className="font-semibold text-sm">/projects</h3>
            </div>
            <div className="flex flex-col gap-1">
              {webProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeProject.id === project.id
                      ? 'bg-gray-600 text-gray-100 dark:text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }`}
                >
                  <FiFile />
                  <span className="font-mono">{project.filename}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Editor Pane (Right Panel) */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tab Bar */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-500 dark:bg-gray-600 text-gray-100 dark:text-white">
                <FiFile />
                <span className="font-mono text-sm">
                  {activeProject.filename}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  variants={editorContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {/* Image Preview */}
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {activeProject.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    {activeProject.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100/60 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-mono rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links styled as terminal commands */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 font-mono text-sm">
                    {activeProject.live && (
                      <Link
                        href={activeProject.live}
                        target="_blank"
                        className="flex items-center gap-2 text-white hover:underline bg-green-600 p-2 rounded-lg"
                      >
                        <span className="text-white">$</span> ./live-demo{' '}
                        <FiArrowUpRight />
                      </Link>
                    )}
                    <Link
                      href={activeProject.github}
                      target="_blank"
                      className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:underline"
                    >
                      <FiGithub /> git checkout source
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
