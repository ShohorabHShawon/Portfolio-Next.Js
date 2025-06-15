import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SparklesText from '@/components/magicui/sparkles-text';
import DevNavbar from '@/app/dev/components/DevNavbar';
import DevHero from '@/app/dev/components/DevHero';





export default function Developer() {
  return (
    <>
      <div className="bg-gradient-to-br from-black via-gray-900 to-black w-full overflow-hidden">
        {/* <DevNavbar /> */}
        <DevNavbar />
        {/* Hero Section */}
        {/* <Hero /> */}
        <DevHero />
        {/* About Section */}
        <section id="about">
          <div className="text-center">
            {/* <AboutContents /> */}
            {/* <DevAbout /> */}

          </div>
        </section>
        {/* Skills */}
        <section id="skills" className="">
         
        </section>
        {/* Project Section */}
        <section
          id="projects"
          className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-20 px-4"
        >
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
            {/* Header */}
            <div className="mb-16">
              <SparklesText text="Web Projects" />
              <p className="text-zinc-500 dark:text-zinc-400 mt-4 text-lg max-w-2xl mx-auto">
                Crafting digital experiences with modern technologies and
                innovative design
              </p>
            </div>

            {/* Web Projects Grid */}
            <div className="w-full">
              
            </div>

            {/* UI/UX Projects Header */}
            <div className="my-24">
              <SparklesText text="UI/UX Projects" />
            </div>

            {/* UI/UX Projects Grid */}
            <div className="w-full">
              
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="">
          
        </section>
        {/* Footer */}
        
      </div>
    </>
  );
}
