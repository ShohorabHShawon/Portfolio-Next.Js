'use client';

const WEB_PROJECTS = [
  {
    id: '01',
    title: 'Movie Database App',
    summary: 'A real-time movie discovery platform with search, details, ratings, and responsive browsing.',
    stack: ['Next.js', 'TypeScript', 'TMDB API'],
    live: 'https://movieocean.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/Movie-Ocean-Next.JS',
  },
  {
    id: '02',
    title: 'Restaurant Website',
    summary: 'A modern restaurant experience focused on menu storytelling, reservations, and conversion.',
    stack: ['Next.js', 'React', 'Tailwind CSS'],
    live: 'https://projectrestaurant.vercel.app/',
    github: 'https://github.com/ShohorabHShawon/restaurant',
  },
  {
    id: '03',
    title: 'Portfolio Platform',
    summary: 'A multi-theme portfolio architecture supporting blog, CMS content, and photography workflows.',
    stack: ['Next.js', 'Sanity', 'Framer Motion'],
    live: 'https://shohorab.com/',
    github: 'https://github.com/ShohorabHShawon',
  },
];

export default function ProfessionalWebProjects() {
  return (
    <div className="bg-[#f8fafc] py-16 dark:bg-[#030a1a]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">Projects</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Selected web projects focused on impact and usability.</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {WEB_PROJECTS.map((project) => (
            <article key={project.title} className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">Project {project.id}</p>
              <h3 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 text-sm">
                <a href={project.live} target="_blank" rel="noreferrer" className="rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
                  Live
                </a>
                <a href={project.github} target="_blank" rel="noreferrer" className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-100 dark:hover:text-white">
                  Source
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
