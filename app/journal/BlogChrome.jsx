import Image from 'next/image';
import Link from 'next/link';

import CurrentYear from '@/components/CurrentYear';
import ThemeToggle from '@/components/ThemeToggle';

const NAV_LINKS = [
  { href: '/', label: 'Films' },
  { href: '/photos', label: 'Photos' },
  { href: '/clients', label: 'Clients' },
];

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/shohorabs.pov/', label: 'Instagram' },
  { href: 'https://www.linkedin.com/in/shohorabhshawon/', label: 'LinkedIn' },
  { href: 'https://github.com/ShohorabHShawon', label: 'GitHub' },
  { href: 'https://www.behance.net/shohorabhshawon', label: 'Behance' },
];

// The photo is a wide portrait, so zoom in around the face for small round avatars.
export function AuthorAvatar({ size = 32, className = '' }) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full bg-journal-line ring-1 ring-journal-accent/40 ${className}`}
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

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-journal-line/80 bg-journal-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[72px] md:px-8">
        <Link href="/journal" className="group flex items-center gap-3">
          <AuthorAvatar size={34} />
          <span className="leading-none">
            <span className="block text-sm font-semibold tracking-[0.14em] text-journal-ink">
              SHOHORAB<span className="text-journal-muted"> / </span>
              <span className="text-journal-accent">JOURNAL</span>
            </span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.3em] text-journal-muted">
              Film · Photo · Code
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted transition hover:text-journal-accent md:inline-flex"
            >
              {link.label}
            </Link>
          ))}
          <span aria-hidden="true" className="mx-2 hidden h-5 w-px bg-journal-line md:block" />
          <ThemeToggle className="flex h-9 w-9 items-center justify-center border border-journal-line text-journal-body transition hover:border-journal-accent hover:text-journal-accent [&_svg]:!text-current" />
        </nav>
      </div>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-journal-line bg-journal-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-0 select-none font-mono text-[24vw] font-bold leading-[0.75] tracking-[-0.08em] text-journal-ink/[0.03]"
      >
        SHS
      </div>
      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-20 md:px-8 md:pt-24">
        <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-journal-accent">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-current opacity-60" />
          Have a story in mind?
        </p>
        <a
          href="mailto:shohorabhshawon@gmail.com"
          className="group mt-6 inline-flex items-center gap-4 text-[clamp(2.4rem,7vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.06em] text-journal-ink transition hover:text-journal-accent"
        >
          Let&apos;s make it
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-[0.55em] w-[0.55em] shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </a>

        <div className="mt-14 grid gap-10 border-t border-journal-line pt-10 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-journal-muted">About</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-journal-body">
              Filmmaker, photographer and software engineer from Dhaka, writing about craft, light and
              the things I build.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-journal-muted">Explore</p>
            <ul className="mt-3 space-y-1.5 text-sm text-journal-body">
              <li>
                <Link href="/journal" className="transition hover:text-journal-accent">
                  All entries
                </Link>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-journal-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/dev" className="transition hover:text-journal-accent">
                  Developer portfolio
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-journal-muted">Follow</p>
            <ul className="mt-3 space-y-1.5 text-sm text-journal-body">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-journal-accent"
                  >
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-journal-line pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-journal-muted sm:flex-row">
          <p>
            © <CurrentYear /> Shohorab H Shawon · SHS Journal
          </p>
          <p>Dhaka, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
