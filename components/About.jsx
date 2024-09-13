"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = ` I am a dedicated front-end developer with a strong interest in UI/UX 
design, focused on creating intuitive and visually compelling digital 
experiences. While still gaining experience in the field, I am 
committed to refining my skills and contributing to projects that 
prioritize user-centric design and functionality. Driven by a passion 
for continuous learning, I am eager to collaborate and deliver 
impactful solutions in web development and design.`;

export function About() {
  return <TextGenerateEffect words={words} />;
}
