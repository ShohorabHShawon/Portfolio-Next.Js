import AboutContents from '@/components/AboutContents';
import { Contact } from '@/components/Contact';
import DevNavbar from '@/components/DevNavbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import UiProjects from '@/components/UiProjects';
import WebProjects from '@/components/WebProjects';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Home() {
  return (
    <>
      <div className="overflow-hidden">
        <DevNavbar />
        {/* Hero Section */}
        <Hero />
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
          className="min-h-screen w-full bg-white dark:bg-[#181A1B] text-gray-800 dark:text-white pt-10"
        >
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
            {/* Web Projects Grid */}
            <div className="w-full">
              <WebProjects />
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
