'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon } from '@heroicons/react/24/outline';
import { FaMoon } from 'react-icons/fa';

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
      return <SunIcon className="w-5 h-5 text-white" />;
    } else {
      return <FaMoon className="w-4 h-4 text-white" />;
    }
  };

  return (
    <button
      onClick={handleThemeChange}
      className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {getIcon()}
    </button>
  );
}
