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
    }

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    window.addEventListener('load', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      window.removeEventListener('load', updateProgress);
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
