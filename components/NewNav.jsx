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
          className="h-4 w-4 text-gray-300 transition-all duration-300 hover:scale-110"
        />
      ),
    },
    {
      name: 'About',
      link: '#about',
      icon: (
        <FontAwesomeIcon
          icon={faUser}
          className="h-4 w-4 text-gray-300 transition-all duration-300 hover:scale-110"
        />
      ),
    },
    {
      name: 'Skills',
      link: '#skills',
      icon: (
        <FontAwesomeIcon
          icon={faCode}
          className="h-4 w-4 text-gray-300 transition-all duration-300 hover:scale-110"
        />
      ),
    },
    {
      name: 'Projects',
      link: '#projects',
      icon: (
        <FontAwesomeIcon
          icon={faBriefcase}
          className="h-4 w-4 text-gray-300 transition-all duration-300 hover:scale-110"
        />
      ),
    },
    {
      name: 'Contact',
      link: '#contact',
      icon: (
        <FontAwesomeIcon
          icon={faEnvelope}
          className="h-4 w-4 text-gray-300 transition-all duration-300 hover:scale-110"
        />
      ),
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav
        navItems={navItems}
        className="backdrop-blur-lg bg-black/40 border border-purple-500/20 shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300 [&_a:hover]:underline [&_a]:underline-offset-4 [&_a:hover]:decoration-blue-400 [&_a:hover]:text-gray-300"
      />
    </div>
  );
}
