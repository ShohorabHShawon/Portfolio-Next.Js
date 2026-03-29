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

  const isManga = variant === 'manga';

  const getIcon = () => {
    if (currentTheme === 'dark') {
      return <SunIcon className={`h-5 w-5 ${isManga ? 'text-[#0b1220]' : 'text-yellow-500'}`} />;
    } else {
      return <MoonIcon className={`h-5 w-5 ${isManga ? 'text-[#0b1220]' : 'text-gray-700 dark:text-gray-300'}`} />;
    }
  };

  const buttonClassName = isManga
    ? 'group relative flex h-12 w-12 items-center justify-center rounded-[14px] border-[3px] border-black bg-[#fde047] shadow-[4px_4px_0_#111111] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#facc15] hover:shadow-[5px_5px_0_#111111] dark:border-[#7dd3fc] dark:bg-[#f59e0b] dark:shadow-[4px_4px_0_#164e63] dark:hover:bg-[#fbbf24] dark:hover:shadow-[5px_5px_0_#164e63]'
    : 'flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-800';

  return (
    <button
      onClick={handleThemeChange}
      className={buttonClassName}
      aria-label="Toggle theme"
    >
      {isManga && <span className="pointer-events-none absolute -right-1 -top-1 h-3 w-3 rounded-full border border-black bg-white dark:border-[#7dd3fc] dark:bg-[#0f1b2d]" />}
      {mounted ? getIcon() : <MoonIcon className={`h-5 w-5 ${isManga ? 'text-[#0b1220]' : 'text-gray-700 dark:text-gray-300'}`} />}
    </button>
  );
}
