import React, { useState, useEffect } from 'react';

const TypeAnimation = ({ texts, speed = 100, delay = 2000, loop = true }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentCharIndex < currentText.length) {
            setDisplayText(currentText.substring(0, currentCharIndex + 1));
            setCurrentCharIndex((prev) => prev + 1);
          } else {
            // Finished typing, start deleting after delay
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          // Deleting
          if (currentCharIndex > 0) {
            setDisplayText(currentText.substring(0, currentCharIndex - 1));
            setCurrentCharIndex((prev) => prev - 1);
          } else {
            // Finished deleting, move to next text
            setIsDeleting(false);
            setCurrentTextIndex((prev) => {
              if (loop) {
                return (prev + 1) % texts.length;
              } else {
                return prev < texts.length - 1 ? prev + 1 : prev;
              }
            });
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timer);
  }, [
    currentCharIndex,
    currentTextIndex,
    isDeleting,
    texts,
    speed,
    delay,
    loop,
  ]);

  return (
    <span className="typewriter">
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
};

export default TypeAnimation;
