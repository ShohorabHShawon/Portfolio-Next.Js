'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';

const webProjects = [
  {
    id: 1,
    filename: 'MovieDB.tsx',
    title: 'Movie Database App',
    description: 'A dynamic movie database app that leverages TMDB API to display ratings and details in real-time.',
    image: '/projects/movie-database.png',
    live: 'https://movieocean.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/Movie-Ocean-Next.JS',
    tags: ['API', 'Next.js', 'TypeScript'],
  },
  {
    id: 2,
    filename: 'Restaurant.jsx',
    title: 'Restaurant Website',
    description: 'A sophisticated website for a restaurant featuring menu, about section, and contact page.',
    image: '/projects/restaurant-landing-page.png',
    live: 'https://projectrestaurant.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/restaurant',
    tags: ['React', 'Next.js', 'UI/UX'],
  },
  {
    id: 3,
    filename: 'TravelAgency.jsx',
    title: 'Travel Agency Site',
    description: 'A responsive landing page built with Next.js and Tailwind CSS for a modern travel brand.',
    image: '/projects/travel-agency-landing-page.png',
    live: 'https://travel-agency-landing-page-eight.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/Travel-Agency-Landing-Page-NextJs-15',
    tags: ['Responsive', 'TailwindCSS', 'Next.js'],
  },
  {
    id: 4,
    filename: 'Real-Estate.jsx',
    title: 'Real Estate Landing',
    description: 'A clean lead-focused real estate landing page with a strong visual hierarchy.',
    image: '/projects/real-estate-landing-page.png',
    live: 'https://real-estate-landing-page-five-murex.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/Real-Estate_Landing-Page',
    tags: ['Lead Gen', 'Grid', 'Next.js'],
  },
  {
    id: 5,
    filename: 'Hungry.jsx',
    title: 'Hungry Restaurant Theme',
    description: 'A vibrant and mobile-first restaurant website theme with a focus on visual appeal and great UX.',
    image: '/projects/modern-restaurant-website.png',
    live: 'https://hungryrestaurant.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/Hungry',
    tags: ['Mobile-First', 'Next.js', 'TailwindCSS'],
  },
  {
    id: 6,
    filename: 'AiGenerator.tsx',
    title: 'AI Content Generator',
    description: 'A web app powered by the Google Gemini API to generate creative content on any topic.',
    image: '/projects/ai-content-generator.png',
    live: '',
    github: 'https://github.com/ShohorabHShawon/AI-Content-Generator',
    tags: ['Gemini API', 'TypeScript', 'Clerk'],
  },
  {
    id: 7,
    filename: 'HomeRenovation.tsx',
    title: 'Home Renovation Landing Page',
    description: 'A sleek landing page for a home renovation service with strong structure and engaging visuals.',
    image: '/projects/home-renovation.png',
    live: 'https://homerenovationnextjs15.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/Home-Renovation-Landing-Page',
    tags: ['Next.js', 'TailwindCSS', 'Landing Page'],
  },
];

export default function MangaWebProjects() {
  const [activeProject, setActiveProject] = useState(webProjects[0]);

  return (
    <section className="relative left-1/2 right-1/2 w-screen min-h-screen -translate-x-1/2 bg-[#f9f3df] py-14 dark:bg-[#0f1218]">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(circle_at_2px_2px,#111_1px,transparent_0)] [background-size:18px_18px] dark:opacity-25 dark:[background-image:radial-gradient(circle_at_2px_2px,rgba(246,242,232,0.5)_1px,transparent_0)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center relative">
          <p className="mb-3 inline-flex rounded-md border-[3px] border-[#111] bg-[#ef4b3f] px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[4px_4px_0_0_#111] dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]">
            CHAPTER 05
          </p>
          <h2 className="font-poppins text-4xl font-black uppercase text-[#111] [text-shadow:3px_3px_0px_#ef4b3f] dark:text-[#f6f2e8] dark:[text-shadow:3px_3px_0px_#39d5ff] lg:text-5xl">
            Mission Archive
          </h2>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[#222]/80 dark:text-white/70">
            Interactive project episodes
          </p>
        </div>

        <div className="rounded-2xl border-[4px] border-[#111] bg-white p-4 shadow-[8px_8px_0_0_#111] dark:border-[#f6f2e8] dark:bg-[#171b22] dark:shadow-[8px_8px_0_0_#f6f2e8] lg:p-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="grid grid-cols-1 gap-2">
                {webProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setActiveProject(project)}
                    className={`rounded-md border-[3px] px-3 py-2 text-left text-sm font-black uppercase tracking-wide transition-transform hover:-translate-y-0.5 ${
                      activeProject.id === project.id
                        ? 'border-[#111] bg-[#39d5ff] text-[#111] shadow-[4px_4px_0_0_#111] dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]'
                        : 'border-[#111]/25 bg-[#fff6e2] text-[#111] dark:border-white/25 dark:bg-white/10 dark:text-white'
                    }`}
                  >
                    {project.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border-[3px] border-[#111] dark:border-[#f6f2e8]">
                    <Image src={activeProject.image} alt={activeProject.title} fill className="object-cover" />
                    <div className="absolute right-3 top-3 rounded-md border-[2px] border-[#111] bg-[#ffe063] px-2 py-1 text-[10px] font-black uppercase tracking-wide text-[#111] dark:border-[#f6f2e8]">
                      Live Panel
                    </div>
                  </div>

                  <h3 className="text-2xl font-black uppercase text-[#111] dark:text-[#f6f2e8]">{activeProject.title}</h3>
                  <p className="mt-2 text-sm font-medium text-[#222]/85 dark:text-white/80">{activeProject.description}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <span key={tag} className="rounded-md border-2 border-[#111] bg-[#ffe063] px-2 py-1 text-[11px] font-black uppercase text-[#111] dark:border-[#f6f2e8]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {activeProject.live && (
                      <Link
                        href={activeProject.live}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-md border-[3px] border-[#111] bg-[#111] px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow-[4px_4px_0_0_#ef4b3f] dark:border-[#f6f2e8] dark:bg-[#f6f2e8] dark:text-[#131313]"
                      >
                        Live Demo <FiArrowUpRight />
                      </Link>
                    )}
                    <Link
                      href={activeProject.github}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-md border-[3px] border-[#111] bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[#111] shadow-[4px_4px_0_0_#111] dark:border-[#f6f2e8] dark:bg-white/10 dark:text-white dark:shadow-[4px_4px_0_0_#f6f2e8]"
                    >
                      <FiGithub /> Source
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
