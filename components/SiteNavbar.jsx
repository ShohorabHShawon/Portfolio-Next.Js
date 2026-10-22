'use client';

import { motion } from 'framer-motion';
import { Aperture, BookOpen, Handshake, House, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Sections of the home page (scroll on home, link back to them elsewhere).
const SECTIONS = [
  { label: 'Work', target: 'work' },
  { label: 'Frames', target: 'frames' },
  { label: 'About', target: 'about' },
];

// Separate pages: each gets an icon so it reads as "another page", not a section.
const PAGES = [
  { label: 'Photos', href: '/photos', Icon: Aperture },
  { label: 'Clients', href: '/clients', Icon: Handshake },
  { label: 'Journal', href: '/journal', Icon: BookOpen },
];

export const scrollToId = (id) => {
  const element = document.getElementById(id);
  if (!element) return;

  if (window.lenis) {
    window.lenis.scrollTo(element, { offset: -72 });
    return;
  }

  element.scrollIntoView({ behavior: 'smooth' });
};

// Gold underline that draws in on hover and stays for the current page.
const underline = (active) =>
  `relative after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-[#d6a85f] after:transition-transform after:duration-300 hover:after:scale-x-100 ${
    active ? 'after:scale-x-100' : 'after:scale-x-0'
  }`;

function BrandMark({ currentPage }) {
  const CurrentIcon = currentPage?.Icon;

  return (
    <>
      <span className="relative block h-10 w-10 shrink-0">
        {/* The photo is a wide portrait, so zoom in around the face for the small square avatar. */}
        <span className="relative block h-full w-full overflow-hidden border border-[#d6a85f] bg-[#120f0d] ring-[#d6a85f] transition group-hover:ring-1">
          <Image
            src="/shohorab1.JPG"
            alt="Shohorab H Shawon"
            fill
            priority
            sizes="80px"
            className="scale-[1.35] object-cover [transform-origin:49%_28%]"
          />
        </span>
        <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-[#a74336]" aria-hidden="true" />
      </span>
      <span className="text-left leading-none">
        <span className="hidden text-sm font-semibold tracking-[0.16em] text-white sm:block">SHOHORAB</span>
        {currentPage ? (
          // "You are here" on inner pages
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#d6a85f] sm:mt-1 sm:text-[9px]">
            <CurrentIcon className="h-3 w-3" />
            {currentPage.label}
          </span>
        ) : (
          <span className="mt-1 hidden font-mono text-[9px] tracking-[0.3em] text-white/45 sm:block">FILM / PHOTO</span>
        )}
      </span>
    </>
  );
}

/**
 * The site's main navigation, shared by every page.
 * - `onHome`: section links scroll smoothly instead of linking back to the home page.
 * - `variant`: "overlay" floats over a dark hero and turns solid on scroll;
 *   "solid" sits in the page flow with a background from the start.
 * - `actions`: extra controls for a page (e.g. the journal's theme toggle).
 */
export default function SiteNavbar({ onHome = false, variant = 'overlay', actions = null }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    const rafId = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const isActive = (href) => pathname === href || Boolean(pathname?.startsWith(`${href}/`));
  const currentPage = onHome ? null : PAGES.find((page) => isActive(page.href)) || null;
  const closeMenu = () => setIsMenuOpen(false);
  const isSolid = variant === 'solid' || isScrolled || isMenuOpen;

  // A section entry is a button on the home page and a link back to it elsewhere.
  const renderSection = ({ label, target }, className, children) =>
    onHome ? (
      <button
        key={label}
        type="button"
        onClick={() => {
          closeMenu();
          scrollToId(target);
        }}
        className={className}
      >
        {children}
      </button>
    ) : (
      <Link key={label} href={`/#${target}`} onClick={closeMenu} className={className}>
        {children}
      </Link>
    );

  const bookClass =
    'hidden items-center gap-2 border border-[#d6a85f]/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d6a85f] transition hover:bg-[#d6a85f] hover:text-[#1a1512] sm:inline-flex';
  const bookContent = (
    <>
      <span className="h-1.5 w-1.5 rounded-full bg-[#a74336]" />
      Book a shoot
    </>
  );

  const menuItemClass = (active) =>
    `flex items-center justify-between border px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] transition hover:border-[#d6a85f]/60 hover:bg-[#d6a85f]/10 hover:text-[#d6a85f] ${
      active ? 'border-[#d6a85f]/60 bg-[#d6a85f]/10 text-[#d6a85f]' : 'border-white/10 text-white/70'
    }`;

  return (
    <header
      className={`${variant === 'solid' ? 'sticky' : 'fixed inset-x-0'} top-0 z-50 w-full transition-[background-color,border-color] duration-300 ${
        isSolid ? 'border-b border-white/10 bg-[#1a1512]/90 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="relative mx-auto flex h-16 w-full max-w-[88rem] items-center justify-between gap-4 px-5 md:h-20 md:px-10">
        {onHome ? (
          <button type="button" onClick={() => scrollToId('top')} className="group inline-flex items-center gap-3" aria-label="Back to top">
            <BrandMark currentPage={null} />
          </button>
        ) : (
          <Link href="/" className="group inline-flex items-center gap-3" aria-label="Shohorab H Shawon — home">
            <BrandMark currentPage={currentPage} />
          </Link>
        )}

        {/* Desktop links: home sections | pages */}
        <div className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.22em] text-white/65 lg:flex">
          {!onHome && (
            <Link href="/" aria-label="Home" title="Home" className="flex h-8 w-8 items-center justify-center border border-white/15 text-white/70 transition hover:border-[#d6a85f] hover:text-[#d6a85f]">
              <House className="h-3.5 w-3.5" />
            </Link>
          )}
          {SECTIONS.map((section) =>
            renderSection(section, `uppercase transition hover:text-[#d6a85f] ${underline(false)}`, section.label),
          )}

          <span aria-hidden="true" className="h-4 w-px bg-white/20" />

          {PAGES.map(({ label, href, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`group/page inline-flex items-center gap-2 uppercase transition hover:text-[#d6a85f] ${active ? 'text-[#d6a85f]' : ''}`}
              >
                <Icon className={`h-3.5 w-3.5 transition ${active ? 'text-[#d6a85f]' : 'text-[#d6a85f]/60 group-hover/page:text-[#d6a85f]'}`} />
                <span className={underline(active)}>{label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {actions}
          {onHome ? (
            <button type="button" onClick={() => scrollToId('contact')} className={bookClass}>
              {bookContent}
            </button>
          ) : (
            <Link href="/#contact" className={bookClass}>
              {bookContent}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex items-center gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 transition hover:text-[#d6a85f] lg:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-5 right-5 top-full mt-2 overflow-hidden border border-[#d6a85f]/35 bg-[#1a1512]/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <p className="px-2 pb-2 pt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">Home page</p>
            <div className="grid grid-cols-2 gap-1">
              {!onHome && (
                <Link href="/" onClick={closeMenu} className={menuItemClass(false)}>
                  Home
                  <House className="h-3.5 w-3.5 text-[#d6a85f]/70" />
                </Link>
              )}
              {[...SECTIONS, { label: 'Contact', target: 'contact' }].map((section) =>
                renderSection(
                  section,
                  menuItemClass(false),
                  <>
                    {section.label}
                    <span className="text-white/25">#</span>
                  </>,
                ),
              )}
            </div>

            <p className="px-2 pb-2 pt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">Pages</p>
            <div className="grid grid-cols-3 gap-1">
              {PAGES.map(({ label, href, Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={closeMenu}
                    aria-current={active ? 'page' : undefined}
                    className={`${menuItemClass(active)} flex-col !items-start gap-2`}
                  >
                    <Icon className="h-4 w-4 text-[#d6a85f]" />
                    {label}
                  </Link>
                );
              })}
            </div>

            <p className="mt-2 border-t border-white/10 px-2 pt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Independent filmmaker / visual storyteller</p>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
