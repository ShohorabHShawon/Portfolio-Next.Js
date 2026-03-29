'use client';
import Link from 'next/link';

export default function VintageFooter({ year }) {
  return (
    <footer className="mt-14 border-t border-[#c8b9a8]/70 bg-[#f4ecdf]/70 px-5 py-10 backdrop-blur-sm md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 text-[#4a3324] md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h2
            className="text-2xl md:text-3xl"
            style={{
              fontFamily:
                'Georgia, Cambria, "Times New Roman", serif',
            }}
          >
            Shohorab H Shawon
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-[#5f4834] md:text-base">
            Curating light, shadow, and small human stories through a timeless lens.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.14em] text-[#5c4735] md:text-sm">
          <Link href="/" className="transition hover:text-[#2f2016]">
            Main Portfolio
          </Link>
          <a
            href="https://www.instagram.com/shohorabs.pov/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#2f2016]"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/shohorabhshawon/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#2f2016]"
          >
            Facebook
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-6xl border-t border-[#c8b9a8]/70 pt-4 text-[11px] uppercase tracking-[0.18em] text-[#765941]">
        Copyright {year} Shohorab H Shawon
      </div>
    </footer>
  );
}
