
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCode, faBriefcase, faContactCard } from "@fortawesome/free-solid-svg-icons";

export function NewNavbar() {
  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: (
        <FontAwesomeIcon
          icon={faHome}
          className="h-5 w-5 text-neutral-500 dark:text-white font-bold"
        />
      ),
    },
    {
      name: "About",
      link: "#about",
      icon: (
        <FontAwesomeIcon
          icon={faUser}
          className="h-5 w-5 text-neutral-500 dark:text-white"
        />
      ),
    },
    {
      name: "Skills",
      link: "#skills",
      icon: (
        <FontAwesomeIcon
          icon={faCode}
          className="h-5 w-5 text-neutral-500 dark:text-white"
        />
      ),
    },
    {
      name: "Projects",
      link: "#projects",
      icon: (
        <FontAwesomeIcon
          icon={faBriefcase}
          className="h-5 w-5 text-neutral-500 dark:text-white"
        />
      ),
    },
    {
      name: "Contact",
      link: "#contact",
      icon: (
        <FontAwesomeIcon
          icon={faContactCard}
          className="h-5 w-5 text-neutral-500 dark:text-white"
        />
      ),
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
      <DummyContent />
    </div>
  );
}

const DummyContent = () => {
    return (
        <>
        </>
  );
};
