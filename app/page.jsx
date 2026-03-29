'use client';

import DevAboutContents from '@/components/dev-theme/AboutContents';
import DevBrands from '@/components/dev-theme/Brands';
import { Contact as DevContact } from '@/components/dev-theme/Contact';
import DevNavbar from '@/components/dev-theme/DevNavbar';
import DevFooter from '@/components/dev-theme/Footer';
import DevHero from '@/components/dev-theme/Hero';
import DevSkills from '@/components/dev-theme/Skills';
import DevUiProjects from '@/components/dev-theme/UiProjects';
import DevWebProjects from '@/components/dev-theme/WebProjects';
import ProfessionalAboutContents from '@/components/professional-theme/ProfessionalAboutContents';
import ProfessionalBrands from '@/components/professional-theme/ProfessionalBrands';
import ProfessionalContact from '@/components/professional-theme/ProfessionalContact';
import ProfessionalFooter from '@/components/professional-theme/ProfessionalFooter';
import ProfessionalHero from '@/components/professional-theme/ProfessionalHero';
import ProfessionalNavbar from '@/components/professional-theme/ProfessionalNavbar';
import ProfessionalSkills from '@/components/professional-theme/ProfessionalSkills';
import ProfessionalUiProjects from '@/components/professional-theme/ProfessionalUiProjects';
import ProfessionalWebProjects from '@/components/professional-theme/ProfessionalWebProjects';
import StudioAboutContents from '@/components/studio-theme/StudioAboutContents';
import StudioBrands from '@/components/studio-theme/StudioBrands';
import StudioContact from '@/components/studio-theme/StudioContact';
import StudioFooter from '@/components/studio-theme/StudioFooter';
import StudioHero from '@/components/studio-theme/StudioHero';
import StudioNavbar from '@/components/studio-theme/StudioNavbar';
import StudioSkills from '@/components/studio-theme/StudioSkills';
import StudioUiProjects from '@/components/studio-theme/StudioUiProjects';
import StudioWebProjects from '@/components/studio-theme/StudioWebProjects';
import NeoAboutContents from '@/components/themed/NeoAboutContents';
import NeoBrands from '@/components/themed/NeoBrands';
import NeoContact from '@/components/themed/NeoContact';
import NeoDevNavbar from '@/components/themed/NeoDevNavbar';
import NeoFooter from '@/components/themed/NeoFooter';
import NeoHero from '@/components/themed/NeoHero';
import NeoSkills from '@/components/themed/NeoSkills';
import NeoUiProjects from '@/components/themed/NeoUiProjects';
import NeoWebProjects from '@/components/themed/NeoWebProjects';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

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
  professional: {
    label: 'Professional Theme',
    wrapperClass: 'overflow-hidden bg-[#f3f4f6] text-slate-900 dark:bg-[#0b1120] dark:text-slate-100',
    Navbar: ProfessionalNavbar,
    Hero: ProfessionalHero,
    AboutContents: ProfessionalAboutContents,
    Skills: ProfessionalSkills,
    Brands: ProfessionalBrands,
    WebProjects: ProfessionalWebProjects,
    UiProjects: ProfessionalUiProjects,
    Contact: ProfessionalContact,
    Footer: ProfessionalFooter,
  },
  comic: {
    label: 'Comic Theme',
    wrapperClass: 'overflow-hidden',
    Navbar: NeoDevNavbar,
    Hero: NeoHero,
    AboutContents: NeoAboutContents,
    Skills: NeoSkills,
    Brands: NeoBrands,
    WebProjects: NeoWebProjects,
    UiProjects: NeoUiProjects,
    Contact: NeoContact,
    Footer: NeoFooter,
  },
};

const THEME_ORDER = ['dev', 'studio', 'professional', 'comic'];


export default function Home() {
  const [activeTheme, setActiveTheme] = useState('dev');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    const normalizedTheme = savedTheme === 'neo' ? 'comic' : savedTheme;

    if (normalizedTheme && HOMEPAGE_THEMES[normalizedTheme]) {
      setActiveTheme(normalizedTheme);
    }
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

  const shouldAnimateProfessional = activeTheme === 'professional' && !prefersReducedMotion;
  const sectionReveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <>
      <button
        type="button"
        onClick={changeTheme}
        className="group fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-lg border border-black/20 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#0f172a] shadow-md backdrop-blur transition hover:scale-[1.02] hover:bg-white dark:border-white/25 dark:bg-[#0f172a]/90 dark:text-[#f8fafc]"
        aria-label="Change theme"
        title={`Current theme: ${label}`}
      >
        <span
          aria-hidden="true"
          className="inline-flex h-4 w-4 items-center justify-center text-sm transition-transform duration-300 group-hover:rotate-180"
        >
          ⟳
        </span>
        <span>Change Theme</span>
      </button>

      <div className={wrapperClass}>
        <Navbar />
        {/* Hero Section */}
        {shouldAnimateProfessional ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Hero />
          </motion.div>
        ) : (
          <Hero />
        )}
        {/* About Section */}
        <section id="about">
          {shouldAnimateProfessional ? (
            <motion.div {...sectionReveal}>
              <AboutContents />
            </motion.div>
          ) : (
            <div className="">
              <AboutContents />
            </div>
          )}
        </section>
        {/* Skills */}
        <section id="skills" className="">
          {shouldAnimateProfessional ? (
            <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.05 }}>
              <Skills />
            </motion.div>
          ) : (
            <Skills />
          )}
        </section>
        {/* Brands */}
        <section id="brands" className="">
          {shouldAnimateProfessional ? (
            <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.08 }}>
              <Brands />
            </motion.div>
          ) : (
            <Brands />
          )}
        </section>
        {/* Project Section */}
        <section id="projects" className="w-full">
          {shouldAnimateProfessional ? (
            <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.1 }} className="w-full">
              <WebProjects />
            </motion.div>
          ) : (
            <div className="w-full">
              <WebProjects />
            </div>
          )}
          {shouldAnimateProfessional ? (
            <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.14 }} className="w-full">
              <UiProjects />
            </motion.div>
          ) : (
            <div className="w-full">
              <UiProjects />
            </div>
          )}
        </section>
        {/* Contact Section */}
        <section id="contact" className="">
          {shouldAnimateProfessional ? (
            <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.12 }}>
              <Contact />
            </motion.div>
          ) : (
            <Contact />
          )}
        </section>
        {/* Footer */}
        {shouldAnimateProfessional ? (
          <motion.div {...sectionReveal} transition={{ ...sectionReveal.transition, delay: 0.16 }}>
            <Footer />
          </motion.div>
        ) : (
          <Footer />
        )}
      </div>
    </>
  );
}
