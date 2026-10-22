'use client';
import { ArrowUp } from 'lucide-react';
import Link from 'next/link';

const scrollToTop = () => {
  if (window.lenis) {
    window.lenis.scrollTo(0);
    return;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const PhotographyFooter = ({ year }) => {
  return (
    <footer className="relative isolate overflow-hidden border-t border-[#d6a85f]/20 bg-[#0d0b0a] px-5 pb-8 pt-20 text-[#f2efe9] md:px-10 md:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(167,67,54,0.22),transparent_70%)]" />

      <div className="mx-auto w-full max-w-[88rem]">
        <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d6a85f]">
          <span className="inline-block h-px w-10 bg-current opacity-60" />
          End of roll
        </p>
        <p className="mt-6 [font-family:var(--font-darkroom),Georgia,serif] text-[clamp(3.2rem,10vw,9rem)] leading-[0.85] tracking-[-0.03em]">
          Thanks for <span className="italic text-[#d6a85f]">looking.</span>
        </p>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h3 className="text-xl font-light text-white">Shohorab H Shawon</h3>
            <p className="mt-1 text-sm text-[#d6a85f]/80">Photographer &amp; Visual Creator</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
              Capturing moments that tell stories. Exploring the aesthetics of light, shadow, and composition through photography and visual design.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">Explore</p>
            <ul className="mt-3 space-y-1.5 text-sm text-white/70">
              <li><Link href="/" className="transition hover:text-[#d6a85f]">Portfolio</Link></li>
              <li><Link href="/clients" className="transition hover:text-[#d6a85f]">Clients</Link></li>
              <li><Link href="/journal" className="transition hover:text-[#d6a85f]">Journal</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">Follow</p>
            <ul className="mt-3 space-y-1.5 text-sm text-white/70">
              <li>
                <a href="https://www.instagram.com/shohorabs.pov/" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#d6a85f]">
                  Instagram ↗
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/shohorabhshawon/" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#d6a85f]">
                  Facebook ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 sm:flex-row sm:items-center">
          <p>© {year} Shohorab H Shawon. All rights reserved.</p>
          <button type="button" onClick={scrollToTop} className="group inline-flex items-center gap-2 self-start transition hover:text-[#d6a85f] sm:self-auto">
            Rewind to top
            <ArrowUp className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default PhotographyFooter;
