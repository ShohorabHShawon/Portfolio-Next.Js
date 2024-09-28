"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import SparklesText from "./magicui/sparkles-text";
import { useState, useEffect } from "react";

export default function Skills() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      {isMounted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="my-8">
            <SparklesText text="SKILLS" />
          </div>
          <ul className="text-base sm:text-lg md:text-xl list-disc list-inside space-y-4 sm:space-y-6 md:space-y-8">
            {[
              {
                title: "Programming Languages",
                icons: [
                  { src: "/js.png", title: "JavaScript" },
                  { src: "/python.png", title: "Python" },
                  { src: "/c.png", title: "C" },
                  { src: "/cpp.png", title: "C++" },
                  { src: "/csharp.png", title: "C#" },
                ],
              },
              {
                title: "Web Technologies",
                icons: [
                  { src: "/html.png", title: "HTML" },
                  { src: "/css.png", title: "CSS" },
                  { src: "/tailwind.png", title: "Tailwind CSS" },
                  { src: "/reactjs.png", title: "React.js" },
                  { src: "/nextjs.png", title: "Next.js" },
                  { src: "/nodejs.png", title: "Node.js" },
                ],
              },
              {
                title: "Design Tools",
                icons: [
                  { src: "/figma.png", title: "Figma" },
                  { src: "/adobeXD.png", title: "Adobe XD" },
                  { src: "/adobePS.png", title: "Photoshop" },
                  { src: "/adobeLR.png", title: "Lightroom" },
                  { src: "/adobeAI.png", title: "Illustrator" },
                ],
              },
              {
                title: "Productivity Tools",
                icons: [
                  { src: "/word.png", title: "MS Word" },
                  { src: "/powerpoint.png", title: "PowerPoint" },
                  { src: "/excel.png", title: "Excel" },
                ],
              },
            ].map((category, index) => (
              <li
                key={index}
                className="flex flex-col items-center space-y-4 sm:space-y-6"
              >
                <strong className="font-semibold text-lg sm:text-xl md:text-2xl mb-2">
                  {category.title}
                </strong>
                <div className="flex flex-wrap justify-center space-x-4">
                  {category.icons.map((icon, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center justify-center cursor-pointer "
                      whileHover={{ scale: 1.5 }}
                      whileTap={{
                        scale: 0.8,
                      }}
                    >
                      <Image
                        src={icon.src}
                        alt={icon.title}
                        title={icon.title}
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:h-12 lg:w-12"
                        width={40}
                        height={40}
                      />
                    </motion.div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
