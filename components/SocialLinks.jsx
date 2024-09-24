"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function SocialLinks() {
  const handleClick = (url) => {
    setTimeout(() => {
      window.open(url, "_blank");
    }, 500);
  };

  return (
    <div className="flex space-x-8 justify-center my-10">
      {/* LinkedIn Button */}
      <motion.div
        className="flex items-center justify-center cursor-pointer bg-white/80 rounded-2xl border-white/20 border-2"
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{
          scale: 0.8,
          rotate: -360,
          borderRadius: "100%",
        }}
        onClick={() =>
          handleClick("https://www.linkedin.com/in/shohorabhshawon/")
        }
      >
        <Image
          src="/linkedin.png"
          alt="LinkedIn"
          width={48}
          height={48} 
          className="rounded-2xl"
        />
      </motion.div>

      {/* GitHub Button */}
      <motion.div
        className="flex items-center justify-center cursor-pointer bg-white/80 rounded-2xl border-white/20 border-2"
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{
          scale: 0.8,
          rotate: -360,
          borderRadius: "100%",
        }}
        onClick={() => handleClick("https://github.com/shohorabhshawon")}
      >
        <Image
          src="/github.png"
          alt="GitHub"
          width={48}
          height={48}
          className="rounded-2xl"
        />
      </motion.div>

      {/* Behance Button */}
      <motion.div
        className="flex items-center justify-center cursor-pointer bg-white/80 rounded-2xl border-white/20 border-2"
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{
          scale: 0.8,
          rotate: -360,
          borderRadius: "100%",
        }}
        onClick={() => handleClick("https://www.behance.net/shohorabhshawon")}
      >
        <Image
          src="/behance.png"
          alt="Behance"
          width={48}
          height={48}
          className="rounded-2xl"
        />
      </motion.div>
    </div>
  );
}

export default SocialLinks;
