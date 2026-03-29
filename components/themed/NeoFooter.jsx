import CurrentYear from '@/components/CurrentYear';

export default function NeoFooter() {
  return (
    <footer className="relative bg-[#f9f3df] py-12 text-[#131313] dark:bg-[#0f1218] dark:text-[#f6f2e8]">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_2px_2px,#111_1px,transparent_0)] [background-size:18px_18px] dark:opacity-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border-[4px] border-[#111] bg-white p-6 shadow-[8px_8px_0_0_#111] dark:border-[#f6f2e8] dark:bg-[#171b22] dark:shadow-[8px_8px_0_0_#f6f2e8]">
          <p className="mb-4 inline-flex rounded-md border-[3px] border-[#111] bg-[#ffe063] px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#111] shadow-[4px_4px_0_0_#111] dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]">
            Final Chapter
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-center">
            <p className="text-center text-xs font-black uppercase tracking-[0.16em] md:text-left">
              Shohorab H Shawon
            </p>
            <div className="flex items-center justify-center gap-3">
              <a href="https://github.com/ShohorabHShawon" className="rounded-md border-[3px] border-[#111] bg-[#ffe063] px-3 py-2 text-xs font-black uppercase shadow-[3px_3px_0_0_#111] dark:border-[#f6f2e8] dark:shadow-[3px_3px_0_0_#f6f2e8]">GitHub</a>
              <a href="https://www.linkedin.com/in/shohorabhshawon/" className="rounded-md border-[3px] border-[#111] bg-[#39d5ff] px-3 py-2 text-xs font-black uppercase text-[#111] shadow-[3px_3px_0_0_#111] dark:border-[#f6f2e8] dark:shadow-[3px_3px_0_0_#f6f2e8]">LinkedIn</a>
              <a href="https://www.behance.net/shohorabhshawon" className="rounded-md border-[3px] border-[#111] bg-[#ef4b3f] px-3 py-2 text-xs font-black uppercase text-white shadow-[3px_3px_0_0_#111] dark:border-[#f6f2e8] dark:shadow-[3px_3px_0_0_#f6f2e8]">Behance</a>
            </div>
            <p className="text-center text-xs font-bold md:text-right">&copy; <CurrentYear /> All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
