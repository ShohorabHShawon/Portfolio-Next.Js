'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const skillCategories = [
  {
    title: 'Web Technologies',
    icons: [
      { src: '/icons/nextjs.png', title: 'Next.js' },
      { src: '/icons/nestjs.png', title: 'Nest.js' },
      { src: '/icons/reactjs.png', title: 'React.js' },
      { src: '/icons/tailwind.png', title: 'Tailwind CSS' },
      { src: '/icons/nodejs.png', title: 'Node.js' },
      { src: '/icons/vitejs.png', title: 'Vite' },
      { src: '/icons/html.png', title: 'HTML' },
      { src: '/icons/css.png', title: 'CSS' },
    ],
  },
  {
    title: 'Languages',
    icons: [
      { src: '/icons/ts.png', title: 'TypeScript' },
      { src: '/icons/js.png', title: 'JavaScript' },
      { src: '/icons/python.png', title: 'Python' },
      { src: '/icons/java.png', title: 'Java' },
    ],
  },
  {
    title: 'Creative Stack',
    icons: [
      { src: '/icons/lightroom.png', title: 'Lightroom' },
      { src: '/icons/premierecc.png', title: 'Premiere Pro' },
      { src: '/icons/aftereffects.png', title: 'After Effects' },
      { src: '/icons/figma.png', title: 'Figma' },
      { src: '/icons/framer.png', title: 'Framer' },
    ],
  },
];

export default function NeoSkills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="w-full bg-[#fff3d6] py-14 dark:bg-[#121214]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-poppins text-4xl font-black uppercase text-[#111] [text-shadow:3px_3px_0px_#2ac6ff] dark:text-[#f6f2e8] dark:[text-shadow:3px_3px_0px_#ff5a36] lg:text-5xl">
            Power Ups
          </h2>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[#222]/80 dark:text-white/70">
            Skill Tree and Tool Inventory
          </p>
        </div>

        <div className="mb-7 flex flex-wrap justify-center gap-2">
          {skillCategories.map((category, idx) => (
            <button
              key={category.title}
              onClick={() => setActiveCategory(idx)}
              className={`rounded-md border-[3px] px-4 py-2 text-xs font-black uppercase tracking-wide transition-transform hover:-translate-y-1 ${
                activeCategory === idx
                  ? 'border-[#131313] bg-[#ffea00] text-[#111] shadow-[4px_4px_0_0_#131313] dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]'
                  : 'border-[#131313]/30 bg-white/75 text-[#111] dark:border-white/30 dark:bg-white/10 dark:text-white'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={skillCategories[activeCategory].title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {skillCategories[activeCategory].icons.map((icon, idx) => (
              <motion.div
                key={icon.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04, duration: 0.35 }}
                className="group flex w-full max-w-[170px] flex-col items-center rounded-xl border-[3px] border-[#131313] bg-white p-3 text-center shadow-[4px_4px_0_0_#131313] transition-transform hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#1f2024] dark:shadow-[4px_4px_0_0_#f6f2e8]"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg border-2 border-[#131313]/15 bg-[#fff6e2] dark:border-white/20 dark:bg-white/10">
                  <Image
                    src={icon.src}
                    alt={icon.title}
                    width={34}
                    height={34}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <p className="mt-2 text-xs font-black uppercase tracking-wide text-[#111] dark:text-white/90">{icon.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
