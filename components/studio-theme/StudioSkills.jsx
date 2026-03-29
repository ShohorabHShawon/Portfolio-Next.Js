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

export default function StudioSkills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="relative bg-[#f8f5ee] px-4 py-14 dark:bg-[#0b1118] md:px-8 lg:px-12">

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-2xl font-bold uppercase tracking-[0.08em] text-[#334155] dark:text-[#cbd5e1] sm:text-3xl">Skills</p>
          <h2 className="mt-2 font-poppins text-xl font-semibold text-[#0f172a] dark:text-[#f5f4ef] sm:text-2xl">
            Technical And Creative Toolkit
          </h2>
        </div>

        <div className="mb-7 flex flex-wrap justify-center gap-2">
          {skillCategories.map((category, idx) => (
            <button
              key={category.title}
              onClick={() => setActiveCategory(idx)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition ${
                activeCategory === idx
                  ? 'bg-[#0f2233] text-[#f8f6f2]'
                  : 'border border-[#1f2937]/10 bg-white text-[#1f2937] hover:bg-[#f3f4f6] dark:border-[#94a3b8]/25 dark:bg-[#121b26] dark:text-[#e5e7eb] dark:hover:bg-[#1f2a37]'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={skillCategories[activeCategory].title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
          >
            {skillCategories[activeCategory].icons.map((icon, idx) => (
              <motion.div
                key={icon.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="rounded-2xl border border-[#1f2937]/10 bg-white p-4 text-center shadow-sm dark:border-[#94a3b8]/25 dark:bg-[#121b26]"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#f8fafc] dark:bg-[#0f1722]">
                  <Image src={icon.src} alt={icon.title} width={34} height={34} className="h-8 w-8 object-contain" />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#1f2937] dark:text-[#e5e7eb]">
                  {icon.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
