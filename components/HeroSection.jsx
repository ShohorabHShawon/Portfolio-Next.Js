"use client";
import React from "react";
import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
import { FlipW } from "./FlipW";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

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
            <motion.div
              whileTap={{
                scale: 0.5,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              className="mb-10 mt-10"
            >
              <Image
                src="/profile.jpg"
                alt="Shohorab Hossain Shawon"
                width={250}
                height={250}
                className="rounded-full mx-auto my-auto shadow-lg border-4 border-white hover:scale-110 transition duration-300 ease-in-out"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3 }}
            >
              <h1
                className="text-[20px] lg:text-7xl md:text-6xl sm:text-4xl font-bold mb-4 text-white 
            hover:text-red-900 transform transition duration-300 ease-in-out inline-block"
              >
                SHOHORAB HOSSAIN SHAWON
                <FlipW />
              </h1>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="relative inline-flex items-center justify-center mb-2 me-2 overflow-hidden text-xs sm:text-sm md:text-base font-medium text-white bg-black border-2 border-white rounded-lg group hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800"
            >
              <span className="relative px-3 py-1 sm:px-2 sm:py-1.0 md:px-4 md:py-1.0 lg:px-6 lg:py-1.0 transition-all ease-in duration-75 bg-black rounded-md group-hover:bg-opacity-0">
                <Link href="/cv.pdf" download="cv.pdf">
                  CV
                </Link>
              </span>
            </motion.button>
          </div>
             <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.5}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      </section>
    </>
  );
}

export default HeroSection;
