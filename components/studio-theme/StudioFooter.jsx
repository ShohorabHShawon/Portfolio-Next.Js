import CurrentYear from '@/components/CurrentYear';

export default function StudioFooter() {
  return (
    <footer className="relative bg-[#f8f5ee] px-4 pb-12 pt-6 text-[#141414] dark:bg-[#0b1118] dark:text-[#f5f4ef] md:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl rounded-2xl border border-[#1f2937]/10 bg-white p-5 shadow-sm dark:border-[#94a3b8]/25 dark:bg-[#121b26]">
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-[#1f2937] dark:text-[#e5e7eb] md:text-left">Shohorab H Shawon</p>

          <div className="flex items-center justify-center gap-2">
            <a
              href="https://github.com/ShohorabHShawon"
              className="rounded-xl border border-[#1f2937]/10 bg-[#f8fafc] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1f2937] dark:border-[#94a3b8]/20 dark:bg-[#1f2a37] dark:text-[#e5e7eb]"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/shohorabhshawon/"
              className="rounded-xl border border-[#1f2937]/10 bg-[#f8fafc] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1f2937] dark:border-[#94a3b8]/20 dark:bg-[#1f2a37] dark:text-[#e5e7eb]"
            >
              LinkedIn
            </a>
            <a
              href="https://www.behance.net/shohorabhshawon"
              className="rounded-xl bg-[#0f2233] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f5f4ef]"
            >
              Behance
            </a>
          </div>

          <p className="text-center text-xs text-[#4b5563] dark:text-[#9ca3af] md:text-right">&copy; <CurrentYear /> All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}