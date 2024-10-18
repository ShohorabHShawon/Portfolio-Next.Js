'use client';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import TypingAnimation from './magicui/typing-animation';
import SparklesText from './magicui/sparkles-text';

const AboutContents = () => {
  return (
    <section
      id="about"
      className="text-white flex items-center justify-center bg-zinc-900 p-4 sm:p-8"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="my-5">
          <SparklesText text="ABOUT" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-evenly">
          <div className="md:w-1/2 mb-8 mx-4 md:mb-0">
            <TypingAnimation
              className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-justify font-bold text-black dark:text-white"
              text="I am a dedicated front-end developer with a strong interest in UI/UX 
design, focused on creating intuitive and visually compelling digital 
experiences. While still gaining experience in the field, I am 
committed to refining my skills and contributing to projects that 
prioritize user-centric design and functionality. Driven by a passion 
for continuous learning, I am eager to collaborate and deliver 
impactful solutions in web development and design."
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <Image
              src="/about.png"
              alt="Shohorab Hossain Shawon"
              width={400}
              height={400}
              className="rounded-full mx-auto shadow-lg border-4 border-white
              w-64 h-auto md:w-72 lg:w-80 xl:w-96"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutContents;
