import CurrentYear from '@/components/CurrentYear';

export default function ProfessionalFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-9 dark:border-slate-800 dark:bg-[#020617]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Shohorab H Shawon</p>
            <p className="mt-1 text-xs uppercase tracking-[0.09em] text-slate-500 dark:text-slate-400">Software Engineer • Product Builder</p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.08em] text-slate-600 dark:text-slate-300">
            <a href="https://github.com/ShohorabHShawon" target="_blank" rel="noreferrer" className="transition-colors hover:text-slate-900 dark:hover:text-white">GitHub</a>
            <a href="https://www.linkedin.com/in/shohorabhshawon/" target="_blank" rel="noreferrer" className="transition-colors hover:text-slate-900 dark:hover:text-white">LinkedIn</a>
            <a href="mailto:shohorabhshawon@gmail.com" className="transition-colors hover:text-slate-900 dark:hover:text-white">Email</a>
          </div>
        </div>

        <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
          <p className="text-xs uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
            <CurrentYear /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
