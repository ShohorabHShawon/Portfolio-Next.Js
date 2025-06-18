'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BorderBeam } from './magicui/border-beam';
import ThemeToggle from '@/app/blogs/components/ThemeToggle';

const Navbar = () => {
  const navItems = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'About', href: '#about', icon: '👤' },
    { name: 'Skills', href: '#skills', icon: '🛠️' },
    { name: 'Projects', href: '#projects', icon: '💼' },
    { name: 'Contact', href: '#contact', icon: '📧' },
  ];

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <motion.nav
      className="fixed top-0 w-full z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/5 dark:bg-black/5 backdrop-blur-xl border-b border-white/10 dark:border-gray-700/30 shadow-lg shadow-black/5 dark:shadow-white/5">
        <div className="flex justify-center md:justify-between items-center h-16 relative">
          {/* Mobile Hamburger Button (left on small devices) */}
          <div className="md:hidden flex items-center absolute left-0 top-1/2 -translate-y-1/2">
            <button
              aria-label="Open menu"
              className="relative z-50 flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 focus:outline-none shadow-lg"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span
                className={`block h-0.5 w-6 bg-gray-600 dark:bg-gray-200 transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-600 dark:bg-gray-200 my-1 transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-600 dark:bg-gray-200 transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex mx-auto space-x-1 bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-full px-6 py-1 relative shadow-lg shadow-black/10 dark:shadow-white/5">
            <BorderBeam
              className="rounded-full"
              colorFrom="#60a5fa"
              colorTo="#f472b6"
              size={66}
              duration={10}
              borderWidth={3}
            />
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-1 text-sm font-semibold transition-all duration-200 relative group rounded-lg hover:bg-white/10 dark:hover:bg-black/20"
              >
                {item.name}
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <motion.div
          initial={false}
          animate={menuOpen ? { x: 0 } : { x: '-100%' }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 w-4/5 max-w-xs h-full bg-white/5 dark:bg-black/10 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/30 flex flex-col pt-24 px-6 space-y-4 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cross bar to close menu */}
          <button
            aria-label="Close menu"
            className="absolute top-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 shadow-lg"
            onClick={() => setMenuOpen(false)}
          >
            <span className="block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 rotate-45 absolute"></span>
            <span className="block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 -rotate-45 absolute"></span>
          </button>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-lg font-semibold py-2 px-3 rounded-lg hover:bg-white/10 dark:hover:bg-black/20 transition-all duration-200 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute top-3 right-4">
        <ThemeToggle />
      </div>
    </motion.nav>
  );
};

export default Navbar;
