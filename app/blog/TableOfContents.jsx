'use client';

export function TableOfContentsLink({ id, title, level, className, theme = 'manga' }) {
  const handleClick = (e) => {
    e.preventDefault();
    
    // Get all elements with this ID (in case both themes are rendered)
    const allElements = document.querySelectorAll(`#${id}`);
    if (allElements.length === 0) return;
    
    // Find the visible one
    let element = null;
    for (const el of allElements) {
      const rect = el.getBoundingClientRect();
      // Check if element is visible (either directly or through a parent)
      if (getComputedStyle(el).display !== 'none' && el.offsetParent !== null) {
        element = el;
        break;
      }
    }
    
    // Fallback to first element if none are visible
    if (!element) {
      element = allElements[0];
    }

    if (window.lenis) {
      // Use Lenis for smooth scrolling with negative offset to show heading with space above
      window.lenis.scrollTo(element, { offset: -100 });
    } else {
      // Fallback: scroll to element and then adjust position
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Adjust scroll position to show more space above
      setTimeout(() => {
        window.scrollBy({ top: -100, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <li>
      <a
        href={`#${id}`}
        onClick={handleClick}
        className={className}
      >
        {title}
      </a>
    </li>
  );
}

export function TableOfContentsManga({ tableOfContents }) {
  if (!tableOfContents.length) return null;

  return (
    <aside className="mt-8 rounded-2xl border-4 border-black bg-[#fff7cc] p-4 shadow-[5px_5px_0_#111111] dark:border-[#5eead4] dark:bg-[#13233a] dark:shadow-[5px_5px_0_#0a3a46]">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700 dark:text-[#b7d6ea]">
        Jump To
      </p>
      <ul className="mt-3 space-y-2">
        {tableOfContents.map((heading) => (
          <TableOfContentsLink
            key={heading.id}
            id={heading.id}
            title={heading.title}
            level={heading.level}
            theme="manga"
            className={`inline-flex text-sm font-bold transition hover:text-[#ef4444] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef4444] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff7cc] dark:focus-visible:ring-[#fbbf24] dark:focus-visible:ring-offset-[#13233a] ${
              heading.level === 3 ? 'ml-4 text-slate-600 dark:text-[#cfe7f7]' : 'text-slate-800 dark:text-[#e6f3ff]'
            }`}
          />
        ))}
      </ul>
    </aside>
  );
}

export function TableOfContentsModern({ tableOfContents }) {
  if (!tableOfContents.length) return null;

  return (
    <aside className="blog-modern-toc mt-6 rounded-xl border border-[#e6e6e6] bg-[#fafaf8] p-4 dark:border-[#2a2a2a] dark:bg-[#1b1d1e]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6b6b6b] dark:text-[#a0a0a0]">
          Table of contents
        </p>
        <p className="text-[10px] font-medium tracking-[0.12em] text-[#9b9b9b] dark:text-[#717171] mt-1">
          JUMP TO
        </p>
      </div>
      <ul className="mt-3 space-y-2">
        {tableOfContents.map((heading) => (
          <TableOfContentsLink
            key={heading.id}
            id={heading.id}
            title={heading.title}
            level={heading.level}
            theme="modern"
            className={`inline-flex text-sm text-[#3f3f3f] transition hover:text-[#191919] hover:font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a8917] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf8] dark:text-[#d1d1d1] dark:hover:text-[#f3f3f3] dark:focus-visible:ring-[#35b24a] dark:focus-visible:ring-offset-[#1b1d1e] ${
              heading.level === 3 ? 'ml-4' : ''
            }`}
          />
        ))}
      </ul>
    </aside>
  );
}
