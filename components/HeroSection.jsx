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
          <h1
            className="text-3xl lg:text-8xl md:text-7xl sm:text-6xl font-bold mb-4 text-white 
          hover:text-red-900 transform transition duration-300 ease-in-out inline-block"
          >
            SHOHORAB HOSSAIN SHAWON
            <FlipW />
          </h1>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <Link href="/cv.pdf" download="cv.pdf">
                CV
              </Link>
            </span>
          </button>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
