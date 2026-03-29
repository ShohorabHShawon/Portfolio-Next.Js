'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProfessionalHero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-slate-200 bg-white pt-28 dark:border-slate-800 dark:bg-[#020617]">
      <div className="pointer-events-none absolute inset-0 opacity-60 bg-[linear-gradient(120deg,transparent_0%,transparent_62%,rgba(15,23,42,0.04)_62%,rgba(15,23,42,0.04)_100%)] dark:bg-[linear-gradient(120deg,transparent_0%,transparent_62%,rgba(148,163,184,0.08)_62%,rgba(148,163,184,0.08)_100%)]" />
      <div className="pointer-events-none absolute -right-16 top-16 h-44 w-44 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-500/20" />
      <div className="pointer-events-none absolute -left-10 bottom-10 h-40 w-40 rounded-full bg-slate-300/40 blur-3xl dark:bg-slate-700/40" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:px-8">
        <div>
          <p className="inline-flex rounded-sm border border-slate-300 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            Clean Professional Theme
          </p>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-100 sm:text-[3.25rem]">
            Professional web experiences built with clarity, precision, and product focus.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            I am Shohorab H Shawon, a software engineer specializing in Next.js and scalable frontend architecture, with a strong eye for visual quality and user-first interfaces.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-sm bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              See Work
            </a>
            <a
              href="#contact"
              className="rounded-sm border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-100"
            >
              Contact Me
            </a>
            <Link
              href="/blog"
              className="px-1 text-sm font-medium text-slate-600 underline decoration-slate-400 underline-offset-4 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Browse Blog
            </Link>
          </div>

          <div className="mt-10 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-3 dark:border-slate-800">
            <div>
              <p className="text-xs uppercase tracking-[0.11em] text-slate-500 dark:text-slate-400">Experience</p>
              <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">3+ Years</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.11em] text-slate-500 dark:text-slate-400">Core Stack</p>
              <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">Next.js + TS</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.11em] text-slate-500 dark:text-slate-400">Status</p>
              <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">Available</p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[300px] lg:mx-0 lg:justify-self-end">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.65)] dark:border-slate-800 dark:bg-slate-900">
            <div className="relative h-72 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <Image
                src="/profile.jpg"
                alt="Shohorab H Shawon portrait"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 280px, 300px"
              />
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
              <div>
                <p className="text-[11px] uppercase tracking-[0.11em] text-slate-500 dark:text-slate-400">Role</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Software Engineer</p>
              </div>
              <span className="rounded-sm border border-slate-300 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-600 dark:border-slate-600 dark:text-slate-300">
                Bangladesh
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
