import HeroSection from '@/components/HeroSection';

import '@fortawesome/fontawesome-free/css/all.min.css';
import AboutContents from '@/components/AboutContents';
import SparklesText from '@/components/magicui/sparkles-text';
import { Contact } from '@/components/Contact';
import SocialLinks from '@/components/SocialLinks';
import { SkillsCloud } from '@/components/SkillsCloud';
import { Card1 } from '@/components/webProject1';
import { Card2 } from '@/components/webProject2';
import { Card3 } from '@/components/webProject3';
import { Card4 } from '@/components/webProject4';

import { Card21 } from '@/components/uiProject1';
import { Card22 } from '@/components/uiProject2';
import { Card23 } from '@/components/uiProject3';
import { Card24 } from '@/components/uiProject4';
import { Card25 } from '@/components/uiProject5';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}

      <AboutContents />

      {/* Skills */}
      <section
        id="skills"
        className="text-white h-screen flex flex-col items-center justify-center bg-zinc-900"
      >
        <div className="flex flex-col">
          <SkillsCloud />
        </div>
        {/* <div className="flex flex-col">
          <Skills />
        </div> */}
      </section>

      {/* Project Section */}
      <section
        id="projects"
        className="text-white min-h-screen flex items-center justify-center py-6 bg-zinc-900"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="my-25">
            <SparklesText text="WEB PROJECTS" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {/* project items */}

            <div className="w-full h-auto">
              <Card4 />
            </div>
            <div className="w-full h-auto">
              <Card2 />
            </div>
            <div className="w-full h-auto">
              <Card3 />
            </div>
            <div className="w-full h-auto">
              <Card1 />
            </div>
          </div>

          <div className="my-25">
            <SparklesText text="UI / UX PROJECTS" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ui project items */}

            <div className="w-full h-auto">
              <Card21 />
            </div>

            <div className="w-full h-auto">
              <Card22 />
            </div>

            <div className="w-full h-auto">
              <Card23 />
            </div>
            <div className="w-full h-auto">
              <Card24 />
            </div>
<<<<<<< HEAD

            <div className="w-full h-auto">
              <Card21 />
            </div>

            <div className="w-full h-auto">
              <Card26 />
            </div>

            <div className="w-full h-auto">
              <Card23 />
=======
            <div className="w-full h-auto">
              <Card25 />
>>>>>>> parent of e11b1e7 (Project Update)
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="text-white min-h-screen flex items-center justify-center py-12 bg-zinc-900"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12">
            <SparklesText text="CONTACT" />
          </div>
          <Contact />
          <div className="mb-6">
            <SocialLinks />
          </div>
        </div>
      </section>
    </div>
  );
}
