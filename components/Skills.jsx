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
      color: 'from-green-400 via-teal-500 to-green-600',
      bgColor: 'bg-green-500/10',
      emoji: '🌐',
      icons: [
        { src: '/icons/nextjs.png', title: 'Next.js', proficiency: 90 },
        { src: '/icons/reactjs.png', title: 'React.js', proficiency: 95 },
        { src: '/icons/tailwind.png', title: 'Tailwind CSS', proficiency: 90 },
        { src: '/icons/vitejs.png', title: 'Vite', proficiency: 85 },
        { src: '/icons/html.png', title: 'HTML', proficiency: 95 },
        { src: '/icons/css.png', title: 'CSS', proficiency: 90 },
        { src: '/icons/nodejs.png', title: 'Node.js', proficiency: 80 },
      ],
    },
    {
      title: 'Programming Languages',
      color: 'from-blue-400 via-purple-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      emoji: '💻',
      icons: [
        { src: '/icons/ts.png', title: 'TypeScript', proficiency: 90 },
        { src: '/icons/js.png', title: 'JavaScript', proficiency: 95 },
        { src: '/icons/python.png', title: 'Python', proficiency: 85 },
        { src: '/icons/c.png', title: 'C', proficiency: 80 },
        { src: '/icons/cpp.png', title: 'C++', proficiency: 75 },
        { src: '/icons/csharp.png', title: 'C#', proficiency: 70 },
        { src: '/icons/java.png', title: 'Java', proficiency: 85 },
      ],
    },

    {
      title: 'Design Tools',
      color: 'from-purple-400 via-pink-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      emoji: '🎨',
      icons: [
        { src: '/icons/figma.png', title: 'Figma', proficiency: 85 },
        { src: '/icons/adobeXD.png', title: 'Adobe XD', proficiency: 80 },
        { src: '/icons/framer.png', title: 'Framer', proficiency: 75 },
        { src: '/icons/adobePS.png', title: 'Photoshop', proficiency: 85 },
        { src: '/icons/adobeLR.png', title: 'Lightroom', proficiency: 80 },
        { src: '/icons/adobeAI.png', title: 'Illustrator', proficiency: 75 },
        { src: '/icons/canva.png', title: 'Canva', proficiency: 90 },
      ],
    },
    {
      title: 'Productivity Tools',
      color: 'from-orange-400 via-red-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      emoji: '⚡',
      icons: [
        { src: '/icons/github.png', title: 'Github', proficiency: 90 },
        { src: '/icons/word.png', title: 'MS Word', proficiency: 85 },
        { src: '/icons/powerpoint.png', title: 'PowerPoint', proficiency: 80 },
        { src: '/icons/excel.png', title: 'Excel', proficiency: 75 },
        { src: '/icons/notion.png', title: 'Notion', proficiency: 85 },
        { src: '/icons/googleSheet.png', title: 'Google Sheets', proficiency: 80 },
        { src: '/icons/googleDocs.png', title: 'Google Docs', proficiency: 85 },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SparklesText
            text="Skills"
            className="text-gray-800 dark:text-white text-5xl md:text-6xl font-bold mb-4"
          />
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            A showcase of technologies and tools I've mastered in my journey
          </motion.p>
        </motion.div>

        {isMounted && (
          <>
            {/* Category Navigation */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {skillCategories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === index
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-gray-400/25`
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{category.emoji}</span>
                  {category.title}
                </motion.button>
              ))}
            </motion.div>

            {/* Skills Display */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className={`${skillCategories[activeCategory].bgColor} rounded-3xl p-4 sm:p-6 md:p-12 backdrop-blur-sm border border-white/20 dark:border-gray-700/50`}>
                {/* Category Header */}
                <div className="text-center mb-8 md:mb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="text-4xl sm:text-5xl md:text-6xl mb-4"
                  >
                    {skillCategories[activeCategory].emoji}
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {skillCategories[activeCategory].title}
                  </h2>
                  <div className={`w-24 h-1 bg-gradient-to-r ${skillCategories[activeCategory].color} mx-auto rounded-full`}></div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
                  {skillCategories[activeCategory].icons.map((icon, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0, rotateY: -90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: idx * 0.1,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotateY: 15,
                        z: 50,
                        transition: { duration: 0.3 },
                      }}
                      className="relative"
                    >
                      {/* Skill Card */}
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg transition-all duration-300 border border-white/50 dark:border-gray-700/50">
                        
                        {/* Icon */}
                        <div className="relative flex flex-col items-center">
                          <div className="relative mb-2 sm:mb-3 md:mb-4">
                            <Image
                              src={icon.src}
                              alt={icon.title}
                              title={icon.title}
                              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                              width={64}
                              height={64}
                            />
                          </div>
                          
                          {/* Skill Name */}
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white text-center mb-2 sm:mb-3 min-h-[1.5rem] sm:min-h-[2rem] flex items-center leading-tight">
                            {icon.title}
                          </h4>
                          
                          {/* Proficiency Bar */}
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2 mb-1 sm:mb-2 overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${icon.proficiency}%` }}
                              transition={{ duration: 1, delay: idx * 0.1 + 0.5 }}
                            />
                          </div>
                          
                          {/* Proficiency Percentage */}
                          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {icon.proficiency}%
                          </span>
                        </div>
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
