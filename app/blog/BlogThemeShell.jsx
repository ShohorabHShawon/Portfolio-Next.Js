'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const [activeTheme, setActiveTheme] = useState('manga');
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const setBlogTheme = (themeValue) => {
    if (!BLOG_THEMES[themeValue]) return;
    setActiveTheme(themeValue);
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/photography', label: 'Photography' },
  ];

  const navShellClass = isModern
    ? 'sticky top-0 z-[90] border-b border-[#e6e6e6] bg-[#fdfdfb]/90 backdrop-blur-xl dark:border-[#2a2a2a] dark:bg-[#181a1b]/90'
    : 'sticky top-0 z-[90] border-b-4 border-black bg-[#fff7cc]/95 shadow-[0_6px_0_#111111] backdrop-blur-xl dark:border-[#5eead4] dark:bg-[#0f1a2e]/95 dark:shadow-[0_6px_0_#0a3a46]';

  const linkClass = isModern
    ? 'inline-flex min-h-[42px] items-center rounded-full border border-transparent px-3 py-2 text-sm font-medium text-[#4b4b4b] transition hover:border-[#d0d0d0] hover:text-[#191919] dark:text-[#d1d1d1] dark:hover:border-[#3a3a3a] dark:hover:text-[#f3f3f3]'
    : 'inline-flex min-h-[42px] items-center rounded-full border-2 border-black bg-white px-3 py-2 text-sm font-bold uppercase tracking-[0.1em] text-slate-800 transition hover:-translate-y-0.5 hover:bg-[#fde68a] dark:border-[#5eead4] dark:bg-[#13233a] dark:text-[#d8ebf8] dark:hover:bg-[#1b3652]';

  const linkActiveClass = isModern
    ? 'border-[#d0d0d0] bg-white text-[#191919] dark:border-[#3a3a3a] dark:bg-[#1b1d1e] dark:text-[#f3f3f3]'
    : 'bg-[#fde047] dark:bg-[#244a70]';

  const themeSwitchWrapClass = isModern
    ? 'inline-flex items-center rounded-full border border-[#d0d0d0] bg-white p-1 dark:border-[#3a3a3a] dark:bg-transparent'
    : 'inline-flex items-center rounded-full border-2 border-black bg-[#fde047] p-1 dark:border-[#5eead4] dark:bg-[#244a70]';

  const getThemeSwitchButtonClass = (themeValue) => {
    const isActive = activeTheme === themeValue;

    if (isModern) {
      return `inline-flex min-h-[34px] items-center rounded-full px-3 text-xs font-semibold transition ${
        isActive
          ? 'bg-[#0f172a] text-white dark:bg-[#f3f3f3] dark:text-[#111111]'
          : 'text-[#4b4b4b] hover:bg-[#f1f5f9] dark:text-[#d1d1d1] dark:hover:bg-[#1b1d1e]'
      }`;
    }

    return `inline-flex min-h-[34px] items-center rounded-full px-3 text-[11px] font-bold uppercase tracking-[0.08em] transition ${
      isActive
        ? 'border border-black bg-white text-slate-900 dark:border-[#5eead4] dark:bg-[#13233a] dark:text-[#d8ebf8]'
        : 'text-slate-800 hover:bg-[#facc15] dark:text-[#d8ebf8] dark:hover:bg-[#2e5b86]'
    }`;
  };

  const menuButtonClass = isModern
    ? 'inline-flex min-h-[42px] items-center justify-center rounded-full border border-[#d0d0d0] bg-white px-3 py-2 text-sm font-medium text-[#3f3f3f] transition hover:border-[#191919] hover:text-[#191919] dark:border-[#3a3a3a] dark:bg-transparent dark:text-[#d1d1d1] dark:hover:border-[#f3f3f3] dark:hover:text-[#f3f3f3] md:hidden'
    : 'inline-flex min-h-[42px] items-center justify-center rounded-full border-2 border-black bg-[#fde047] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-900 transition hover:bg-[#facc15] dark:border-[#5eead4] dark:bg-[#244a70] dark:text-[#d8ebf8] dark:hover:bg-[#2e5b86] md:hidden';

  const mobilePanelClass = isModern
    ? 'mt-3 grid gap-2 border-t border-[#e6e6e6] pt-3 dark:border-[#2a2a2a] md:hidden'
    : 'mt-3 grid gap-2 border-t-2 border-black pt-3 dark:border-[#5eead4] md:hidden';

  return (
    <>
      <header className={navShellClass}>
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 md:px-8">
          <Link
            href="/blog"
            className={`inline-flex min-h-[42px] items-center rounded-full px-3 py-2 ${
              isModern
                ? 'text-sm font-semibold text-[#191919] dark:text-[#f3f3f3]'
                : 'border-2 border-black bg-white text-xs font-bold uppercase tracking-[0.1em] text-slate-900 dark:border-[#5eead4] dark:bg-[#13233a] dark:text-[#d8ebf8]'
            }`}
          >
            Shohorab Blog
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {links.map((item) => {
              const isActive = item.href === '/blog'
                ? pathname === '/blog' || pathname?.startsWith('/blog/')
                : pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${linkClass} ${isActive ? linkActiveClass : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <div className={themeSwitchWrapClass} aria-label="Blog theme switcher" role="group">
              {THEME_ORDER.map((themeValue) => (
                <button
                  key={themeValue}
                  type="button"
                  onClick={() => setBlogTheme(themeValue)}
                  className={getThemeSwitchButtonClass(themeValue)}
                  aria-pressed={activeTheme === themeValue}
                  disabled={!mounted}
                >
                  {BLOG_THEMES[themeValue].label}
                </button>
              ))}
            </div>
            <ThemeToggle variant={activeTheme === 'manga' ? 'blog-manga' : 'blog-modern'} />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className={menuButtonClass}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            Menu
          </button>
        </div>

        {menuOpen && (
          <div className="mx-auto max-w-6xl px-5 pb-3 md:px-8">
            <div className={mobilePanelClass}>
              {links.map((item) => {
                const isActive = item.href === '/blog'
                  ? pathname === '/blog' || pathname?.startsWith('/blog/')
                  : pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${linkClass} ${isActive ? linkActiveClass : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <div className={themeSwitchWrapClass} aria-label="Blog theme switcher" role="group">
                  {THEME_ORDER.map((themeValue) => (
                    <button
                      key={themeValue}
                      type="button"
                      onClick={() => setBlogTheme(themeValue)}
                      className={getThemeSwitchButtonClass(themeValue)}
                      aria-pressed={activeTheme === themeValue}
                      disabled={!mounted}
                    >
                      {BLOG_THEMES[themeValue].label}
                    </button>
                  ))}
                </div>
                <ThemeToggle variant={activeTheme === 'manga' ? 'blog-manga' : 'blog-modern'} />
              </div>
            </div>
          </div>
        )}
      </header>

      {children}
    </>
  );
}
