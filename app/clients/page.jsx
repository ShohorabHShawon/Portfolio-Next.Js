import Image from 'next/image';
import Link from 'next/link';
import { clients } from './clientData';
import { ClientListReveal, ClientReveal, ClientRowReveal } from './ClientsMotion';

export const metadata = {
  title: 'Clients | Shohorab H Shawon',
  description: 'Selected collaborations and client work by filmmaker and visual artist Shohorab H Shawon.',
};

function BrandMark() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="SHS Films home">
      <span className="relative flex h-11 w-11 items-center justify-center border border-[#d6a85f] text-[11px] font-bold tracking-[-0.12em] text-[#d6a85f] transition group-hover:bg-[#d6a85f] group-hover:text-[#1a1512]">
        SHS
        <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-[#a74336]" aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className="block text-sm font-semibold tracking-[0.16em] text-white">SHOHORAB</span>
        <span className="mt-1 block font-mono text-[9px] tracking-[0.3em] text-white/45">FILM / PHOTO</span>
      </span>
    </Link>
  );
}

export default function ClientsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#1a1512] px-5 py-5 font-[Arial,Helvetica,sans-serif] text-[#f2efe9] selection:bg-[#d6a85f] selection:text-[#1a1512] md:px-10 md:py-8">
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.7px,transparent_0.8px)] [background-size:4px_4px]" />

      <nav className="relative z-10 mx-auto flex w-full max-w-[88rem] items-center justify-between border-b border-white/15 pb-5">
        <BrandMark />
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.24em] text-white/30 sm:block">Selected clients / 2024—25</span>
          <Link href="/" className="group inline-flex items-center gap-2 border border-white/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65 transition hover:border-[#d6a85f] hover:bg-[#d6a85f] hover:text-[#1a1512]">
            <span className="transition-transform group-hover:-translate-x-1" aria-hidden="true">←</span>
            Home
          </Link>
        </div>
      </nav>

      <ClientReveal className="relative z-10 mx-auto w-full max-w-[88rem] py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.25fr_0.75fr] md:items-end">
          <div>
            <p className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d6a85f]">
              <span className="h-2 w-2 rounded-full bg-[#a74336] shadow-[0_0_18px_rgba(167,67,54,0.65)]" />
              Collaborations / 05
            </p>
            <h1 className="max-w-5xl text-[clamp(3.8rem,10vw,9.5rem)] font-medium leading-[0.82] tracking-[-0.08em]">
              Good work
              <br />
              <span className="text-[#d6a85f]">needs trust.</span>
            </h1>
          </div>
          <div className="max-w-sm border-l border-[#d6a85f]/50 pl-5 md:mb-2 md:pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">A working archive</p>
            <p className="mt-5 text-base leading-relaxed text-white/60">
              A selection of people and places shaped through film, photography, and visual direction.
            </p>
            <div className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              <span className="h-px w-10 bg-[#d6a85f]/60" />
              Dhaka / Bangladesh
            </div>
          </div>
        </div>
      </ClientReveal>

      <section className="relative z-10 mx-auto w-full max-w-[88rem] border-t border-white/15">
        <div className="flex items-center justify-between py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
          <span>Selected partners</span>
          <span>Scroll to explore ↓</span>
        </div>
        <ClientListReveal className="grid gap-4 md:grid-cols-2 md:gap-5">
          {clients.map((client, index) => (
            <ClientRowReveal
              key={client.name}
              className={`group relative overflow-hidden border border-white/15 bg-[#211914] transition-colors duration-500 hover:border-[#d6a85f]/65 ${index === 4 ? 'md:col-span-2' : ''}`}
            >
              <div className={`relative flex items-end justify-between p-5 md:p-7 ${index === 4 ? 'md:min-h-[16rem]' : 'min-h-[15rem]'}`}>
                <div className="relative z-10">
                  <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-[#d6a85f]/70">{client.number}</p>
                  <h2 className="max-w-[15rem] text-3xl leading-[0.9] tracking-[-0.06em] transition-colors group-hover:text-[#d6a85f] md:text-4xl">{client.name}</h2>
                  <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">{client.type}</p>
                </div>
                <span className="relative z-10 mb-1 text-2xl font-light text-white/35 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#d6a85f]" aria-hidden="true">↗</span>
                <div className="absolute right-0 top-0 h-full w-[54%] overflow-hidden border-l border-white/10 bg-[#e9e2d8]">
                  <Image src={client.image} alt={`${client.name} logo`} fill sizes="(max-width: 768px) 54vw, 30vw" className="object-contain p-8 mix-blend-multiply transition duration-700 group-hover:scale-110 md:p-12" />
                  <span className="absolute right-3 top-3 font-mono text-[8px] tracking-[0.15em] text-black/35">IDENTITY / {client.number}</span>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#211914] via-[#211914]/90 to-transparent" />
              </div>
            </ClientRowReveal>
          ))}
        </ClientListReveal>
      </section>

      <ClientReveal className="relative z-10 mx-auto flex w-full max-w-[88rem] flex-col justify-between gap-10 py-24 md:flex-row md:items-end md:py-32" delay={0.15}>
        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d6a85f]">Start a project</p>
          <h2 className="max-w-2xl text-4xl leading-[0.88] tracking-[-0.06em] md:text-7xl">Have a story<br />worth moving?</h2>
        </div>
        <a href="mailto:shohorabhshawon@gmail.com" className="group inline-flex items-center gap-3 border-b border-[#d6a85f] pb-3 text-xs uppercase tracking-[0.2em] text-[#d6a85f] transition hover:text-white">
          Let&apos;s talk <span className="text-xl transition group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </a>
      </ClientReveal>

      <footer className="relative z-10 mx-auto flex w-full max-w-[88rem] justify-between border-t border-white/15 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
        <span>© {new Date().getFullYear()} Shohorab H Shawon</span>
        <Link href="/photos" className="transition hover:text-[#d6a85f]">View photos ↗</Link>
      </footer>
    </main>
  );
}
