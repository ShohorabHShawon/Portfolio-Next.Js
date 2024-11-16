import TextReveal from '@/components/ui/text-reveal';
import SparklesText from './magicui/sparkles-text';

export function About() {
  return (
    <div className="z-10 flex flex-wrap items-center justify-center rounded-lg">
      <div className="w-full relative top-32 sm:py-5">
        <SparklesText text="ABOUT" />
      </div>
      <div className="w-full font-mono text-justify">
        <TextReveal text="I am a dedicated front-end developer with a strong interest in UI/UX design, focused on creating intuitive and visually compelling digital experiences. While still gaining experience in the field, I am committed to refining my skills and contributing to projects that prioritize user-centric design and functionality. Driven by a passion for continuous learning, I am eager to collaborate and deliver impactful solutions in web development and design." />
      </div>
    </div>
  );
}
