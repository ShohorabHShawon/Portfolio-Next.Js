'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function StudioHero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f8f5ee] px-4 pb-14 pt-28 text-[#141414] dark:bg-[#0b1118] dark:text-[#f5f4ef] md:px-8 md:pt-36 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#efe8dc] to-transparent dark:from-[#0f1620]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-8">
        <motion.div initial="hidden" animate="visible" className="order-2 md:order-1 md:col-span-7">
          <motion.p
            variants={fadeIn}
            custom={0.02}
            className="mb-6 inline-flex items-center rounded-xl border border-[#1f2937]/10 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1e3a4d] dark:border-[#94a3b8]/25 dark:bg-[#121b26] dark:text-[#e8dfd1]"
          >
            Web Developer | Designer | Cinematographer | Photographer
          </motion.p>

          <motion.h1
            variants={fadeIn}
            custom={0.1}
            className="text-center font-poppins text-4xl font-semibold leading-[1.02] text-[#111827] dark:text-[#f5f4ef] sm:text-5xl md:text-left lg:text-6xl"
          >
            Shohorab Hossain Shawon
          </motion.h1>

          <motion.p
            variants={fadeIn}
            custom={0.2}
            className="mt-5 max-w-2xl text-base leading-relaxed text-[#374151] dark:text-[#d4d4d8] sm:text-lg"
          >
            I&apos;m a Software Engineer and Web Developer who builds polished digital
            products, while crafting visual narratives through photography and cinematic direction.
          </motion.p>

          <motion.div
            variants={fadeIn}
            custom={0.28}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <Link
              href="/Shohorab_Hossain_Shawon.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0f2233] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#f5f4ef] transition hover:bg-[#0b1a28]"
            >
              Resume <FiArrowUpRight />
            </Link>
            <Link
              href="/photography"
              className="inline-flex items-center rounded-xl border border-[#1f2937]/10 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#1f2937] transition hover:bg-[#f3f4f6] dark:border-[#94a3b8]/25 dark:bg-[#121b26] dark:text-[#e5e7eb] dark:hover:bg-[#1f2a37]"
            >
              Photography
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-xl border border-[#1f2937]/10 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#1f2937] transition hover:bg-[#f3f4f6] dark:border-[#94a3b8]/25 dark:bg-[#121b26] dark:text-[#e5e7eb] dark:hover:bg-[#1f2a37]"
            >
              Blog
            </Link>
          </motion.div>

          <motion.div variants={fadeIn} custom={0.34} className="mt-8 flex items-center justify-center gap-3 md:justify-start">
            <a
              href="https://github.com/ShohorabHShawon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-xl border border-[#1f2937]/10 bg-white p-3 text-[#1f2937] transition hover:-translate-y-0.5 hover:bg-[#0f2233] hover:text-white dark:border-[#94a3b8]/25 dark:bg-[#121b26] dark:text-[#e5e7eb]"
            >
              <FiGithub className="text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/shohorabhshawon/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-xl border border-[#1f2937]/10 bg-white p-3 text-[#1f2937] transition hover:-translate-y-0.5 hover:bg-[#0f2233] hover:text-white dark:border-[#94a3b8]/25 dark:bg-[#121b26] dark:text-[#e5e7eb]"
            >
              <FiLinkedin className="text-lg" />
            </a>
            <a
              href="mailto:shohorabhshawon@gmail.com"
              aria-label="Email"
              className="rounded-xl border border-[#1f2937]/10 bg-white p-3 text-[#1f2937] transition hover:-translate-y-0.5 hover:bg-[#0f2233] hover:text-white dark:border-[#94a3b8]/25 dark:bg-[#121b26] dark:text-[#e5e7eb]"
            >
              <FiMail className="text-lg" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-1 md:order-2 md:col-span-5"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mx-auto w-full max-w-[250px] overflow-hidden rounded-3xl border border-[#1f2937]/10 bg-white p-3 shadow-sm sm:max-w-[280px] md:max-w-[320px] lg:max-w-[340px] dark:border-[#94a3b8]/25 dark:bg-[#121b26]">
            <div className="absolute right-5 top-5 rounded-xl border border-[#1f2937]/10 bg-[#f7f4ee] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1f2937] dark:border-[#94a3b8]/30 dark:bg-[#233041] dark:text-[#e8dfd1]">
              Open for selected projects
            </div>

            <div className="relative mt-7 overflow-hidden rounded-[1.5rem]">
              <Image
                src="/about.png"
                alt="Shohorab Hossain Shawon"
                width={640}
                height={760}
                priority
                className="h-[230px] w-full object-cover sm:h-[265px] md:h-[320px] lg:h-[340px]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,0)_42%,rgba(20,20,20,0.72)_100%)]" />
              <p className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Story-first visual direction
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-[#0f2233] px-3 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f5f4ef]">
                3+ Years Experience
              </div>
              <div className="rounded-xl bg-[#e8dfd1] px-3 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1f2937] dark:bg-[#243244] dark:text-[#f5f4ef]">
                Multi-Disciplinary
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}