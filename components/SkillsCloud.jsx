'use client';
import IconCloud from '@/components/ui/icon-cloud';
import SparklesText from './magicui/sparkles-text';

const slugs = [
  'typescript',
  'javascript',
  'java',
  'react',
  'html5',
  'css3',
  'python',
  'cplusplus',
  'csharp',
  'c',
  'tailwindcss',
  'nodedotjs',
  'nextdotjs',
  'firebase',
  'vercel',
  'git',
  'jira',
  'github',
  'visualstudiocode',
  'figma',
  'adobelightroom',
  'adobephotoshop',
  'adobeillustrator',
  'adobexd',
  'microsoftword',
  'microsoftexcel',
  'microsoftpowerpoint',
  'adobepremierepro',
  'unity',
  'unrealengine',
  'vite',
];

export function SkillsCloud() {
  return (
    <div className="container mx-auto mt-14 text-center">
      <div className="">
        <SparklesText text="SKILLS" />
      </div>
      <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg px-20 pb-20 pt-8 ">
        <IconCloud iconSlugs={slugs} />
      </div>
    </div>
  );
}
