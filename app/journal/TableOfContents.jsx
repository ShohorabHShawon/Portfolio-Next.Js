'use client';

import { useEffect, useState } from 'react';

function scrollToHeading(id) {
  const element = document.getElementById(id);
  if (!element) return;

  if (window.lenis) {
    window.lenis.scrollTo(element, { offset: -96 });
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: 'smooth' });
}

function useActiveHeading(tableOfContents) {
  const [activeId, setActiveId] = useState(tableOfContents?.[0]?.id || '');

  useEffect(() => {
    if (!Array.isArray(tableOfContents) || tableOfContents.length === 0) return undefined;

    const elements = tableOfContents
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) return;

        visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveId(visibleEntries[0].target.id);
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 1],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [tableOfContents]);

  return activeId;
}

export default function TableOfContents({ tableOfContents = [], className = '' }) {
  const activeId = useActiveHeading(tableOfContents);

  if (!tableOfContents.length) return null;

  return (
    <ul className={`space-y-0.5 border-l border-journal-line ${className}`}>
      {tableOfContents.map((heading) => {
        const isActive = heading.id === activeId;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(event) => {
                event.preventDefault();
                scrollToHeading(heading.id);
              }}
              aria-current={isActive ? 'location' : undefined}
              className={`-ml-px block border-l-2 py-1.5 pr-2 text-[13px] leading-snug transition-colors ${
                heading.level === 3 ? 'pl-7' : 'pl-4'
              } ${
                isActive
                  ? 'border-journal-accent font-medium text-journal-ink'
                  : 'border-transparent text-journal-muted hover:border-journal-line hover:text-journal-ink'
              }`}
            >
              {heading.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
