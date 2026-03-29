'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const profileData = {
  user: 'Shohorab Hossain Shawon',
  status: 'Available for Projects & Collaborations',
  host: 'Portfolio v3.0',
  shell: 'Next.js',
  experience: '3+ Years',
  ide: 'VS Code',
  development_skills: 'TypeScript, Next.js, Tailwind CSS',
  design_skills: 'Figma, Framer, Adobe Photoshop',
  photography_skills: 'Street, Product, Model Photography',
  cinematography_skills: 'Cinematic Reels & Short Films',
};

export default function NeoAboutContents() {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-[#f9f3df] py-14 dark:bg-[#0f1218]">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_2px_2px,#111_1.1px,transparent_0)] [background-size:18px_18px] dark:opacity-15" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 inline-flex rounded-md border-[3px] border-[#111] bg-[#ffe063] px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#111] shadow-[4px_4px_0_0_#111] dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]">
            CHAPTER 02
          </p>
          <h2 className="font-poppins text-4xl font-black uppercase text-[#111] [text-shadow:3px_3px_0px_#ffe063] dark:text-[#f6f2e8] dark:[text-shadow:3px_3px_0px_#ef4b3f] lg:text-5xl">
            Origin Story
          </h2>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#222]/80 dark:text-white/70">
            Character profile and timeline
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative rounded-2xl border-[4px] border-[#111] bg-white/85 p-5 shadow-[8px_8px_0_0_#111] dark:border-[#f6f2e8] dark:bg-[#171b22] dark:shadow-[8px_8px_0_0_#f6f2e8] md:p-8"
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-45 [background-image:repeating-linear-gradient(-28deg,transparent_0,transparent_22px,rgba(17,17,17,0.08)_22px,rgba(17,17,17,0.08)_26px)] dark:opacity-20" />
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <div className="relative mx-auto h-72 w-56 overflow-hidden rounded-2xl border-[3px] border-[#111] shadow-[5px_5px_0_0_#111] dark:border-[#f6f2e8] dark:shadow-[5px_5px_0_0_#f6f2e8]">
                <Image
                  src="/shohorab1.JPG"
                  alt="Shohorab Hossain Shawon"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 rounded-md border-[2px] border-white/80 bg-[#111]/75 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">
                  Main Cast
                </div>
              </div>
            </div>

            <div className="relative md:col-span-8">
              <div className="rounded-xl border-[3px] border-[#111] bg-[#111] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#ffe063] dark:border-[#f6f2e8] dark:bg-[#f6f2e8] dark:text-[#131313]">
                Status Panel
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2">
                {Object.entries(profileData).map(([key, value]) => (
                  <div
                    key={key}
                    className="grid grid-cols-1 gap-1 rounded-lg border-[3px] border-[#111]/25 bg-white px-3 py-2 text-sm shadow-[3px_3px_0_0_rgba(17,17,17,0.4)] dark:border-white/20 dark:bg-white/5 md:grid-cols-12"
                  >
                    <span className="md:col-span-4 font-black uppercase tracking-wide text-[#ef4b3f]">
                      {key.replaceAll('_', ' ')}
                    </span>
                    <span className="md:col-span-8 font-medium text-[#222] dark:text-white/85">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mt-10 rounded-2xl border-[3px] border-[#111] bg-[#ffe063] p-6 text-[#111] shadow-[6px_6px_0_0_#111] dark:border-[#f6f2e8] dark:bg-[#39d5ff] dark:shadow-[6px_6px_0_0_#f6f2e8]"
        >
          <p className="text-lg leading-relaxed font-semibold">
            As a Software Engineer, Web Developer, and Designer, I build complete end-to-end
            experiences that are functional, emotional, and visually memorable.
          </p>
          <p className="mt-3 text-base leading-relaxed">
            Beyond code, I am a Photographer and Cinematographer focused on storytelling through
            composition, mood, and motion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
