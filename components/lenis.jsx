'use client';

import Lenis from '@studio-freight/lenis';
import { useEffect, useRef } from 'react';

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Scroll to top only on the first visit of the session
    if (!sessionStorage.getItem('hasVisited')) {
      lenis.scrollTo(0, { immediate: true });
      sessionStorage.setItem('hasVisited', 'true');
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      if (window.lenis === lenis) {
        delete window.lenis;
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
