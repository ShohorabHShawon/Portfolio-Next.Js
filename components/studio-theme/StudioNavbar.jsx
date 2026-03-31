'use client';

import ThemeToggle from '@/components/ThemeToggle';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
];

export default function StudioNavbar() {
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
      { threshold: 0.5 },
    );

    NAV_ITEMS.forEach((item) => {
      const section = document.getElementById(item.href);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const goTo = (e, id) => {
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
      className="fixed top-0 z-50 w-full px-4 pt-4"
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-2xl border border-[#1f2937]/10 bg-white/90 px-3 shadow-sm backdrop-blur dark:border-[#334155]/70 dark:bg-[#050b12]/95">
        <a
          href="#home"
          onClick={(e) => goTo(e, 'home')}
          className="rounded-xl border border-[#1f2937]/10 bg-[#f7f4ee] px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-[#0f2233] dark:border-[#475569]/80 dark:bg-[#0f1a26] dark:text-[#f8fafc]"
        >
          SHOHORAB STUDIO
        </a>

        <div className="hidden items-center gap-1.5 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              onClick={(e) => goTo(e, item.href)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                activeItem === item.href
                  ? 'bg-[#0f2233] text-[#f8f6f2] dark:bg-[#f8fafc] dark:text-[#0f172a]'
                  : 'text-[#1f2937] hover:bg-[#f3f4f6] dark:text-[#e2e8f0] dark:hover:bg-[#1e293b]'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-xl border border-[#1f2937]/10 bg-[#f7f4ee] p-0.5 dark:border-[#475569]/70 dark:bg-[#0f1a26]">
            <ThemeToggle />
          </div>
          <button
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 min-w-[56px] items-center justify-center rounded-xl border border-[#1f2937]/10 bg-[#f7f4ee] px-3 text-xs font-semibold text-[#111827] md:hidden dark:border-[#475569]/80 dark:bg-[#0f1a26] dark:text-[#f8fafc]"
          >
            {menuOpen ? 'X' : 'Menu'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-2 w-full max-w-7xl rounded-2xl border border-[#1f2937]/10 bg-white p-3 md:hidden dark:border-[#334155]/70 dark:bg-[#050b12]/98">
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(e) => goTo(e, item.href)}
                className={`rounded-xl px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] ${
                  activeItem === item.href
                    ? 'bg-[#0f2233] text-[#f8f6f2] dark:bg-[#f8fafc] dark:text-[#0f172a]'
                    : 'bg-[#f9fafb] text-[#111827] dark:bg-[#0f1a26] dark:text-[#e2e8f0]'
                }`}
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