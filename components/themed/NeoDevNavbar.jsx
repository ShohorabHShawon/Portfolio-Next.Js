'use client';

import ThemeToggle from '@/components/ThemeToggle';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'HOME', href: 'home' },
  { name: 'ABOUT', href: 'about' },
  { name: 'SKILLS', href: 'skills' },
  { name: 'PROJECTS', href: 'projects' },
  { name: 'CONTACT', href: 'contact' },
];

export default function NeoDevNavbar() {
  const [activeItem, setActiveItem] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveItem(entry.target.id);
          }
        });
      },
      { threshold: 0.45 },
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    setActiveItem(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-0 z-50 w-full px-4 pt-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-xl border-[3px] border-[#131313] bg-[#fff4d8]/95 px-3 shadow-[5px_5px_0_0_#131313] backdrop-blur dark:border-[#f6f2e8] dark:bg-[#17181d]/90 dark:shadow-[5px_5px_0_0_#f6f2e8]">
        <a
          href="#home"
          onClick={(e) => handleClick(e, 'home')}
          className="rounded-md border-[3px] border-[#131313] bg-[#ffea00] px-3 py-1 text-xs font-black tracking-wider text-[#111] dark:border-[#f6f2e8]"
        >
          SHOHORAB.EXE
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              onClick={(e) => handleClick(e, item.href)}
              className={`rounded-md border-[2px] px-3 py-1.5 text-xs font-black tracking-wide transition-transform hover:-translate-y-0.5 ${
                activeItem === item.href
                  ? 'border-[#131313] bg-[#2ac6ff] text-[#111] shadow-[3px_3px_0_0_#131313] dark:border-[#f6f2e8] dark:shadow-[3px_3px_0_0_#f6f2e8]'
                  : 'border-[#131313]/30 bg-white/70 text-[#111] dark:border-white/35 dark:bg-white/10 dark:text-white'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border-[3px] border-[#131313] bg-[#ff5a1f] text-sm font-black text-white md:hidden dark:border-[#f6f2e8]"
          >
            {menuOpen ? 'X' : 'M'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-3 w-full max-w-7xl rounded-xl border-[3px] border-[#131313] bg-[#fff4d8] p-3 shadow-[5px_5px_0_0_#131313] md:hidden dark:border-[#f6f2e8] dark:bg-[#17181d] dark:shadow-[5px_5px_0_0_#f6f2e8]">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(e) => handleClick(e, item.href)}
                className="rounded-md border-[2px] border-[#131313] bg-white px-3 py-2 text-center text-xs font-black text-[#111] dark:border-[#f6f2e8] dark:bg-white/10 dark:text-white"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
