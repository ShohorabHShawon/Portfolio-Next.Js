'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiFolder, FiFolderMinus, FiFolderPlus } from 'react-icons/fi';

// --- Data structured for the file explorer ---
const skillCategories = [
  {
    title: 'Web Technologies',
    icons: [
      { src: '/icons/nextjs.png', title: 'Next.js' },
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

// --- A single collapsible category folder ---
const SkillCategory = ({ category, icons }) => {
  const [isOpen, setIsOpen] = useState(true);

  const gridVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { when: 'beforeChildren', staggerChildren: 0.04 },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="font-mono">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
      >
        {isOpen ? (
          <FiFolderMinus className="text-teal-500" />
        ) : (
          <FiFolderPlus className="text-teal-500" />
        )}
        <span className="font-bold">{category}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 pl-12 border-l-2 border-gray-200 dark:border-gray-700 ml-5">
              {icons.map((icon, idx) => (
                <motion.div
                  key={idx}
                  variants={iconVariants}
                  className="group flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <Image
                    src={icon.src}
                    alt={icon.title}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <h4 className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-teal-500">
                    {icon.title}
                  </h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Skills Section Component ---
export default function Skills() {
  return (
    <section id="skills" className="w-full py-24 bg-white dark:bg-[#181A1B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            The technologies and tools I use to build modern web experiences.
          </p>
        </motion.div>

        {/* IDE Navigator Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4"
        >
          <div className="space-y-2">
            {skillCategories.map((category) => (
              <SkillCategory
                key={category.title}
                category={category.title}
                icons={category.icons}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
