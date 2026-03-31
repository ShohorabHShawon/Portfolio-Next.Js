'use client';

import { useEffect, useState } from 'react';

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

  const changeTheme = () => {
    const currentIndex = THEME_ORDER.indexOf(activeTheme);
    const nextTheme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
    setActiveTheme(nextTheme);
  };

  return (
    <>
      <div className="fixed right-6 top-6 z-[70] flex items-center gap-2">
        <button
          type="button"
          onClick={changeTheme}
          className="relative inline-flex h-9 w-[122px] items-center gap-1 rounded-full border border-[#cbd5e1] bg-white/95 p-1 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.55)] backdrop-blur-md transition hover:shadow-[0_14px_28px_-18px_rgba(15,23,42,0.75)] dark:border-[#334155] dark:bg-[#0f172a]/95"
          aria-label="Change blog theme"
          title={`Current blog theme: ${BLOG_THEMES[activeTheme]?.label || 'Manga'}`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute left-1 top-1 inline-flex h-7 w-[52px] items-center justify-center rounded-full transition-transform duration-300 ${
              isModern
                ? 'translate-x-[56px] bg-[#0f172a] dark:bg-[#e2e8f0]'
                : 'translate-x-0 border border-black bg-[#fde047] dark:border-[#7dd3fc] dark:bg-[#f59e0b]'
            }`}
          />

          <span className={`relative z-10 inline-flex w-[52px] items-center justify-center text-[10px] font-bold uppercase tracking-[0.06em] transition-colors ${isModern ? 'text-[#64748b] dark:text-[#94a3b8]' : 'text-[#111827] dark:text-[#0b1220]'}`}>
            Manga
          </span>
          <span className={`relative z-10 inline-flex w-[52px] items-center justify-center text-[10px] font-bold uppercase tracking-[0.06em] transition-colors ${isModern ? 'text-[#f8fafc] dark:text-[#111827]' : 'text-[#64748b] dark:text-[#94a3b8]'}`}>
            Modern
          </span>
        </button>

        <ThemeToggle variant={activeTheme === 'manga' ? 'manga' : 'default'} />
      </div>

      {children}
    </>
  );
}
