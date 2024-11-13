'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithubSquare, FaBehanceSquare } from 'react-icons/fa';

function SocialLinks() {
  const handleClick = (url) => {
    setTimeout(() => {
      window.open(url, '_blank');
    }, 500);
  };

  return (
    <>
      <div className="flex space-x-0 justify-center items-center my-5">
        {/* LinkedIn Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: -200 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 2 }}
          whileTap={{ scale: 0.8 }}
          className="cursor-pointer"
          onClick={() =>
            handleClick('https://www.linkedin.com/in/shohorabhshawon/')
          }
        >
          <FaLinkedin className="text-3xl md:text-4xl lg:text-5xl hover:scale-125 transition duration-300 ease-in-out mx-2" />
        </motion.div>

        {/* GitHub Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          whileTap={{ scale: 0.8 }}
          className="cursor-pointer"
          onClick={() => handleClick('https://github.com/shohorabhshawon')}
        >
          <FaGithubSquare className="text-3xl md:text-4xl lg:text-5xl hover:scale-125 transition duration-300 ease-in-out mx-2" />
        </motion.div>

        {/* Behance Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 200 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 2 }}
          whileTap={{ scale: 0.8 }}
          className="flex items-center justify-center cursor-pointer"
          onClick={() => handleClick('https://www.behance.net/shohorabhshawon')}
        >
          <FaBehanceSquare className="text-3xl md:text-4xl lg:text-5xl hover:scale-125 transition duration-300 ease-in-out mx-2" />
        </motion.div>
      </div>
    </>
  );
}

export default SocialLinks;
