'use client';

const SKILL_GROUPS = [
  {
    title: 'Frontend Engineering',
    items: [
      { name: 'Next.js', level: 'Advanced' },
      { name: 'React', level: 'Advanced' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
    ],
  },
  {
    title: 'Backend & Data',
    items: [
      { name: 'Node.js', level: 'Strong' },
      { name: 'Nest.js', level: 'Strong' },
      { name: 'REST APIs', level: 'Strong' },
      { name: 'PostgreSQL', level: 'Working' },
    ],
  },
  {
    title: 'Design & Product Delivery',
    items: [
      { name: 'Figma', level: 'Strong' },
      { name: 'Framer', level: 'Strong' },
      { name: 'Design Systems', level: 'Strong' },
      { name: 'UX Flows', level: 'Strong' },
    ],
  },
  {
    title: 'Creative Production',
    items: [
      { name: 'Photography', level: 'Advanced' },
      { name: 'Cinematography', level: 'Strong' },
      { name: 'Color Grading', level: 'Strong' },
      { name: 'Storyboarding', level: 'Strong' },
    ],
  },
];

export default function ProfessionalSkills() {
  return (
    <div className="border-y border-slate-200 bg-[#f8fafc] py-16 dark:border-slate-800 dark:bg-[#030a1a]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">Skills</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">A practical toolkit for shipping high-quality products.</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <article key={group.title} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{group.title}</h3>
              <div className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.name}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">{item.level}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
