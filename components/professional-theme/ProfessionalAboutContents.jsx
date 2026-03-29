'use client';

const PRINCIPLES = [
  {
    title: 'Engineering Quality',
    detail: 'I prioritize maintainability, performance, and clean abstractions from day one.',
  },
  {
    title: 'Product Thinking',
    detail: 'I design and build with user intent, business outcomes, and iteration speed in mind.',
  },
  {
    title: 'Design Collaboration',
    detail: 'I bridge UI detail and implementation to keep design quality consistent in production.',
  },
];

export default function ProfessionalAboutContents() {
  return (
    <div className="bg-white py-16 dark:bg-[#020617]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1.1fr_1fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">About</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">A hands-on engineer focused on meaningful digital outcomes.</h2>
          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
            I work across frontend architecture, product implementation, and visual system design. My goal is to ship dependable applications that teams can confidently grow over time.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
            Alongside engineering, I bring creative direction from photography and visual storytelling, which helps me craft digital experiences that feel intentional and polished.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Working Principles</p>
          <div className="mt-4 space-y-4">
            {PRINCIPLES.map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
