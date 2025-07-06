'use client';
import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { RiFileInfoFill } from 'react-icons/ri';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

function Navbar({ title, address, Icon }) {
  return (
    <div>
      <Link href={address} className="hover:text-gray-7000">
        <Icon className="text-2xl sm:hidden" />
        <h1 className="uppercase font-bold hidden sm:inline text-sm">
          {title}
        </h1>
      </Link>
    </div>
  );
}

function BlogNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-black sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 py-1 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-lexend text-white font-extrabold">
              Shohorab
            </h1>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center gap-2 lg:gap-4"
        >
          <Navbar title="Home" address="/blog" Icon={FaHome} />
          <Navbar title="About" address="/#about" Icon={RiFileInfoFill} />
          <ThemeToggle />
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isMenuOpen ? (
              <HiX className="h-6 w-6 text-white" />
            ) : (
              <HiMenuAlt3 className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black backdrop-blur-md border-t border-gray-700"
          >
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 text-white hover:bg-gray-700 dark:hover:bg-gray-7000/20 hover:text-gray-7000 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#about"
                className="block px-4 py-3 text-white hover:bg-gray-700 dark:hover:bg-gray-7000/20 hover:text-gray-7000 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BlogNavbar;
