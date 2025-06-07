'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SparklesText from './magicui/sparkles-text';
import { useState, useEffect } from 'react';

export default function Skills() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const skillCategories = [
    {
      title: 'Programming Languages',
      color: 'from-blue-400 to-blue-600',
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
      title: 'Web Technologies',
      color: 'from-green-400 to-green-600',
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
      title: 'Design Tools',
      color: 'from-purple-400 to-purple-600',
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
      color: 'from-orange-400 to-orange-600',
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
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center mb-12">
        <SparklesText
          text="Skills"
          className={'text-gray-800 dark:text-white'}
        />
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
          Technologies I work with
        </p>
      </div>

      {isMounted && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative group"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-transparent">
                {/* Gradient border effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm`}
                ></div>

                {/* Category title */}
                <div className="flex items-center mb-6">
                  <div
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color} mr-3`}
                  ></div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.icons.map((icon, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1 + idx * 0.05,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      whileHover={{
                        scale: 1.1,
                        y: -5,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group/icon"
                    >
                      <div className="relative bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600">
                        {/* Hover effect background */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-xl opacity-0 group-hover/icon:opacity-10 transition-opacity duration-300`}
                        ></div>

                        <div className="relative flex flex-col items-center">
                          <Image
                            src={icon.src}
                            alt={icon.title}
                            title={icon.title}
                            className="w-8 h-8 md:w-10 md:h-10 object-contain "
                            width={40}
                            height={40}
                          />
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-2 text-center leading-tight line-clamp-1">
                            {icon.title}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
