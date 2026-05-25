'use client';

import { useEffect, useState } from 'react';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const doc = document.documentElement;
    const stickyOffset = 88;
    let asideElement = null;
    let asideOffsetTop = 0;

    function measureAside() {
      asideElement = document.querySelector('[data-blog-sticky-aside="true"]');
      if (!asideElement) return;

      const rect = asideElement.getBoundingClientRect();
      asideOffsetTop = rect.top + window.scrollY;
    }

    function syncStickyState() {
      if (!asideElement) return;

      const shouldStick = window.scrollY + stickyOffset >= asideOffsetTop;
      asideElement.classList.toggle('is-sticky', shouldStick);
    }

    function updateProgress() {
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollable = doc.scrollHeight - window.innerHeight;

      if (scrollable <= 0) {
        setProgress(0);
        setIsVisible(false);
        doc.style.setProperty('--blog-reading-progress', '0');
        document.querySelectorAll('[data-reading-progress-value]').forEach((node) => {
          node.textContent = '0%';
        });
        syncStickyState();
        return;
      }

      const nextProgress = clamp(scrollTop / scrollable, 0, 1);
      setProgress(nextProgress);
      setIsVisible(nextProgress > 0.01);
      doc.style.setProperty('--blog-reading-progress', String(nextProgress));

      const progressPercent = Math.round(nextProgress * 100);
      document.querySelectorAll('[data-reading-progress-value]').forEach((node) => {
        node.textContent = `${progressPercent}%`;
      });

      syncStickyState();
    }

    function handleResize() {
      measureAside();
      updateProgress();
    }

    measureAside();
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, []);

  return (
    <div className={`blog-reading-progress-track${isVisible ? ' is-visible' : ''}`} aria-hidden="true">
      <span
        className="blog-reading-progress-bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
