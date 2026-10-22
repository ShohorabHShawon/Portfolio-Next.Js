'use client';

import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

export default function LenisProvider({ children }) {
  useEffect(() => {
    // Respect users who ask for less motion: keep native scrolling.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    // Scroll to top only on the first visit of the session
    try {
      if (!sessionStorage.getItem('hasVisited')) {
        lenis.scrollTo(0, { immediate: true });
        sessionStorage.setItem('hasVisited', 'true');
      }
    } catch {
      // Storage can be unavailable (private mode); scrolling still works.
    }

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      if (window.lenis === lenis) {
        delete window.lenis;
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
