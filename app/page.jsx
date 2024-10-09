import HeroSection from '@/components/HeroSection';
import { Card } from '@/components/Project1';
import { Card2 } from '@/components/Project2';
import { Card3 } from '@/components/project3';
import { Card4 } from '@/components/project4';
import { Card5 } from '@/components/project5';
import { Card6 } from '@/components/project6';
import Skills from '@/components/Skills';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AboutContents from '@/components/AboutContents';
import SparklesText from '@/components/magicui/sparkles-text';
import { Contact } from '@/components/Contact';
import SocialLinks from '@/components/SocialLinks';

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
        className="text-white h-screen flex items-center justify-center bg-zinc-900"
      >
        <Skills />
      </section>
      {/* Project Section */}
      <section
        id="projects"
        className="text-white min-h-screen flex items-center justify-center py-12 bg-zinc-900"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="my-25">
            <SparklesText text="WEB PROJECTS" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {/* project items */}

            <div className="w-full h-auto">
              <Card />
            </div>
            <div className="w-full h-auto">
              <Card2 />
            </div>
            <div className="w-full h-auto">
              <Card3 />
            </div>
          </div>

          <div className="my-25">
            <SparklesText text="UI / UX PROJECTS" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ui project items */}

            <div className="w-full h-auto">
              <Card4 />
            </div>
            <div className="w-full h-auto">
              <Card5 />
            </div>
            <div className="w-full h-auto">
              <Card6 />
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
