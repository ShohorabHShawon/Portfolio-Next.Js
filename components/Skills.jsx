'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SparklesText from './magicui/sparkles-text';
import { useState, useEffect } from 'react';

export default function Skills() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const skillCategories = [
    {
      title: 'Web Technologies',
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
      title: 'Programming Languages',
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
      title: 'Design Tools',
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
      title: 'Productivity Tools',
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SparklesText
            text="Skills"
            className="text-gray-900 dark:text-white text-5xl font-bold mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {isMounted && (
          <>
            {/* Category Navigation */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {skillCategories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeCategory === index
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-2">{category.emoji}</span>
                  {category.title}
                </motion.button>
              ))}
            </motion.div>

            {/* Skills Display */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                {/* Category Header */}
                <div className="text-center mb-10">
                  <div className="text-4xl mb-3">
                    {skillCategories[activeCategory].emoji}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {skillCategories[activeCategory].title}
                  </h2>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
                  {skillCategories[activeCategory].icons.map((icon, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.05,
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      className="group"
                    >
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200">
                        <div className="mb-4">
                          <Image
                            src={icon.src}
                            alt={icon.title}
                            title={icon.title}
                            className="w-12 h-12 mx-auto object-contain"
                            width={48}
                            height={48}
                          />
                        </div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                          {icon.title}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
