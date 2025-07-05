import React from 'react';
import { FlipWords } from '@/components/ui/flip-words';

export function FlipW() {
  const words = ['Full Stack Developer', 'UI/UX Designer', 'Photographer'];

  return (
    <div className="h-20 flex justify-center items-center lg:justify-start">
      <div className="font-mono text-xl sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 text-center lg:text-left lg:mx-0">
        <FlipWords words={words} /> <br />
      </div>
    </div>
  );
}
