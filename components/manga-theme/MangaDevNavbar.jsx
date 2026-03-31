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

export default function MangaDevNavbar() {
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
    const section = document.getElementById(id);
    if (!section) return;

    if (window.lenis) {
      window.lenis.scrollTo(section, { offset: -12 });
      return;
    }

    section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative flex h-[68px] items-center justify-between overflow-hidden rounded-2xl border-[3px] border-[#111] bg-[#fff4d6]/95 px-3.5 shadow-[7px_7px_0_0_#111] backdrop-blur-sm dark:border-[#f6f2e8] dark:bg-[#0f1319]/95 dark:shadow-[7px_7px_0_0_#f6f2e8] sm:px-4">
          <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_2px_2px,#111_1px,transparent_0)] [background-size:14px_14px] dark:opacity-15" />
          <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[#ff8a66]/25 blur-2xl dark:bg-[#38bdf8]/20" />

          <a
            href="#home"
            onClick={(e) => handleClick(e, 'home')}
            className="relative z-10 rounded-lg border-[3px] border-[#111] bg-[#ffe063] px-3 py-1.5 text-[11px] font-black tracking-[0.14em] text-[#111] shadow-[3px_3px_0_0_#111] transition-transform hover:-translate-y-0.5 dark:border-[#f6f2e8] dark:bg-[#f59e0b] dark:text-[#111] dark:shadow-[3px_3px_0_0_#f6f2e8]"
          >
            CH.00 SHOHORAB
          </a>

          <div className="relative z-10 hidden items-center gap-2 md:flex">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(e) => handleClick(e, item.href)}
                className={`rounded-lg border-[3px] px-3.5 py-1.5 text-xs font-black tracking-[0.12em] transition-all duration-200 hover:-translate-y-0.5 ${
                  activeItem === item.href
                    ? 'border-[#111] bg-[#45d7ff] text-[#111] shadow-[3px_3px_0_0_#111] dark:border-[#f6f2e8] dark:bg-[#7dd3fc] dark:text-[#111] dark:shadow-[3px_3px_0_0_#f6f2e8]'
                    : index % 2 === 0
                      ? 'border-[#111]/40 bg-white/85 text-[#111] hover:bg-[#fff8e6] dark:border-white/35 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
                      : 'border-[#111]/40 bg-[#fef3c7]/75 text-[#111] hover:bg-[#fde68a] dark:border-white/35 dark:bg-[#1f2a37] dark:text-white dark:hover:bg-[#243244]'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <ThemeToggle variant="manga" />
            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border-[3px] border-[#111] bg-[#ef4b3f] px-2 text-[11px] font-black tracking-[0.08em] text-white shadow-[3px_3px_0_0_#111] transition-transform hover:-translate-y-0.5 md:hidden dark:border-[#f6f2e8] dark:bg-[#f97316] dark:shadow-[3px_3px_0_0_#f6f2e8]"
            >
              {menuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="relative mt-3 overflow-hidden rounded-2xl border-[3px] border-[#111] bg-[#fff4d6] p-3.5 shadow-[7px_7px_0_0_#111] md:hidden dark:border-[#f6f2e8] dark:bg-[#0f1319] dark:shadow-[7px_7px_0_0_#f6f2e8]">
            <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_2px_2px,#111_1px,transparent_0)] [background-size:14px_14px] dark:opacity-15" />
            <p className="relative z-10 mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#111] dark:text-[#f6f2e8]">
              Jump To Chapter
            </p>

            <div className="relative z-10 grid grid-cols-1 gap-2.5">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`flex items-center justify-between rounded-lg border-[3px] px-3 py-2.5 text-xs font-black tracking-[0.1em] shadow-[3px_3px_0_0_#111] transition-transform hover:-translate-y-0.5 dark:border-[#f6f2e8] dark:shadow-[3px_3px_0_0_#f6f2e8] ${
                    activeItem === item.href
                      ? 'border-[#111] bg-[#45d7ff] text-[#111] dark:bg-[#7dd3fc] dark:text-[#111]'
                      : 'border-[#111] bg-white text-[#111] dark:bg-[#18202a] dark:text-white'
                  }`}
                >
                  <span className="rounded-md border-2 border-current px-1.5 py-0.5 text-[10px] leading-none">
                    0{index + 1}
                  </span>
                  <span>{item.name}</span>
                  <span className="text-[10px]">&gt;&gt;</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
