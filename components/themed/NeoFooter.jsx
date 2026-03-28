import CurrentYear from '@/components/CurrentYear';

export default function NeoFooter() {
  return (
    <footer className="bg-[#fff3d6] py-12 text-[#131313] dark:bg-[#121214] dark:text-[#f6f2e8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-[4px] border-[#131313] bg-white p-6 shadow-[8px_8px_0_0_#131313] dark:border-[#f6f2e8] dark:bg-[#1b1c21] dark:shadow-[8px_8px_0_0_#f6f2e8]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-center">
            <p className="text-center text-xs font-black uppercase tracking-[0.16em] md:text-left">
              Shohorab H Shawon
            </p>
            <div className="flex items-center justify-center gap-3">
              <a href="https://github.com/ShohorabHShawon" className="rounded-md border-[3px] border-[#131313] bg-[#ffea00] px-3 py-2 text-xs font-black uppercase dark:border-[#f6f2e8]">GitHub</a>
              <a href="https://www.linkedin.com/in/shohorabhshawon/" className="rounded-md border-[3px] border-[#131313] bg-[#2ac6ff] px-3 py-2 text-xs font-black uppercase text-[#111] dark:border-[#f6f2e8]">LinkedIn</a>
              <a href="https://www.behance.net/shohorabhshawon" className="rounded-md border-[3px] border-[#131313] bg-[#ff5a1f] px-3 py-2 text-xs font-black uppercase text-white dark:border-[#f6f2e8]">Behance</a>
            </div>
            <p className="text-center text-xs font-bold md:text-right">&copy; <CurrentYear /> All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
