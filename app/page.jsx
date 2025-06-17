import HeroSection from '@/components/HeroSection';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SparklesText from '@/components/magicui/sparkles-text';
import { Contact } from '@/components/Contact';
import Footer from '@/components/Footer';
import Skills from '@/components/Skills';
import Navbar from '@/components/Navbar';
import AboutContents from '@/components/AboutContents';
import WebProjects from '@/components/WebProjects';
import UiProjects from '@/components/UiProjects';

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-br from-black via-gray-900 to-black w-full overflow-hidden">
        {/* <DevNavbar /> */}
        <Navbar />
        {/* Hero Section */}
        <HeroSection />
        {/* About Section */}
        <section id="about">
          <div className="">
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
            <div className="">
              <SparklesText text="Web Projects" />
              <p className="text-zinc-500 dark:text-zinc-400 mt-4 text-lg max-w-2xl mx-auto">
                Crafting digital experiences with modern technologies and
                innovative design
              </p>
            </div>

            {/* Web Projects Grid */}
            <div className="w-full">
              <WebProjects />
            </div>

            {/* UI/UX Projects Header */}
            <div className="my-24">
              <SparklesText text="UI/UX Projects" />
            </div>

            {/* UI/UX Projects Grid */}
            <div className="w-full">
              <UiProjects />
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
