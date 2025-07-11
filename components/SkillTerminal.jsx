'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react'; // Removed useEffect

const skillCategories = [
  {
    title: 'Web Tech',
    emoji: '🌐',
    icons: [
      { src: '/icons/nextjs.png', title: 'Next.js' },
      { src: '/icons/reactjs.png', title: 'React.js' },
      { src: '/icons/tailwind.png', title: 'Tailwind CSS' },
      { src: '/icons/vitejs.png', title: 'Vite' },
      { src: '/icons/html.png', title: 'HTML' },
      { src: '/icons/css.png', title: 'CSS' },
      { src: '/icons/nodejs.png', title: 'Node.js' },
    ],
  },
  {
    title: 'Languages',
    emoji: '💻',
    icons: [
      { src: '/icons/ts.png', title: 'TypeScript' },
      { src: '/icons/js.png', title: 'JavaScript' },
      { src: '/icons/python.png', title: 'Python' },
      { src: '/icons/c.png', title: 'C' },
      { src: '/icons/cpp.png', title: 'C++' },
      { src: '/icons/csharp.png', title: 'C#' },
      { src: '/icons/java.png', title: 'Java' },
    ],
  },
  {
    title: 'Design',
    emoji: '🎨',
    icons: [
      { src: '/icons/figma.png', title: 'Figma' },
      { src: '/icons/adobeXD.png', title: 'Adobe XD' },
      { src: '/icons/framer.png', title: 'Framer' },
      { src: '/icons/adobePS.png', title: 'Photoshop' },
      { src: '/icons/adobeLR.png', title: 'Lightroom' },
      { src: '/icons/adobeAI.png', title: 'Illustrator' },
      { src: '/icons/canva.png', title: 'Canva' },
    ],
  },
  {
    title: 'Productivity',
    emoji: '⚡',
    icons: [
      { src: '/icons/github.png', title: 'Github' },
      { src: '/icons/word.png', title: 'MS Word' },
      { src: '/icons/powerpoint.png', title: 'PowerPoint' },
      { src: '/icons/excel.png', title: 'Excel' },
      { src: '/icons/notion.png', title: 'Notion' },
      { src: '/icons/googleSheet.png', title: 'Google Sheets' },
      { src: '/icons/googleDocs.png', title: 'Google Docs' },
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  // The `isMounted` check has been removed. The component will now render immediately.

  return (
    <section id="skills" className="py-24 bg-white dark:bg-[#181A1B]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-black dark:text-white">
            <h1 className="text-5xl font-bold">SKILLS</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            The technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-200 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl font-mono shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="px-4 py-3 border-b border-gray-300 dark:border-gray-600 rounded-t-xl flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1 text-center text-sm text-gray-600 dark:text-gray-400">
              /Users/Shohorab/Skills
            </div>
          </div>

          <div className="flex border-b border-gray-300 dark:border-gray-600">
            {skillCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-4 py-2 text-sm transition-colors duration-200 flex items-center gap-2 border-r border-gray-300 dark:border-gray-600 ${
                  activeCategory === index
                    ? 'bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-500 hover:bg-gray-300/50 dark:hover:bg-gray-700/50'
                }`}
              >
                <span className="text-base">{category.emoji}</span>
                <span className="hidden sm:inline">{category.title}</span>
              </button>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-6 md:p-8 rounded-b-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={gridContainerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6"
              >
                {skillCategories[activeCategory].icons.map((icon, idx) => (
                  <motion.div
                    key={idx}
                    variants={iconVariants}
                    className="group flex flex-col items-center text-center gap-2"
                  >
                    <div className="w-16 h-16 bg-white dark:bg-gray-600 p-3 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:border-teal-500 transition-all duration-300 transform group-hover:-translate-y-1 shadow-sm">
                      <Image
                        src={icon.src}
                        alt={icon.title}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <h4 className="text-xs text-gray-700 dark:text-gray-300">
                      {icon.title}
                    </h4>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
