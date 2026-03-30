'use client';

import { useEffect, useMemo, useState } from 'react';

import ThemeToggle from '@/components/ThemeToggle';

const STORAGE_KEY = 'blog-theme';

const BLOG_THEMES = {
  manga: {
    label: 'Manga',
  },
  modern: {
    label: 'Modern',
  },
};

const THEME_ORDER = ['manga', 'modern'];

function normalizeTheme(themeValue) {
  if (!themeValue || !BLOG_THEMES[themeValue]) {
    return 'manga';
  }

  return themeValue;
}

export default function BlogThemeShell({ children }) {
  const [activeTheme, setActiveTheme] = useState('manga');
  const [mounted, setMounted] = useState(false);
  const isModern = activeTheme === 'modern';

  useEffect(() => {
    const savedTheme = normalizeTheme(window.localStorage.getItem(STORAGE_KEY));
    setActiveTheme(savedTheme);
    document.documentElement.setAttribute('data-blog-theme', savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    window.localStorage.setItem(STORAGE_KEY, activeTheme);
    document.documentElement.setAttribute('data-blog-theme', activeTheme);
  }, [activeTheme, mounted]);

  const activeThemeConfig = useMemo(() => {
    return BLOG_THEMES[activeTheme] || BLOG_THEMES.manga;
  }, [activeTheme]);

  const changeTheme = () => {
    const currentIndex = THEME_ORDER.indexOf(activeTheme);
    const nextTheme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
    setActiveTheme(nextTheme);
  };

  return (
    <>
      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle variant={activeTheme === 'manga' ? 'manga' : 'default'} />
      </div>

      <button
        type="button"
        onClick={changeTheme}
        className={`group fixed bottom-4 left-1/2 z-[70] inline-flex -translate-x-1/2 items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-semibold backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 sm:bottom-5 sm:left-auto sm:right-5 sm:translate-x-0 sm:gap-2.5 sm:rounded-2xl sm:px-3.5 sm:py-2.5 sm:text-xs ${
          isModern
            ? 'border border-[#60a5fa]/60 bg-[#0f172a]/95 text-white shadow-[0_16px_34px_-18px_rgba(2,6,23,0.95)] hover:border-[#93c5fd] hover:bg-[#111f35] dark:border-[#93c5fd]/60 dark:bg-[#0b1220]/95 dark:hover:border-[#bfdbfe] dark:hover:bg-[#152844]'
            : 'border border-[#93c5fd]/55 bg-[#14243d]/90 text-white shadow-[0_14px_32px_-18px_rgba(2,6,23,0.92)] hover:border-[#bfdbfe] hover:bg-[#1a3050] dark:border-[#93c5fd]/55 dark:bg-[#0b1727]/92 dark:text-white dark:shadow-[0_14px_32px_-18px_rgba(2,6,23,0.95)] dark:hover:border-[#bfdbfe] dark:hover:bg-[#152844]'
        }`}
        aria-label="Change blog theme"
        title={`Current blog theme: ${activeThemeConfig.label}`}
      >
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-180 sm:h-7 sm:w-7 ${
              isModern
                ? 'bg-gradient-to-br from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] shadow-[0_8px_22px_-12px_rgba(14,165,233,0.9)]'
                : 'bg-gradient-to-br from-[#0ea5e9] via-[#3b82f6] to-[#2563eb] shadow-[0_8px_20px_-10px_rgba(37,99,235,0.8)]'
            }`}
          >
            ⟳
          </span>
          <span className="inline-flex flex-col items-start leading-tight">
            <span className={`text-[9px] font-semibold uppercase tracking-[0.12em] sm:text-[10px] ${isModern ? 'text-[#93c5fd]' : 'text-[#bfdbfe]'}`}>
              Blog Theme
            </span>
            <span className={`text-[10px] font-semibold tracking-[0.01em] sm:text-[11px] ${isModern ? 'text-white' : 'text-white'}`}>
              {mounted ? activeThemeConfig.label : 'Loading...'}
            </span>
          </span>
        </span>
        <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] sm:px-2.5 sm:py-1 sm:text-[10px] ${isModern ? 'bg-[#0ea5e9]/24 text-white' : 'bg-[#1e3a5f] text-white dark:bg-[#13243a] dark:text-white'}`}>
          switch
        </span>
      </button>

      {children}
    </>
  );
}
