'use client';
import React from 'react';
import TypingAnimation from './magicui/typing-animation';
import SparklesText from './magicui/sparkles-text';

const AboutContents = () => {
  return (
    <section
      id="about"
      className="bg-zinc-900 text-white flex items-center justify-center p-4 sm:p-8"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="my-8">
          <SparklesText text="ABOUT" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-8">
          <div className="md:w-1/2 lg:w-2/3 mb-8 md:mb-0 mx-4">
            <TypingAnimation
              className="font-inter text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-justify font-bold text-black dark:text-white"
              text="I am a dedicated front-end developer with a strong interest in UI/UX 
                design, focused on creating intuitive and visually compelling digital 
                experiences. While still gaining experience in the field, I am 
                committed to refining my skills and contributing to projects that 
                prioritize user-centric design and functionality. Driven by a passion 
                for continuous learning, I am eager to collaborate and deliver 
                impactful solutions in web development and design."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContents;
