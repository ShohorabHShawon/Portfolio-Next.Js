'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { cn } from '@/lib/utils';

export const TextRevealByWord = ({ text, className }) => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(' ');

  return (
    <div ref={targetRef} className={cn('relative z-0 h-[140vh]', className)}>
      <div
        className={
          'sticky mx-auto flex h-screen max-w-6xl items-center bg-transparent px-5 py-8'
        }
      >
        <p
          ref={targetRef}
          className={
            'flex flex-wrap leading-tight text-xl font-bold text-white/20 md:text-2xl lg:text-3xl'
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}{' '}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative m-1">
      <span className={'absolute opacity-30'}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={'text-black dark:text-white'}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
