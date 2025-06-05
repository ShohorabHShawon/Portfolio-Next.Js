'use client';
import React from 'react';
import TypingAnimation from './magicui/typing-animation';
import SparklesText from './magicui/sparkles-text';

const AboutContents = () => {
  return (
    <section
      id="about"
      className="overflow-hidden text-white flex flex-col items-center justify-center p-4 sm:p-8"
    >
      <div className="">
        <SparklesText text="About" />
      </div>
      <div className="container mx-auto px-4 text-center max-w-4xl mt-20 mb-36">
        <div className="md:w-full lg:w-5/6 mx-auto h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] flex items-center justify-center">
          <TypingAnimation
            className="font-inter text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-justify font-bold text-black dark:text-white"
            text="I am a dedicated front-end developer with a strong interest in UI/UX design, focused on creating intuitive and visually compelling digital experiences. While still gaining experience in the field, I am committed to refining my skills and contributing to projects that prioritize user-centric design and functionality. Driven by a passion for continuous learning, I am eager to collaborate and deliver impactful solutions in web development and design."
          />
        </div>
      </div>
    </section>
  );
};

export default AboutContents;
