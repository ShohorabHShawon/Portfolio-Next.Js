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
import { Card8 } from '@/components/webProject8';

export default function Home() {
  return (
    <>
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
        <section id="skills" className="">
          <Skills />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              <div className="w-full h-auto">
                <Card7 />
              </div>
              <div className="w-full h-auto">
                <Card4 />
              </div>
              <div className="w-full h-auto">
                <Card6 />
              </div>
              <div className="w-full h-auto">
                <Card8 />
              </div>
              <div className="w-full h-auto">
                <Card5 />
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

            {/* UI/UX Projects Header */}
            <div className="my-24">
              <SparklesText text="UI/UX Projects" />
            </div>

            {/* UI/UX Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
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
    </>
  );
}
