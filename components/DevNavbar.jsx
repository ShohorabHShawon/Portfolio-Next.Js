'use client';
import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

const DevNavbar = () => {
  const navItems = [
    { name: 'home()', href: 'home', icon: '💻', type: 'function' },
    { name: 'about.ts', href: 'about', icon: '📄', type: 'file' },
    { name: 'skills[]', href: 'skills', icon: '🔧', type: 'array' },
    { name: '<Projects />', href: 'projects', icon: '🚀', type: 'component' },
    { name: 'contact.connect()', href: 'contact', icon: '🌐', type: 'method' },
  ];

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState('home()');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e, href, name) => {
    e.preventDefault();
    scrollToSection(href);
    setActiveItem(name);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 w-full z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center md:justify-between items-center h-16 relative">
          {/* Mobile Terminal Button */}
          <div className="md:hidden flex items-center absolute left-0 top-1/2 -translate-y-1/2">
            <button
              aria-label="Open menu"
              className="relative z-50 flex flex-col justify-center items-center w-10 h-10 rounded-md bg-gray-300/50 dark:bg-black/20 backdrop-blur-sm border border-green-500/30 hover:border-green-400 transition-colors focus:outline-none font-mono"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="text-green-600 text-md">
                {menuOpen ? 'exit' : 'menu'}
              </span>
            </button>
          </div>

          {/* Desktop Code Editor Tabs */}
          <div className="hidden md:flex mx-auto bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-gray-300/50 dark:border-gray-700/50 rounded-lg overflow-hidden relative">
            {/* Tab bar header */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gray-300/50 dark:bg-black/20 backdrop-blur-sm border-b border-gray-300/50 dark:border-gray-700/50 flex items-center px-3">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-3 text-xs text-gray-600 dark:text-gray-400 font-mono">
                Navbar.tsx
              </span>
            </div>

            <div className="flex pt-8">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={`#${item.href}`}
                  className={`text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-3 text-sm font-mono transition-all duration-200 relative group border-r border-gray-300/50 dark:border-gray-700/50 last:border-r-0 ${
                    activeItem === item.name
                      ? 'bg-gray-300/50 dark:bg-black/20 backdrop-blur-sm text-green-600 dark:text-green-600'
                      : ''
                  }`}
                  onClick={(e) => handleNavClick(e, item.href, item.name)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">{index + 1}</span>
                    <span
                      className={`text-xs ${
                        item.type === 'function'
                          ? 'text-blue-600 dark:text-blue-400'
                          : item.type === 'component'
                          ? 'text-purple-600 dark:text-purple-400'
                          : item.type === 'array'
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : item.type === 'method'
                          ? 'text-green-600 dark:text-green-600'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Syntax highlighting underline */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 ${
                      item.type === 'function'
                        ? 'bg-blue-600 dark:bg-blue-400'
                        : item.type === 'component'
                        ? 'bg-purple-600 dark:bg-purple-400'
                        : item.type === 'array'
                        ? 'bg-yellow-600 dark:bg-yellow-400'
                        : item.type === 'method'
                        ? 'bg-green-600 dark:bg-green-400'
                        : 'bg-gray-600 dark:bg-gray-400'
                    } ${
                      activeItem === item.name
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-50'
                    }`}
                  ></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Terminal Menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 bg-white/40 dark:bg-black/40 backdrop-blur-sm md:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <motion.div
          initial={false}
          animate={menuOpen ? { x: 0 } : { x: '-100%' }}
          transition={{ duration: 0.3, type: 'tween' }}
          className="absolute top-0 left-0 w-4/5 max-w-xs h-full bg-white/10 dark:bg-black/10 backdrop-blur-md border-r border-gray-300/50 dark:border-green-500/30 flex flex-col font-mono"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Terminal Header */}
          <div className="bg-gray-black/50 dark:bg-black/20 backdrop-blur-sm border-b border-gray-300/50 dark:border-gray-700/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <button
                aria-label="Close menu"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="mt-2 text-green-600 dark:text-green-600 text-sm">
              <span className="text-gray-500 dark:text-gray-500">
                ~/portfolio
              </span>{' '}
              ls -la
            </div>
          </div>

          {/* Terminal Content */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={`#${item.href}`}
                className="block text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-600 text-sm py-2 transition-all duration-200 group"
                onClick={(e) => handleNavClick(e, item.href, item.name)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 dark:text-gray-500 w-6">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`${
                      item.type === 'function'
                        ? 'text-blue-600 dark:text-blue-400'
                        : item.type === 'component'
                        ? 'text-purple-600 dark:text-purple-400'
                        : item.type === 'array'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : item.type === 'method'
                        ? 'text-green-600 dark:text-green-600'
                        : 'text-gray-600 dark:text-gray-400'
                    } group-hover:text-gray-900 dark:group-hover:text-white transition-colors`}
                  >
                    {item.name}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 ml-9 group-hover:text-gray-600 dark:group-hover:text-gray-400">
                  {item.name.replace(/[()[\]<>/]/g, '')}
                </div>
              </a>
            ))}
          </div>

          {/* Terminal Footer */}
          <div className="border-t border-gray-300/50 dark:border-gray-700/50 p-4">
            <div className="text-xs text-gray-500 dark:text-gray-500">
              <span className="text-green-600 dark:text-green-600">✓</span>{' '}
              Ready for navigation
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Theme Toggle with Dev Icon */}
      <div className="absolute top-3 right-4 flex items-center space-x-2">
        <div className="hidden md:block text-xs font-mono text-gray-500 dark:text-gray-500">
          {/* // toggle theme */}
        </div>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
};

export default DevNavbar;
