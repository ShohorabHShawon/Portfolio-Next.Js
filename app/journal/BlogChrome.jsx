import Image from 'next/image';
import Link from 'next/link';

import CurrentYear from '@/components/CurrentYear';
import ThemeToggle from '@/components/ThemeToggle';

const NAV_LINKS = [
  { href: '/', label: 'Portfolio' },
  { href: '/photography', label: 'Photography' },
];

const SOCIAL_LINKS = [
  {
    href: 'https://github.com/ShohorabHShawon',
    label: 'GitHub',
    path: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
  },
  {
    href: 'https://www.linkedin.com/in/shohorabhshawon/',
    label: 'LinkedIn',
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v6.45h-4v-5.72c0-1.36-.03-3.12-1.9-3.12-1.9 0-2.2 1.49-2.2 3.02v5.82h-4v-11Z',
  },
  {
    href: 'https://www.behance.net/shohorabhshawon',
    label: 'Behance',
    path: 'M8.2 11.3c.8-.4 1.3-1.1 1.3-2.2 0-2-1.5-2.6-3.3-2.6H1v11h5.4c2 0 3.9-1 3.9-3.3 0-1.4-.7-2.5-2.1-2.9ZM3.4 8.4h2.3c.9 0 1.6.2 1.6 1.2s-.6 1.3-1.5 1.3H3.4V8.4Zm2.5 7.2H3.4v-3h2.6c1 0 1.7.4 1.7 1.5s-.8 1.5-1.8 1.5ZM15 7.1h4.6v1.3H15V7.1Zm2.4 2.4c-2.5 0-4.2 1.9-4.2 4.3 0 2.5 1.6 4.3 4.2 4.3 1.9 0 3.2-.9 3.8-2.7h-2c-.2.7-1.1 1-1.7 1-1.3 0-2-.8-2-2.1h5.8c.1-2.7-1.4-4.8-3.9-4.8Zm-1.9 3.4c.1-1.1.8-1.8 1.9-1.8s1.7.7 1.8 1.8h-3.7Z',
  },
];

// The photo is a wide portrait, so zoom in around the face for small round avatars.
export function AuthorAvatar({ size = 32, className = '' }) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full bg-zinc-200 ring-1 ring-zinc-900/10 dark:bg-zinc-800 dark:ring-white/10 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/shohorab1.JPG"
        alt="Shohorab H Shawon"
        fill
        sizes={`${size * 2}px`}
        className="scale-[1.35] object-cover [transform-origin:49%_28%]"
      />
    </span>
  );
}

export function isSiteAuthor(name) {
  return /shohorab|shawon/i.test(String(name || ''));
}

const navLinkClass =
  'hidden rounded-full px-3 py-1.5 text-zinc-600 transition hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-white sm:inline-flex';

export function BlogHeader({ children }) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-zinc-50/75 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/journal" className="flex items-center gap-2.5">
          <AuthorAvatar size={32} />
          <span className="text-sm font-semibold tracking-tight">
            Shohorab<span className="text-zinc-400 dark:text-zinc-500"> / </span>Journal
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {children}
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
          <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-zinc-200 dark:bg-zinc-800 sm:block" />
          <ThemeToggle className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:bg-zinc-800/70" />
        </nav>
      </div>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="relative border-t border-zinc-200 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <Link href="/journal" className="flex items-center gap-2.5">
              <AuthorAvatar size={36} />
              <span className="text-sm font-semibold tracking-tight">Shohorab H Shawon</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Software engineer, photographer and storyteller writing about building for the web,
              shipping products and the craft behind them.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/journal" className="transition hover:text-zinc-900 dark:hover:text-white">
                All stories
              </Link>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-zinc-900 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="mailto:ShohorabHShawon@gmail.com"
                className="transition hover:text-zinc-900 dark:hover:text-white"
              >
                Contact
              </a>
            </nav>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 ring-1 ring-inset ring-zinc-200 transition hover:text-zinc-900 hover:ring-zinc-300 dark:text-zinc-400 dark:ring-zinc-800 dark:hover:text-white dark:hover:ring-zinc-600"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500 sm:flex-row sm:justify-between">
          <p>
            © <CurrentYear /> Shohorab H Shawon (Shohorab Hossain Shawon). All rights reserved.
          </p>
          <p>Built with Next.js &amp; Sanity</p>
        </div>
      </div>
    </footer>
  );
}
