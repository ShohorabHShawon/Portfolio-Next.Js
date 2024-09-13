import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export function FlipW() {
  const words = ["Front-end Developer", "UI/UX Designer", "Photographer"];

  return (
    <div className="h-[80px] flex justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        A Passionate 
        <FlipWords words={words} /> <br />
      </div>
    </div>
  );
}
