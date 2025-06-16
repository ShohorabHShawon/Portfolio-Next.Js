'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TypingAnimation from '@/components/magicui/typing-animation';

const DevAbout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-green-400 font-mono py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Terminal Header */}
        <motion.div 
          className="bg-gray-100 dark:bg-gray-900 rounded-t-lg border border-gray-300 dark:border-gray-700 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-t-lg">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-gray-600 dark:text-gray-400 text-sm">~/about-developer</div>
          </div>
          <div className="p-6">
            <div className="text-blue-600 dark:text-green-400 mb-2">$ whoami</div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-green-400 mb-4">
              {'<'}About{' />'}
            </h1>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Code Block */}
          <motion.div 
            className="bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 p-6 h-[400px] flex flex-col"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 dark:text-gray-400 text-sm">profile.js</span>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm flex-1">
              <div><span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-blue-600 dark:text-blue-400">developer</span> = {'{'}</div>
              <div className="ml-4"><span className="text-red-600 dark:text-red-400">name</span>: <span className="text-green-700 dark:text-green-300">&quot;Shohorab Hossain Shawon&quot;</span>,</div>
              <div className="ml-4"><span className="text-red-600 dark:text-red-400">status</span>: <span className="text-green-700 dark:text-green-300">&quot;available&quot;</span>,</div>
              <div className="ml-4"><span className="text-red-600 dark:text-red-400">location</span>: <span className="text-green-700 dark:text-green-300">&quot;Dhaka, Bangladesh&quot;</span>,</div>
              <div className="ml-4"><span className="text-red-600 dark:text-red-400">passion</span>: <span className="text-green-700 dark:text-green-300">&quot;Building awesome web apps&quot;</span></div>
              <div>{'}'};</div>
            </div>

            {/* Profile Image */}
            <motion.div 
              className="mt-auto text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Image
                src="/profile.jpg"
                alt="Developer Profile"
                width={150}
                height={150}
                className="rounded-lg object-cover mx-auto border-2 border-blue-600 dark:border-green-400"
              />
              <div className="mt-2 text-blue-600 dark:text-green-400 text-sm">{/* Profile loaded successfully */}</div>
            </motion.div>
          </motion.div>

          {/* Right Side - Terminal Output */}
          <motion.div 
            className="bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 p-6 h-[400px] flex flex-col"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 dark:text-gray-400 text-sm">terminal</span>
              <span className="text-green-600 dark:text-green-400 text-xs">●</span>
            </div>
            
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex-1">
                <div className="text-blue-600 dark:text-green-400 mb-2">$ cat introduction.txt</div>
                <div className="min-h-[120px]">
                  <TypingAnimation
                    className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                    text="Hello World! I'm a passionate frontend developer who speaks fluent JavaScript and dreams in React components. I transform coffee into clean, efficient code and turn ideas into interactive digital experiences."
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div className="text-blue-600 dark:text-green-400 mb-2">$ npm run --help</div>
                <div className="space-y-1 text-sm">
                  <div className="text-gray-600 dark:text-gray-400">Available commands:</div>
                  <motion.button 
                    className="block text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    npm run view-projects
                  </motion.button>
                  <motion.button 
                    className="block text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    npm run download-cv
                  </motion.button>
                  <motion.button 
                    className="block text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    npm run contact-me
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Code Comment */}
        <motion.div 
          className="text-center mt-12 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="text-gray-600 dark:text-gray-500 text-sm">
            {/* */} <br />
            * &quot;First, solve the problem. Then, write the code.&quot; <br />
            * - John Johnson <br />
            {/* */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DevAbout;
