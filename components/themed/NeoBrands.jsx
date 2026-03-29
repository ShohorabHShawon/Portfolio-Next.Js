'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const brandsData = [
  { src: '/brands/simple_declaration.jpg', name: 'Simple Declaration' },
  { src: '/brands/aat_art_cafe.jpg', name: 'AAT Art Cafe' },
  { src: '/brands/mj_edu.jpg', name: 'MJ Education and Visa Services' },
];

export default function NeoBrands() {
  return (
    <section id="brands" className="relative w-full bg-[#f9f3df] py-14 dark:bg-[#0f1218]">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_2px_2px,#111_1px,transparent_0)] [background-size:18px_18px] dark:opacity-10" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center relative">
          <p className="mb-3 inline-flex rounded-md border-[3px] border-[#111] bg-[#39d5ff] px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#111] shadow-[4px_4px_0_0_#111] dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]">
            CHAPTER 04
          </p>
          <h2 className="font-poppins text-4xl font-black uppercase text-[#111] [text-shadow:3px_3px_0px_#ffe063] dark:text-[#f6f2e8] dark:[text-shadow:3px_3px_0px_#39d5ff] lg:text-5xl">
            Allied Guilds
          </h2>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[#222]/80 dark:text-white/70">
            Trusted alliance partners
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {brandsData.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative rounded-xl border-[3px] border-[#111] bg-white p-6 shadow-[6px_6px_0_0_#111] transition-transform hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#171b22] dark:shadow-[6px_6px_0_0_#f6f2e8]"
            >
              <div className="absolute right-3 top-3 rounded-md border-[2px] border-[#111] bg-[#ffe063] px-2 py-1 text-[10px] font-black uppercase tracking-wide text-[#111] dark:border-[#f6f2e8]">
                Ally
              </div>
              <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border-[3px] border-[#111]/25 bg-[#fff8ec] dark:border-white/20 dark:bg-white/5">
                <Image src={brand.src} alt={brand.name} width={88} height={88} className="object-cover" />
              </div>
              <p className="mt-4 text-center text-sm font-black uppercase tracking-wide text-[#111] dark:text-white/90">
                {brand.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
