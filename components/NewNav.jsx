import React from 'react';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faCode,
  faBriefcase,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

export function NewNavbar() {
  const navItems = [
    {
      name: 'Home',
      link: '#home',
      icon: (
        <FontAwesomeIcon
          icon={faHome}
          className="h-4 w-4 text-neutral-600 dark:text-neutral-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
        />
      ),
    },
    {
      name: 'About',
      link: '#about',
      icon: (
        <FontAwesomeIcon
          icon={faUser}
          className="h-4 w-4 text-neutral-600 dark:text-neutral-300 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
        />
      ),
    },
    {
      name: 'Skills',
      link: '#skills',
      icon: (
        <FontAwesomeIcon
          icon={faCode}
          className="h-4 w-4 text-neutral-600 dark:text-neutral-300 transition-colors duration-200 hover:text-purple-600 dark:hover:text-purple-400"
        />
      ),
    },
    {
      name: 'Projects',
      link: '#projects',
      icon: (
        <FontAwesomeIcon
          icon={faBriefcase}
          className="h-4 w-4 text-neutral-600 dark:text-neutral-300 transition-colors duration-200 hover:text-green-600 dark:hover:text-green-400"
        />
      ),
    },
    {
      name: 'Contact',
      link: '#contact',
      icon: (
        <FontAwesomeIcon
          icon={faEnvelope}
          className="h-4 w-4 text-neutral-600 dark:text-neutral-300 transition-colors duration-200 hover:text-rose-600 dark:hover:text-rose-400"
        />
      ),
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav
        navItems={navItems}
        className="backdrop-blur-lg bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/50 dark:border-neutral-700/50 shadow-lg"
      />
    </div>
  );
}
