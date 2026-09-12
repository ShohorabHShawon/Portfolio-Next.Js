import Image from 'next/image';
import Link from 'next/link';
import { ClientListReveal, ClientReveal, ClientRowReveal } from './ClientsMotion';

export const metadata = {
  title: 'Clients | Shohorab H Shawon',
  description: 'Selected collaborations and client work by filmmaker and visual artist Shohorab H Shawon.',
};

const clients = [
  { name: 'Aat Art Cafe', image: '/brands/aat_art_cafe.jpg', type: 'Culture / Hospitality' },
  { name: 'A Pause', image: '/brands/a_pause.jpg', type: 'Lifestyle / Editorial' },
  { name: 'Boho', image: '/brands/boho.png', type: 'Fashion / Lifestyle' },
  { name: 'MJ Education', image: '/brands/mj_edu.jpg', type: 'Education / Campaign' },
  { name: 'Simple Declaration', image: '/brands/simple_declaration.jpg', type: 'Music / Visual Identity' },
];

export default function ClientsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#1a1512] px-5 py-6 font-[Arial,Helvetica,sans-serif] text-[#f2efe9] selection:bg-[#d6a85f] selection:text-[#1a1512] md:px-10 md:py-8">
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.7px,transparent_0.8px)] [background-size:4px_4px]" />

      <nav className="relative z-10 mx-auto flex w-full max-w-[88rem] items-center justify-between border-b border-white/15 pb-5">
        <Link href="/" className="font-mono text-sm font-bold uppercase tracking-[0.22em]">SHS / FILMS</Link>
        <Link href="/" className="inline-flex items-center gap-2 border border-[#d6a85f]/45 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d6a85f] transition hover:bg-[#d6a85f] hover:text-[#1a1512]"><span aria-hidden="true">←</span> Back Home</Link>
      </nav>

      <ClientReveal className="relative z-10 mx-auto grid w-full max-w-[88rem] gap-10 py-20 md:grid-cols-[1fr_0.55fr] md:items-end md:py-32">
        <div>
          <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d6a85f]"><span className="h-2 w-2 rounded-full bg-[#a74336]" /> Collaborations / 04</p>
          <h1 className="max-w-5xl text-[clamp(3.6rem,9vw,9rem)] font-medium leading-[0.84] tracking-[-0.075em]">Made with<br /><span className="text-[#d6a85f]">good people.</span></h1>
        </div>
        <div className="border-l border-[#d6a85f]/40 pl-5 md:mb-2 md:pl-8"><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">A working archive</p><p className="mt-5 max-w-sm text-base leading-relaxed text-white/60">Selected identities and stories shaped through film, photography, and visual direction.</p></div>
      </ClientReveal>

      <section className="relative z-10 mx-auto w-full max-w-[88rem] border-t border-white/15">
        <ClientListReveal>
          {clients.map((client, index) => (
          <ClientRowReveal key={client.name} className="group grid gap-6 border-b border-white/15 py-8 md:grid-cols-[5rem_1fr_1.4fr] md:items-center md:gap-10 md:py-10">
            <p className="font-mono text-xs tracking-[0.2em] text-[#d6a85f]/70">0{index + 1}</p>
            <div><h2 className="text-2xl tracking-[-0.04em] transition-colors group-hover:text-[#d6a85f] md:text-4xl">{client.name}</h2><p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/40">{client.type}</p></div>
            <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-[#e9e2d8] p-5 transition duration-500 group-hover:border-[#d6a85f]/60 md:h-44 md:p-7">
              <Image src={client.image} alt={`${client.name} logo`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-5 mix-blend-multiply transition duration-500 group-hover:scale-[1.03] md:p-7" />
              <span className="pointer-events-none absolute right-3 top-3 font-mono text-[9px] text-black/35">LOGO / {String(index + 1).padStart(2, '0')}</span>
            </div>
          </ClientRowReveal>
          ))}
        </ClientListReveal>
      </section>

      <ClientReveal className="relative z-10 mx-auto flex w-full max-w-[88rem] flex-col justify-between gap-8 py-24 md:flex-row md:items-end" delay={0.15}><div><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d6a85f]">Start a project</p><h2 className="max-w-2xl text-4xl leading-[0.92] tracking-[-0.06em] md:text-7xl">Have a story<br />worth moving?</h2></div><a href="mailto:hello@shohorab.com" className="group inline-flex items-center gap-3 border-b border-[#d6a85f] pb-3 text-xs uppercase tracking-[0.2em] text-[#d6a85f] transition hover:text-white">Let&apos;s talk <span className="text-xl transition group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></a></ClientReveal>

      <footer className="relative z-10 mx-auto flex w-full max-w-[88rem] justify-between border-t border-white/15 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35"><span>© {new Date().getFullYear()} Shohorab H Shawon</span><Link href="/photos" className="transition hover:text-[#d6a85f]">View photos ↗</Link></footer>
    </main>
  );
}
