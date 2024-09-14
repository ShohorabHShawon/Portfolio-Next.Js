import React from "react";
import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
import { FlipW } from "./FlipW";
import Image from "next/image";

function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="h-screen flex items-center justify-center text-center bg-zinc-900"
        id="home"
      >
        <Spotlight
          className="-top-0 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="container mx-auto ">
          {/* Circular Image */}
          <div className="mb-20">
            <Image
              src="/profile.jpg"
              alt="Shohorab Hossain Shawon"
              width={250}
              height={250}
              className="rounded-full mx-auto mb-4 shadow-lg border-4 border-white hover:scale-110 transition duration-300 ease-in-out"
            />
          </div>
          <h1 className="text-3xl lg:text-8xl md:text-7xl sm:text-6xl font-bold mb-4 text-white hover:text-red-900 transition duration-300 ease-in-out">
            SHOHORAB HOSSAIN SHAWON
            <FlipW />
          </h1>
          <Link
            href="#contact"
            className="bg-white bg-opacity-10 backdrop-blur-md text-white px-5 py-3 rounded-full 
            text-lg hover:bg-opacity-40 m-5 md:px-9 border border-white border-opacity-40 shadow-lg 
            transition duration-300 ease-in-out"
          >
            Contact
          </Link>
          {/* CV Button */}
          <Link
            href="/cv.pdf"
            className="bg-white bg-opacity-10 backdrop-blur-md text-white px-5 py-3 rounded-full 
            text-lg hover:bg-opacity-40 m-5 md:px-9 border border-white border-opacity-40 
            shadow-lg transition duration-300 ease-in-out"
            download="cv.pdf"
          >
            CV
          </Link>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
