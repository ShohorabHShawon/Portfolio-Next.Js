'use client';

import '@fortawesome/fontawesome-free/css/all.min.css';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

const DevAboutContents = dynamic(() => import('@/components/dev-theme/AboutContents'));
const DevBrands = dynamic(() => import('@/components/dev-theme/Brands'));
const DevContact = dynamic(() =>
  import('@/components/dev-theme/Contact').then((mod) => mod.Contact),
);
const DevNavbar = dynamic(() => import('@/components/dev-theme/DevNavbar'));
const DevFooter = dynamic(() => import('@/components/dev-theme/Footer'));
const DevHero = dynamic(() => import('@/components/dev-theme/Hero'));
const DevSkills = dynamic(() => import('@/components/dev-theme/Skills'));
const DevUiProjects = dynamic(() => import('@/components/dev-theme/UiProjects'));
const DevWebProjects = dynamic(() => import('@/components/dev-theme/WebProjects'));

const StudioAboutContents = dynamic(() => import('@/components/studio-theme/StudioAboutContents'));
const StudioBrands = dynamic(() => import('@/components/studio-theme/StudioBrands'));
const StudioContact = dynamic(() => import('@/components/studio-theme/StudioContact'));
const StudioFooter = dynamic(() => import('@/components/studio-theme/StudioFooter'));
const StudioHero = dynamic(() => import('@/components/studio-theme/StudioHero'));
const StudioNavbar = dynamic(() => import('@/components/studio-theme/StudioNavbar'));
const StudioSkills = dynamic(() => import('@/components/studio-theme/StudioSkills'));
const StudioUiProjects = dynamic(() => import('@/components/studio-theme/StudioUiProjects'));
const StudioWebProjects = dynamic(() => import('@/components/studio-theme/StudioWebProjects'));

const MangaAboutContents = dynamic(() => import('@/components/manga-theme/MangaAboutContents'));
const MangaBrands = dynamic(() => import('@/components/manga-theme/MangaBrands'));
const MangaContact = dynamic(() => import('@/components/manga-theme/MangaContact'));
const MangaDevNavbar = dynamic(() => import('@/components/manga-theme/MangaDevNavbar'));
const MangaFooter = dynamic(() => import('@/components/manga-theme/MangaFooter'));
const MangaHero = dynamic(() => import('@/components/manga-theme/MangaHero'));
const MangaSkills = dynamic(() => import('@/components/manga-theme/MangaSkills'));
const MangaUiProjects = dynamic(() => import('@/components/manga-theme/MangaUiProjects'));
const MangaWebProjects = dynamic(() => import('@/components/manga-theme/MangaWebProjects'));

const STORAGE_KEY = 'homepage-theme';

const HOMEPAGE_THEMES = {
  dev: {
    label: 'Dev',
    wrapperClass: 'overflow-hidden',
    Navbar: DevNavbar,
    Hero: DevHero,
    AboutContents: DevAboutContents,
    Skills: DevSkills,
    Brands: DevBrands,
    WebProjects: DevWebProjects,
    UiProjects: DevUiProjects,
    Contact: DevContact,
    Footer: DevFooter,
  },
  studio: {
    label: 'Studio',
    wrapperClass: 'overflow-hidden bg-[#f8f5ee] text-[#0f172a] dark:bg-[#0b1118] dark:text-[#f5f4ef]',
    Navbar: StudioNavbar,
    Hero: StudioHero,
    AboutContents: StudioAboutContents,
    Skills: StudioSkills,
    Brands: StudioBrands,
    WebProjects: StudioWebProjects,
    UiProjects: StudioUiProjects,
    Contact: StudioContact,
    Footer: StudioFooter,
  },
  comic: {
    label: 'Comic Theme',
    wrapperClass: 'overflow-hidden',
    Navbar: MangaDevNavbar,
    Hero: MangaHero,
    AboutContents: MangaAboutContents,
    Skills: MangaSkills,
    Brands: MangaBrands,
    WebProjects: MangaWebProjects,
    UiProjects: MangaUiProjects,
    Contact: MangaContact,
    Footer: MangaFooter,
  },
};

const THEME_ORDER = ['dev', 'studio', 'comic'];

export default function Home() {
  const [activeTheme, setActiveTheme] = useState('dev');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    const normalizedTheme = savedTheme === 'neo' ? 'comic' : savedTheme;

    if (normalizedTheme && HOMEPAGE_THEMES[normalizedTheme]) {
      setActiveTheme(normalizedTheme);
      return;
    }

    // Keep first-time and invalid/legacy selections pinned to dev.
    window.localStorage.setItem(STORAGE_KEY, 'dev');
  }, []);

  const changeTheme = () => {
    const currentIndex = THEME_ORDER.indexOf(activeTheme);
    const nextTheme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
    setActiveTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  const themeConfig = useMemo(() => {
    return HOMEPAGE_THEMES[activeTheme] || HOMEPAGE_THEMES.dev;
  }, [activeTheme]);
  const isStudio = activeTheme === 'studio';

  const {
    label,
    wrapperClass,
    Navbar,
    Hero,
    AboutContents,
    Skills,
    Brands,
    WebProjects,
    UiProjects,
    Contact,
    Footer,
  } = themeConfig;

  return (
    <>
      <button
        type="button"
        onClick={changeTheme}
        className={`group fixed bottom-4 left-1/2 z-[70] inline-flex -translate-x-1/2 items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-semibold backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 sm:bottom-5 sm:left-auto sm:right-5 sm:translate-x-0 sm:gap-2.5 sm:rounded-2xl sm:px-3.5 sm:py-2.5 sm:text-xs ${
          isStudio
            ? 'border border-[#60a5fa]/60 bg-[#0f172a]/95 text-white shadow-[0_16px_34px_-18px_rgba(2,6,23,0.95)] hover:border-[#93c5fd] hover:bg-[#111f35] dark:border-[#93c5fd]/60 dark:bg-[#0b1220]/95 dark:hover:border-[#bfdbfe] dark:hover:bg-[#152844]'
            : 'border border-[#93c5fd]/55 bg-[#14243d]/90 text-white shadow-[0_14px_32px_-18px_rgba(2,6,23,0.92)] hover:border-[#bfdbfe] hover:bg-[#1a3050] dark:border-[#93c5fd]/55 dark:bg-[#0b1727]/92 dark:text-white dark:shadow-[0_14px_32px_-18px_rgba(2,6,23,0.95)] dark:hover:border-[#bfdbfe] dark:hover:bg-[#152844]'
        }`}
        aria-label="Change theme"
        title={`Current theme: ${label}`}
      >
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-180 sm:h-7 sm:w-7 ${
              isStudio
                ? 'bg-gradient-to-br from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] shadow-[0_8px_22px_-12px_rgba(14,165,233,0.9)]'
                : 'bg-gradient-to-br from-[#0ea5e9] via-[#3b82f6] to-[#2563eb] shadow-[0_8px_20px_-10px_rgba(37,99,235,0.8)]'
            }`}
          >
            ⟳
          </span>
          <span className="inline-flex flex-col items-start leading-tight">
            <span className={`text-[9px] font-semibold uppercase tracking-[0.12em] sm:text-[10px] ${isStudio ? 'text-[#93c5fd]' : 'text-[#bfdbfe]'}`}>
              Home Theme
            </span>
            <span className={`text-[10px] font-semibold tracking-[0.01em] sm:text-[11px] ${isStudio ? 'text-white' : 'text-white'}`}>
              {label}
            </span>
          </span>
        </span>
        <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] sm:px-2.5 sm:py-1 sm:text-[10px] ${isStudio ? 'bg-[#0ea5e9]/24 text-white' : 'bg-[#1e3a5f] text-white dark:bg-[#13243a] dark:text-white'}`}>
          switch
        </span>
      </button>

      <div className={wrapperClass}>
        <Navbar />
        {/* Hero Section */}
        <Hero />
        {/* About Section */}
        <section id="about">
          <AboutContents />
        </section>
        {/* Skills */}
        <section id="skills" className="">
          <Skills />
        </section>
        {/* Brands */}
        <section id="brands" className="">
          <Brands />
        </section>
        {/* Project Section */}
        <section id="projects" className="w-full">
          <div className="w-full">
            <WebProjects />
          </div>
          <div className="w-full">
            <UiProjects />
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="">
          <Contact />
        </section>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
