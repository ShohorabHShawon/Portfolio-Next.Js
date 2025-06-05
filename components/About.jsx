import TextReveal from '@/components/ui/text-reveal';
import SparklesText from './magicui/sparkles-text';

export function About() {
  return (
    <div className="z-10 flex flex-wrap items-center justify-center rounded-lg max-h-screen relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-small pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full relative top-8 pt-5 z-20">
        <SparklesText text="ABOUT" />
      </div>
      <div className="w-full font-mono text-justify z-40 mb-10">
        <TextReveal text="I am a dedicated front-end developer with a strong interest in UI/UX design, focused on creating intuitive and visually compelling digital experiences. While still gaining experience in the field, I am committed to refining my skills and contributing to projects that prioritize user-centric design and functionality. Driven by a passion for continuous learning, I am eager to collaborate and deliver impactful solutions in web development and design." />
      </div>
    </div>
  );
}
