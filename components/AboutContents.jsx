'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TypingAnimation from './magicui/typing-animation';
import SparklesText from './magicui/sparkles-text';

const AboutContents = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-all duration-300">
      {/* Hero Section */}
      <motion.div
        className="relative py-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <SparklesText
              text="About Me"
              className="text-5xl md:text-6xl lg:text-7xl text-neutral-800 dark:text-neutral-200 mb-6"
            />
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-2">
        <div className="max-w-6xl mx-auto">
          {/* Profile Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex justify-center">
              <motion.div
                className="w-full max-w-6xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden font-mono max-h-6xl">
                  {/* Terminal Header */}
                  <motion.div
                    className="bg-gray-200 dark:bg-gray-700 px-4 py-2 border-b border-gray-300 dark:border-gray-600 rounded-t-lg flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <div className="flex gap-2">
                      <motion.div
                        className="w-3 h-3 bg-red-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 1 }}
                      ></motion.div>
                      <motion.div
                        className="w-3 h-3 bg-yellow-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.1 }}
                      ></motion.div>
                      <motion.div
                        className="w-3 h-3 bg-green-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.2 }}
                      ></motion.div>
                    </div>
                    <div className="text-gray-400 text-sm ml-4 text-center flex-1 justify-center items-center">
                      about-me.sh
                    </div>
                  </motion.div>
                  {/* Terminal Content */}
                  <motion.div
                    className="p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  >
                    <div className="flex flex-col lg:flex-row items-center gap-8 mb-6">
                      <motion.div
                        className="relative flex-shrink-0"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="absolute"></div>
                        <Image
                          src="/profile.jpg"
                          alt="Profile Picture"
                          width={500}
                          height={500}
                          className="relative rounded-xl object-cover w-64 h-64 border-4 border-white shadow-lg"
                        />
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-green-400 mb-2 text-xl">
                          $ whoami
                        </div>
                        <div className="relative">
                          {/* Hidden div to pre-allocate space */}
                          <div className="invisible text-gray-600 dark:text-gray-200 leading-relaxed text-xl text-justify">
                            A dedicated front-end developer with a strong
                            interest in UI/UX design, focused on creating
                            intuitive and visually compelling digital
                            experiences. Driven by a passion for continuous
                            learning, I am eager to collaborate and deliver
                            impactful solutions in web development and design.
                          </div>
                          {/* Typing animation positioned absolutely */}
                          <TypingAnimation
                            className="absolute top-0 left-0 text-gray-600 dark:text-gray-200 leading-relaxed text-xl text-justify"
                            text="A dedicated front-end developer with a strong interest in UI/UX design, focused on creating intuitive and visually compelling digital experiences. Driven by a passion for continuous learning, I am eager to collaborate and deliver impactful solutions in web development and design."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Experience and Projects Stats */}
                    <motion.div
                      className="flex justify-center gap-8 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.8 }}
                    >
                      <div className="text-center">
                        <div className="text-blue-400 text-2xl font-bold">
                          2+
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                          Years Experience
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-purple-400 text-2xl font-bold">
                          10+
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                          Projects
                        </div>
                      </div>
                    </motion.div>

                    <div className="text-green-400 flex items-center text-xl">
                      <span>$ </span>
                      <div className="w-2 h-4 bg-green-400 ml-1 animate-pulse"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutContents;
