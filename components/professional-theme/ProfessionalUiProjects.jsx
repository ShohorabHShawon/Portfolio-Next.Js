'use client';

const UI_PROJECTS = [
  {
    title: 'Food Delivery Website UI',
    detail: 'Landing and ordering journey designed for speed and visual clarity.',
    tool: 'Figma Prototype',
    link: 'https://www.figma.com/proto/clVgRF2aB3JTGS2beIqcOd/Hungry.com?node-id=0-1&t=CrEGqnhZsHcZOGes-1',
  },
  {
    title: 'Food Delivery App UI',
    detail: 'Mobile-first ordering experience with clean hierarchy and smooth task flow.',
    tool: 'Figma Prototype',
    link: 'https://www.figma.com/proto/gQ0wnLen5TbvS3l9MyDRE8/Hungry-Restaurant-App?node-id=0-1&t=pYCT7bfMVsvbkt6N-1',
  },
  {
    title: 'E-commerce Mobile UI',
    detail: 'Conversion-focused e-commerce interface with product-first presentation.',
    tool: 'Figma Prototype',
    link: 'https://www.figma.com/proto/AA9oWuR6XVdQOKpk5Mw4et/E-Commerce-Mobile-App?node-id=0-1&t=OL0lot6tF71bfAHv-1',
  },
];

export default function ProfessionalUiProjects() {
  return (
    <div className="border-t border-slate-200 bg-white py-14 dark:border-slate-800 dark:bg-[#020617]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">UI and product design case studies.</h3>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {UI_PROJECTS.map((project) => (
            <article key={project.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">{project.tool}</p>
              <h4 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{project.title}</h4>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.detail}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-100 dark:hover:text-white"
              >
                Open Prototype
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
