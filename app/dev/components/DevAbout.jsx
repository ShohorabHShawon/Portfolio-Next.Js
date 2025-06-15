'use client';
import React from 'react';
import Image from 'next/image';
import TypingAnimation from './magicui/typing-animation';
import SparklesText from './magicui/sparkles-text';

const DevAbout = () => {
  return (
    <div className="overflow-hidden text-gray-900 dark:text-gray-200 flex flex-col items-center justify-center p-4 sm:p-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="">
        <SparklesText text="About" />
      </div>
      <div className="container mx-auto px-4 text-center max-w-6xl mt-20 mb-36">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Profile Picture */}
          <div className="flex-shrink-0 mb-10 lg:mb-0">
            <Image
              src="/profile.jpg"
              alt="Profile Picture"
              width={300}
              height={300}
              className="rounded-full object-cover shadow-2xl transform hover:scale-105 transition-transform duration-300 border-4 border-gray-200 dark:border-gray-700"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15))',
              }}
            />
          </div>
          
          {/* About Text */}
          <div className="flex-1 lg:text-left">
            <div className="h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] flex items-center justify-center lg:justify-start">
              <TypingAnimation
                className="font-inter text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-justify font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300"
                text="I am a dedicated front-end developer with a strong interest in UI/UX design, focused on creating intuitive and visually compelling digital experiences. While still gaining experience in the field, I am committed to refining my skills and contributing to projects that prioritize user-centric design and functionality. Driven by a passion for continuous learning, I am eager to collaborate and deliver impactful solutions in web development and design."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevAbout;
