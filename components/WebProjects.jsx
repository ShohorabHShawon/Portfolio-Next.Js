'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CardBody, CardContainer, CardItem } from '@/components/ui/threeD-card';
import SparklesText from './magicui/sparkles-text';

const webProjects = [
  {
    id: 1,
    title: 'Responsive Travel Agency Landing Page',
    description:
      'Responsive Travel Agency Landing Page using Next Js 15 and Tailwind CSS. This website is designed for a travel agency. It has a menu, about, and contact page.',
    image: '/projects/travel-agency-landing-page.png',
    live: 'https://travel-agency-landing-page-eight.vercel.app/',
    github:
      'https://github.com/ShohorabHShawon/Travel-Agency-Landing-Page-NextJs-15',
  },
  {
    id: 2,
    title: 'Modern Restaurant Website Design.',
    description:
      'Modern Restaurant Website Design using Next Js 15 and Tailwind CSS. This website is designed for a restaurant. It has a menu, about, and contact page.',
    image: '/projects/restaurant-landing-page.png',
    live: 'https://projectrestaurant.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/restaurant',
  },
  {
    id: 3,
    title: 'Movie Database',
    description:
      ' A movie database app that uses the TMDB API to fetch movie data. This app is built using Next Js and Tailwind CSS and TMDB API.',
    image: '/projects/movie-database.png',
    live: 'https://movieocean.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/Movie-Ocean-Next.JS',
  },
  {
    id: 4,
    title: 'Responsive Real Estate Landing Page',
    description:
      'Responsive Real Estate Landing Page using Next Js 15 and Tailwind CSS. This website is designed for a real estate agency. It has a menu, about, and contact page.',
    image: '/projects/real-estate-landing-page.png',
    live: 'https://real-estate-landing-page-five-murex.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/Real-Estate_Landing-Page',
  },
  {
    id: 5,
    title: 'Modern Restaurant Website Design.',
    description:
      'Hungry Restaurant Website Design using Next Js and Tailwind CSS. This website is designed for a restaurant. It has a menu, about, and contact page.',
    image: '/projects/modern-restaurant-website.png',
    live: 'https://hungryrestaurant.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/Hungry',
  },
  {
    id: 6,
    title: 'AI Content Generator',
    description:
      'AI Content Generator is a web application that generates content using Google gemini API. It can generate content for any topic you want.',
    image: '/projects/ai-content-generator.png',
    live: '',
    github: 'https://github.com/ShohorabHShawon/AI-Content-Generator',
  },
];

export default function WebProjects() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, amount: 0.5 }}
        className="mb-10 text-center"
      >
        <SparklesText
          text="Web Projects"
          className="text-gray-900 dark:text-white text-5xl font-bold"
        />
        <p className="text-zinc-500 dark:text-zinc-400 mt-4 text-lg max-w-2xl mx-auto">
          Crafting digital experiences with modern technologies and innovative
          design
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 xl:p-0">
        {/* Card Section */}
        {webProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            viewport={{ once: true, amount: 0.2 }}
            className="group"
          >
            <CardContainer className="inter-var w-full lg:h-80 h-auto">
              <CardBody className="bg-white dark:bg-gray-900 relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] dark:hover:shadow-emerald-500/[0.1] border border-gray-200 dark:border-gray-700 w-full h-auto rounded-2xl p-0 overflow-hidden shadow-md dark:shadow-lg">
                {/* Terminal Header */}
                <div className="bg-gray-200 dark:bg-gray-700 border dark:border-gray-700 rounded-t-lg px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-center text-gray-600 dark:text-gray-400 font-mono ml-2">
                    project-preview.terminal
                  </div>
                </div>

                <div className="relative w-full aspect-video overflow-hidden">
                  <CardItem translateZ="60" className="w-full h-full">
                    <Image
                      src={project.image}
                      height="400"
                      width="600"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={project.title}
                    />
                  </CardItem>

                  {/* Overlay with buttons - appears on hover */}
                  <motion.div
                    className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {project.live && (
                      <CardItem
                        translateZ={20}
                        as={Link}
                        href={project.live}
                        target="_blank"
                        className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Live Demo
                      </CardItem>
                    )}
                    <CardItem
                      translateZ={20}
                      as={Link}
                      href={project.github}
                      target="_blank"
                      className="bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-800 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </CardItem>
                  </motion.div>
                </div>

                {/* Content with terminal styling */}
                <div className="p-4 flex flex-col bg-gray-50 dark:bg-gray-800">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 transition-all duration-300 font-mono"
                  >
                    {project.title}
                  </CardItem>

                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 flex-grow transition-all duration-300 font-mono"
                  >
                    {project.description}
                  </CardItem>

                  {/* Tags with terminal styling */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {project.tags?.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 text-xs rounded-full font-mono border border-gray-200 dark:border-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Buttons with terminal commands */}
                  <div className="space-y-2 mt-auto">
                    <div className="flex gap-2">
                      {project.live && (
                        <Link
                          href={project.live}
                          target="_blank"
                          className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-300 dark:hover:bg-gray-200 text-gray-900 dark:text-gray-600 text-center py-2 px-3 rounded-lg text-xs font-mono border border-gray-300 dark:border-gray-800 flex items-center justify-center gap-1 hover:scale-110 transform transition-transform ease-in-out duration-300"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Live-demo
                        </Link>
                      )}
                      <Link
                        href={project.github}
                        target="_blank"
                        className="flex-1 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/20 dark:hover:bg-slate-900/40 text-slate-700 dark:text-slate-300 text-center py-2 px-3 rounded-lg text-xs font-mono transition-colors duration-200 border border-gray-800 dark:border-gray-200 flex items-center justify-center gap-1"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Github
                      </Link>
                    </div>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </>
  );
}
