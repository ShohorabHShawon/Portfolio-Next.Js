'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const profileData = [
  ['User', 'Shohorab Hossain Shawon'],
  ['Status', 'Available for Projects & Collaborations'],
  ['Host', 'Portfolio v3.0'],
  ['Shell', 'Next.js'],
  ['Experience', '3+ Years'],
  ['IDE', 'VS Code'],
  ['Development Skills', 'TypeScript, Next.js, Tailwind CSS'],
  ['Design Skills', 'Figma, Framer, Adobe Photoshop'],
  ['Photography Skills', 'Street, Product, Model Photography'],
  ['Cinematography Skills', 'Cinematic Reels & Short Films'],
];

export default function StudioAboutContents() {
  return (
    <section className="relative bg-[#f8f5ee] px-4 py-14 dark:bg-[#0b1118] md:px-8 lg:px-12">

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10 text-center"
        >
          <p className="text-2xl font-bold uppercase tracking-[0.08em] text-[#334155] dark:text-[#cbd5e1] sm:text-3xl">
            About
          </p>
          <h2 className="mt-2 font-poppins text-xl font-semibold text-[#0f172a] dark:text-[#f5f4ef] sm:text-2xl">
            A Creative Engineer With A Storytelling Mindset
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl border border-[#1f2937]/10 bg-white p-4 shadow-sm dark:border-[#94a3b8]/25 dark:bg-[#121b26] lg:col-span-4"
          >
            <div className="relative h-80 overflow-hidden rounded-2xl">
              <Image src="/shohorab1.JPG" alt="Shohorab Hossain Shawon" fill className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,14,14,0)_50%,rgba(14,14,14,0.75)_100%)]" />
              <p className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                Portrait
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#374151] dark:text-[#d1d5db]">
              As a Software Engineer, Web Developer, and Designer, I build complete end-to-end
              experiences that are functional, emotional, and visually memorable.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#374151] dark:text-[#d1d5db]">
              Beyond code, I am a Photographer and Cinematographer focused on storytelling through
              composition, mood, and motion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl border border-[#1f2937]/10 bg-white p-5 shadow-sm dark:border-[#94a3b8]/25 dark:bg-[#121b26] lg:col-span-8"
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#334155] dark:text-[#cbd5e1]">
              Profile Information
            </p>
            <div className="grid grid-cols-1 gap-2">
              {profileData.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-1 gap-1 rounded-xl border border-[#1f2937]/10 bg-[#f8fafc] px-4 py-3 dark:border-[#94a3b8]/20 dark:bg-[#0f1722] md:grid-cols-12"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#334155] dark:text-[#cbd5e1] md:col-span-4">
                    {label}
                  </p>
                  <p className="text-sm text-[#1f2937] dark:text-[#e5e7eb] md:col-span-8">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
