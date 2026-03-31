'use client';

import { useEffect, useState } from 'react';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  const handleBackToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 520);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`blog-back-to-top${visible ? ' is-visible' : ''}`}
      onClick={handleBackToTop}
      aria-label="Back to top"
    >
      ↑ Top
    </button>
  );
}
