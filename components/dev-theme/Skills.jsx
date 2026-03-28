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
    title: 'Photography',
    icons: [
      { src: '/icons/lightroom.png', title: 'Adobe Lightroom' },
      { src: '/icons/adobePS.png', title: 'Photoshop' },
    ],
  },
  {
    title: 'Cinematography & Video',
    icons: [
      { src: '/icons/premierecc.png', title: 'Premiere Pro' },
      { src: '/icons/aftereffects.png', title: 'After Effects' },
      { src: '/icons/davinci.png', title: 'DaVinci Resolve' },
    ],
  },
  {
    title: 'Design & UI',
    icons: [
      { src: '/icons/figma.png', title: 'Figma' },
      { src: '/icons/framer.png', title: 'Framer' },
      { src: '/icons/adobePS.png', title: 'Photoshop' },
      { src: '/icons/adobeAI.png', title: 'Illustrator' },
    ],
  },
  {
    title: 'Productivity & Tools',
    icons: [
      { src: '/icons/github.png', title: 'Github' },
      { src: '/icons/notion.png', title: 'Notion' },
    ],
  },
];

const SkillCard = ({ icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500/20 group-hover:via-green-500/20 group-hover:to-green-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      
      {/* Card */}
      <div className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 group-hover:border-green-500/50 dark:group-hover:border-green-500/50 transition-all duration-300 shadow-sm group-hover:shadow-lg dark:group-hover:shadow-green-500/10">
        <div className="relative">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.15 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <Image
              src={icon.src}
              alt={icon.title}
              width={32}
              height={32}
              className="object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-1 -right-1 text-green-500 text-xs"
          >
            ✨
          </motion.div>
        </div>
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 text-center line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {icon.title}
        </span>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="w-full py-10 bg-white dark:bg-[#181A1B] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            
            <h2 className="text-4xl lg:text-5xl uppercase font-bold font-poppins text-gray-900 dark:text-white">
              SKILLS
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 tracking-wide">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.button
              key={category.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(idx)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 whitespace-nowrap backdrop-blur-sm border ${
                activeCategory === idx
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/30 border-green-400'
                  : 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50 border-gray-300 dark:border-gray-700'
              }`}
            >
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={skillCategories[activeCategory].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4"
          >
            {skillCategories[activeCategory].icons.map((icon, idx) => (
              <SkillCard
                key={idx}
                icon={icon}
                delay={idx * 0.05}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
