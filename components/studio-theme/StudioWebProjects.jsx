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

export default function StudioWebProjects() {
  const [activeProject, setActiveProject] = useState(webProjects[0]);

  return (
    <section className="relative bg-[#f8f5ee] px-4 py-14 dark:bg-[#0b1118] md:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-2xl font-bold uppercase tracking-[0.08em] text-[#334155] dark:text-[#cbd5e1] sm:text-3xl">Projects</p>
          <h2 className="mt-2 font-poppins text-xl font-semibold text-[#0f172a] dark:text-[#f5f4ef] sm:text-2xl">
            Web Engineering Portfolio
          </h2>
        </div>

        <div className="rounded-2xl border border-[#1f2937]/10 bg-white p-4 shadow-sm dark:border-[#94a3b8]/25 dark:bg-[#121b26] lg:p-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="space-y-2 lg:col-span-4">
              {webProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                    activeProject.id === project.id
                      ? 'border-transparent bg-[#0f2233] text-[#f8f6f2]'
                      : 'border-[#1f2937]/10 bg-[#f8fafc] text-[#1f2937] hover:bg-[#f3f4f6] dark:border-[#94a3b8]/20 dark:bg-[#0f1722] dark:text-[#e5e7eb] dark:hover:bg-[#1f2a37]'
                  }`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-70">{project.filename}</p>
                  <p className="mt-1 font-semibold">{project.title}</p>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24 }}
                >
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border border-[#1f2937]/10 dark:border-[#94a3b8]/20">
                    <Image src={activeProject.image} alt={activeProject.title} fill className="object-cover" />
                  </div>

                  <h3 className="text-2xl font-semibold text-[#0f172a] dark:text-[#f5f4ef]">{activeProject.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#374151] dark:text-[#d1d5db]">{activeProject.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-[#1f2937]/10 bg-[#f8fafc] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#334155] dark:border-[#94a3b8]/20 dark:bg-[#1f2a37] dark:text-[#e2e8f0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {activeProject.live && (
                      <Link
                        href={activeProject.live}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0f2233] px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#f5f4ef]"
                      >
                        Live Demo <FiArrowUpRight />
                      </Link>
                    )}
                    <Link
                      href={activeProject.github}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-xl border border-[#1f2937]/10 bg-[#f8fafc] px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#1f2937] dark:border-[#94a3b8]/20 dark:bg-[#1f2a37] dark:text-[#e5e7eb]"
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
