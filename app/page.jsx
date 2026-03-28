import NeoAboutContents from '@/components/themed/NeoAboutContents';
import NeoBrands from '@/components/themed/NeoBrands';
import NeoContact from '@/components/themed/NeoContact';
import NeoDevNavbar from '@/components/themed/NeoDevNavbar';
import NeoFooter from '@/components/themed/NeoFooter';
import NeoHero from '@/components/themed/NeoHero';
import NeoSkills from '@/components/themed/NeoSkills';
import NeoUiProjects from '@/components/themed/NeoUiProjects';
import NeoWebProjects from '@/components/themed/NeoWebProjects';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Home() {
  return (
    <>
      <div className="overflow-hidden">
        <NeoDevNavbar />
        {/* Hero Section */}
        <NeoHero />
        {/* About Section */}
        <section id="about">
          <div className="">
            <NeoAboutContents />
          </div>
        </section>
        {/* Skills */}
        <section id="skills" className="">
          <NeoSkills />
        </section>
        {/* Brands */}
        <section id="brands" className="">
          <NeoBrands />
        </section>
        {/* Project Section */}
        <section
          id="projects"
          className="min-h-screen w-full bg-white dark:bg-[#181A1B] text-gray-800 dark:text-white"
        >
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
            {/* Web Projects Grid */}
            <div className="w-full">
              <NeoWebProjects />
            </div>
            {/* UI/UX Projects Grid */}
            <div className="w-full">
              <NeoUiProjects />
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="">
          <NeoContact />
        </section>
        {/* Footer */}
        <NeoFooter />
      </div>
    </>
  );
}
