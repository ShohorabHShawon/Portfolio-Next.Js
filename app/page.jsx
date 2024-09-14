import { About } from "@/components/About";
import HeroSection from "@/components/HeroSection";
import { Card } from "@/components/Project1";
import { Card2 } from "@/components/Project2";
import { Card3 } from "@/components/project3";
import Image from "next/image";
import SocialButtons from "@/components/SocialButtons";
import { Card4 } from "@/components/project4";
import { Card5 } from "@/components/project5";
import { Card6 } from "@/components/project6";
import Skills from "@/components/Skills";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  return (
    <div className="">
      {/* Hero Section */}
      <HeroSection />
      {/* About Section */}
      <section
        id="about"
        className="text-white h-screen flex items-center justify-center bg-zinc-900"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 mt-8 sm:mt-12 md:mt-16 lg:mt-20 hover:text-green-600 hover:scale-105 md:hover:scale-110 transform transition-transform duration-300 ease-in-out inline-block">
            ABOUT
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <About />
            </div>
            <div className="mb-20">
              <Image
                src="/about.png"
                alt="Shohorab Hossain Shawon"
                width={550}
                height={550}
                className="rounded-full mx-auto mb-4 shadow-lg border-4 border-white hover:scale-110 transition duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>
      </section>

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
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 mt-8 sm:mt-12 md:mt-16 lg:mt-20 hover:text-green-600 hover:scale-105 md:hover:scale-110 transform transition-transform duration-300 ease-in-out inline-block">
            WEB PROJECTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* project items */}

            <div className="">
              <Card />
            </div>
            <div className="">
              <Card2 />
            </div>
            <div className="">
              <Card3 />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 mt-8 sm:mt-12 md:mt-16 lg:mt-20 hover:text-green-600 hover:scale-105 md:hover:scale-110 transform transition-transform duration-300 ease-in-out inline-block">
            UI / UX PROJECTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Ui project items */}

            <div className="">
              <Card4 />
            </div>
            <div className="">
              <Card5 />
            </div>
            <div className="">
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
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 mt-8 sm:mt-12 md:mt-16 lg:mt-20 hover:text-green-600 hover:scale-105 md:hover:scale-110 transform transition-transform duration-300 ease-in-out inline-block">
            CONTACT
          </h2>

          <div className="mb-6">
            <SocialButtons />
          </div>
        </div>
      </section>
    </div>
  );
}
