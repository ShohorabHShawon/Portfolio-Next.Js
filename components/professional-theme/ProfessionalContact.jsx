'use client';

const CONTACT_LINKS = [
  { name: 'Email', value: 'shohorabhshawon@gmail.com', href: 'mailto:shohorabhshawon@gmail.com' },
  { name: 'GitHub', value: 'github.com/ShohorabHShawon', href: 'https://github.com/ShohorabHShawon' },
  { name: 'LinkedIn', value: 'linkedin.com/in/shohorabhshawon', href: 'https://www.linkedin.com/in/shohorabhshawon/' },
];

export default function ProfessionalContact() {
  return (
    <div className="bg-[#f8fafc] py-16 dark:bg-[#030a1a]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-[1.15fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Have a project in mind? Let us talk.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              I am available for product-focused web development, frontend architecture, and visual-first digital experiences. Send a message with your goals and timeline.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:shohorabhshawon@gmail.com"
                className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                Send Email
              </a>
              <a
                href="https://www.linkedin.com/in/shohorabhshawon/"
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-100 dark:hover:text-white"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {CONTACT_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm transition-colors hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
              >
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">{item.name}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{item.value}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
