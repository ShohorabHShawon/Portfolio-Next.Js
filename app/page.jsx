import HeroSection from '@/components/HeroSection';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AboutContents from '@/components/AboutContents';
import SparklesText from '@/components/magicui/sparkles-text';
import { Contact } from '@/components/Contact';
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
import { Card26 } from '@/components/uiProject6';
import { Card5 } from '@/components/webProject5';
import { Card6 } from '@/components/webProject6';
import { About } from '@/components/About';

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about">
        <div className="bg-zinc-900 min-h-screen text-center">
          {/* <AboutContents /> */}
          <About />
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="text-white flex flex-col items-center justify-center bg-zinc-900"
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
        className="text-white flex items-center justify-center py-6 bg-zinc-900 overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center max-w-7xl">
          <div className="my-25">
            <SparklesText text="WEB PROJECTS" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {/* project items */}

            <div className="w-full h-auto">
              <Card4 />
            </div>

            <div className="w-full h-auto">
              <Card5 />
            </div>

            <div className="w-full h-auto">
              <Card6 />
            </div>

            <div className="w-full h-auto">
              <Card1 />
            </div>

            <div className="w-full h-auto">
              <Card3 />
            </div>
            <div className="w-full h-auto">
              <Card2 />
            </div>
          </div>

          <div className="my-25">
            <SparklesText text="UI / UX PROJECTS" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ui project items */}
            <div className="w-full h-auto">
              <Card25 />
            </div>
            <div className="w-full h-auto">
              <Card23 />
            </div>
            <div className="w-full h-auto">
              <Card26 />
            </div>
            <div className="w-full h-auto">
              <Card24 />
            </div>
            <div className="w-full h-auto">
              <Card21 />
            </div>
            <div className="w-full h-auto">
              <Card22 />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="text-white flex items-center justify-center pt-10 bg-zinc-900 overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="mb-5">
            <SparklesText text="CONTACT" />
          </div>
          <Contact />
        </div>
      </section>
    </div>
  );
}
