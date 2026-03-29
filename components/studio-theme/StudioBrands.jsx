'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const brandsData = [
  { src: '/brands/simple_declaration.jpg', name: 'Simple Declaration' },
  { src: '/brands/aat_art_cafe.jpg', name: 'AAT Art Cafe' },
  { src: '/brands/mj_edu.jpg', name: 'MJ Education and Visa Services' },
];

export default function StudioBrands() {
  return (
    <section className="relative bg-[#f8f5ee] px-4 py-14 dark:bg-[#0b1118] md:px-8 lg:px-12">

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-2xl font-bold uppercase tracking-[0.08em] text-[#334155] dark:text-[#cbd5e1] sm:text-3xl">Brands</p>
          <h2 className="mt-2 font-poppins text-xl font-semibold text-[#0f172a] dark:text-[#f5f4ef] sm:text-2xl">
            Trusted Collaborations
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {brandsData.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              className="rounded-2xl border border-[#1f2937]/10 bg-white p-6 text-center shadow-sm dark:border-[#94a3b8]/25 dark:bg-[#121b26]"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-[#f8fafc] dark:bg-[#0f1722]">
                <Image src={brand.src} alt={brand.name} width={86} height={86} className="object-cover" />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.1em] text-[#1f2937] dark:text-[#e5e7eb]">
                {brand.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}