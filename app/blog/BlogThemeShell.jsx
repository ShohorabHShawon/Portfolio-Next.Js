'use client';

import { useEffect } from 'react';

import ThemeToggle from '@/components/ThemeToggle';

const STORAGE_KEY = 'blog-theme';

export default function BlogThemeShell({ children }) {
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, 'modern');
    document.documentElement.setAttribute('data-blog-theme', 'modern');
  }, []);

  return (
    <>
      <div className="fixed right-6 top-6 z-[70] flex items-center gap-2">
        <ThemeToggle />
      </div>

      {children}
    </>
  );
}
