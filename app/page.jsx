import HeroSection from '@/components/HeroSection';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SparklesText from '@/components/magicui/sparkles-text';
import { Contact } from '@/components/Contact';
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
import Footer from '@/components/Footer';
import { Card7 } from '@/components/webProject7';
import Skills from '@/components/Skills';
import Navbar from '@/components/Navbar';
import AboutContents from '@/components/AboutContents';

export default function Home() {
  return (
    
    <div className="bg-gradient-to-br from-black via-gray-900 to-black w-full overflow-hidden">
      
      {/* <NewNavbar /> */}
      <Navbar />
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about">
        <div className="text-center">
          {/* <AboutContents /> */}
          {/* <About /> */}
          <AboutContents />
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="text-white flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="flex flex-col ">
          <Skills />
        </div>
        {/* <div className="flex flex-col">
          <Skills />
        </div> */}
      </section>

      {/* Project Section */}
      <section
        id="projects"
        className="relative text-white py-20 overflow-hidden"
      >
        {/* Background decoration */}

        <div className="relative container mx-auto px-6 text-center max-w-7xl">
          <div className="mb-16">
            <SparklesText text="Web Projects" />
            <p className="text-zinc-400 mt-4 text-lg max-w-2xl mx-auto">
              Crafting digital experiences with modern technologies and
              innovative design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* project items */}

            {/* Travel Agency Landing Page */}
            <div className="w-full h-auto">
              <Card7 />
            </div>
            {/* Movie Database Website */}
            <div className="w-full h-auto">
              <Card4 />
            </div>
            {/* Restaurant Landing Page */}
            <div className="w-full h-auto">
              <Card6 />
            </div>
            {/* Modern Restaurant Website */}
            <div className="w-full h-auto">
              <Card5 />
            </div>

            {/* Old Projects */}
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
          {/* Old Projects */}

          <div className="my-25">
            <SparklesText text="UI/UX Projects" />
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
      <section id="contact" className="">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
