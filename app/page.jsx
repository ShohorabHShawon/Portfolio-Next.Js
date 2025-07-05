import HeroSection from '@/components/HeroSection';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Contact } from '@/components/Contact';
import Footer from '@/components/Footer';
import Skills from '@/components/Skills';
import AboutContents from '@/components/AboutContents';
import WebProjects from '@/components/WebProjects';
import UiProjects from '@/components/UiProjects';
import DevNavbar from '@/components/DevNavbar';

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-br from-black via-gray-900 to-black w-full overflow-hidden">
        <DevNavbar />
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
          className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white pt-10"
        >
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
            {/* Web Projects Grid */}
            <div className="w-full">
              <WebProjects />
            </div>

            {/* UI/UX Projects Header */}

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
