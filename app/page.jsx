import StudioAboutContents from '@/components/studio-theme/StudioAboutContents';
import StudioBrands from '@/components/studio-theme/StudioBrands';
import StudioContact from '@/components/studio-theme/StudioContact';
import StudioFooter from '@/components/studio-theme/StudioFooter';
import StudioHero from '@/components/studio-theme/StudioHero';
import StudioNavbar from '@/components/studio-theme/StudioNavbar';
import StudioSkills from '@/components/studio-theme/StudioSkills';
import StudioUiProjects from '@/components/studio-theme/StudioUiProjects';
import StudioWebProjects from '@/components/studio-theme/StudioWebProjects';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Home() {
  return (
    <>
      <div className="overflow-hidden bg-[#f8f5ee] text-[#0f172a] dark:bg-[#0b1118] dark:text-[#f5f4ef]">
        <StudioNavbar />
        {/* Hero Section */}
        <StudioHero />
        {/* About Section */}
        <section id="about">
          <div className="">
            <StudioAboutContents />
          </div>
        </section>
        {/* Skills */}
        <section id="skills" className="">
          <StudioSkills />
        </section>
        {/* Brands */}
        <section id="brands" className="">
          <StudioBrands />
        </section>
        {/* Project Section */}
        <section id="projects" className="w-full">
          <div className="w-full">
            <StudioWebProjects />
          </div>
          <div className="w-full">
            <StudioUiProjects />
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="">
          <StudioContact />
        </section>
        {/* Footer */}
        <StudioFooter />
      </div>
    </>
  );
}
