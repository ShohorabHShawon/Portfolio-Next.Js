'use client';
import { useState, useEffect } from 'react';

const words = ['Full Stack Developer', 'UI/UX Designer', 'Photographer'];

export function FlipW() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeoutId;

    if (isTyping) {
      // Typing effect
      if (displayedText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 100); // Typing speed
      } else {
        // Finished typing, wait then start deleting
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Pause before deleting
      }
    } else {
      // Deleting effect
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50); // Deleting speed
      } else {
        // Finished deleting, move to next word
        setCurrentWordIndex((prevIndex) =>
          prevIndex === words.length - 1 ? 0 : prevIndex + 1,
        );
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [displayedText, isTyping, currentWordIndex]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Cursor blink speed

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="flex justify-center items-center lg:justify-start">
      <div className="text-green-600 font-mono text-2xl md:text-3xl lg:text-4xl mx-auto font-normal text-center lg:text-left">
        {displayedText}
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
        <br />
      </div>
    </div>
  );
}
