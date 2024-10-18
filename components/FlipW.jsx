import React from 'react';
import { FlipWords } from '@/components/ui/flip-words';

export function FlipW() {
  const words = ['Front-end Developer', 'UI/UX Designer', 'Photographer'];

  return (
    <div className="h-[80px] flex justify-center items-center px-4">
      <div className="text-xl sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl px-2 mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        A Passionate
        <FlipWords words={words} /> <br />
      </div>
    </div>
  );
}
