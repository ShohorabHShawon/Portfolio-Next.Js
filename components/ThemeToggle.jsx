'use client';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Set default theme to system if no theme is set
    if (!theme) {
      setTheme('system');
    }
  }, [theme, setTheme]);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (currentTheme === 'dark') {
      return <SunIcon className="w-5 h-5 text-yellow-500" />;
    } else {
      return <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />;
    }
  };

  return (
    <button
      onClick={handleThemeChange}
      className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {getIcon()}
    </button>
  );
}
