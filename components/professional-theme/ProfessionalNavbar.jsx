'use client';

import ThemeToggle from '@/components/ThemeToggle';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
];

export default function ProfessionalNavbar() {
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
    setMenuOpen(false);
    setActiveItem(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/92 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#020617]/92">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          onClick={(e) => goTo(e, 'home')}
          className="flex flex-col"
        >
          <span className="text-sm font-semibold tracking-[0.06em] text-slate-900 dark:text-slate-100">Shohorab H Shawon</span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Software Engineer</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              onClick={(e) => goTo(e, item.href)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] transition-colors ${
                activeItem === item.href
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                  : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-white'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <a
            href="#contact"
            onClick={(e) => goTo(e, 'contact')}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.09em] text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-100 dark:hover:text-white"
          >
            Hire Me
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-slate-700 dark:border-slate-700 dark:text-slate-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-[#020617] lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(e) => goTo(e, item.href)}
                className={`rounded-md px-3 py-2 text-xs font-medium uppercase tracking-[0.08em] ${
                  activeItem === item.href
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => goTo(e, 'contact')}
              className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
