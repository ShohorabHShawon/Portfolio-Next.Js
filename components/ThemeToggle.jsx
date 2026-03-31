'use client';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle({ variant = 'default' }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Set default theme to system if no theme is set
    if (!theme) {
      setTheme('system');
    }
  }, [theme, setTheme]);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const isBlogModern = variant === 'blog-modern';
  const isBlogManga = variant === 'blog-manga';
  const isManga = variant === 'manga' || isBlogManga;
  const isBlogVariant = isBlogModern || isBlogManga;
  const isDarkTheme = currentTheme === 'dark';
  const thumbShiftClass = mounted && isDarkTheme ? 'translate-x-[34px]' : 'translate-x-0';

  const buttonClassName = isBlogVariant
    ? `group relative inline-flex h-[42px] w-[78px] items-center rounded-full p-1 transition-all duration-200 ${
      isBlogManga
        ? 'border-2 border-black bg-[#fff7cc] shadow-[2px_2px_0_#111111] hover:-translate-y-0.5 hover:bg-[#fde68a] hover:shadow-[3px_3px_0_#111111] dark:border-[#5eead4] dark:bg-[#13233a] dark:shadow-[2px_2px_0_#0a3a46] dark:hover:bg-[#1b3652] dark:hover:shadow-[3px_3px_0_#0a3a46]'
        : 'border border-[#d0d0d0] bg-white hover:border-[#191919] hover:bg-[#f8fafc] dark:border-[#3a3a3a] dark:bg-transparent dark:hover:border-[#f3f3f3] dark:hover:bg-[#1b1d1e]'
    }`
    : isManga
      ? 'group relative flex h-12 w-12 items-center justify-center rounded-[14px] border-[3px] border-black bg-[#fde047] shadow-[4px_4px_0_#111111] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#facc15] hover:shadow-[5px_5px_0_#111111] dark:border-[#7dd3fc] dark:bg-[#f59e0b] dark:shadow-[4px_4px_0_#164e63] dark:hover:bg-[#fbbf24] dark:hover:shadow-[5px_5px_0_#164e63]'
      : 'flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-800';

  if (isBlogVariant) {
    const leftIconClass = isBlogManga
      ? `absolute left-3 h-4 w-4 transition-colors ${mounted && !isDarkTheme ? 'text-[#0f172a]' : 'text-[#64748b] dark:text-[#6b7280]'}`
      : `absolute left-3 h-4 w-4 transition-colors ${mounted && !isDarkTheme ? 'text-[#0f172a]' : 'text-[#94a3b8]'}`;

    const rightIconClass = isBlogManga
      ? `absolute right-3 h-4 w-4 transition-colors ${mounted && isDarkTheme ? 'text-[#0f172a]' : 'text-[#64748b] dark:text-[#6b7280]'}`
      : `absolute right-3 h-4 w-4 transition-colors ${mounted && isDarkTheme ? 'text-[#f8fafc]' : 'text-[#94a3b8]'}`;

    const thumbClass = isBlogManga
      ? `pointer-events-none absolute left-1 top-1 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-[#fde047] text-[#0f172a] shadow-[1px_1px_0_#111111] transition-transform duration-300 ${thumbShiftClass} dark:border-[#5eead4] dark:bg-[#f59e0b] dark:text-[#0b1220] dark:shadow-[1px_1px_0_#0a3a46]`
      : `pointer-events-none absolute left-1 top-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d0d0d0] bg-white text-[#0f172a] shadow-sm transition-transform duration-300 ${thumbShiftClass} dark:border-[#475569] dark:bg-[#0f172a] dark:text-[#e2e8f0]`;

    return (
      <button
        onClick={handleThemeChange}
        className={buttonClassName}
        aria-label="Toggle theme"
        title={mounted && isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <SunIcon className={leftIconClass} />
        <MoonIcon className={rightIconClass} />
        <span className={thumbClass}>
          {mounted && isDarkTheme ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleThemeChange}
      className={buttonClassName}
      aria-label="Toggle theme"
    >
      {isManga && !isBlogManga && <span className="pointer-events-none absolute -right-1 -top-1 h-3 w-3 rounded-full border border-black bg-white dark:border-[#7dd3fc] dark:bg-[#0f1b2d]" />}
      {mounted && isDarkTheme ? <SunIcon className={`h-5 w-5 ${isManga ? 'text-[#0b1220]' : 'text-yellow-500'}`} /> : <MoonIcon className={`h-5 w-5 ${isManga ? 'text-[#0b1220]' : 'text-gray-700 dark:text-gray-300'}`} />}
    </button>
  );
}
