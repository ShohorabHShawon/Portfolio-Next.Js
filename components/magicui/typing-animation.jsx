'use client';
import { useEffect, useState, useRef } from 'react';

import { cn } from '@/lib/utils';

export default function TypingAnimation({ text, duration = 100, className }) {
  const [displayedText, setDisplayedText] = useState('');
  const [i, setI] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
        setIsTypingComplete(true);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i, isVisible, text]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <h1
      ref={ref}
      className={cn(
        'font-mono text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm',
        className,
      )}
    >
      {displayedText}
      {(!isTypingComplete || showCursor) && (
        <span className="animate-pulse">|</span>
      )}
    </h1>
  );
}
