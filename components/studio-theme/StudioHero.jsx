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
            className="mb-6 flex w-fit items-center justify-center rounded-xl border border-[#1f2937]/10 bg-white px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1e3a4d] dark:border-[#94a3b8]/25 dark:bg-[#121b26] dark:text-[#e8dfd1] mx-auto md:mx-0"
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
            className="mt-5 mx-auto max-w-2xl text-center text-base leading-relaxed text-[#374151] dark:text-[#d4d4d8] sm:text-lg md:mx-0 md:text-left"
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
          <div className="relative mx-auto w-full max-w-[220px] overflow-hidden rounded-2xl border border-[#1f2937]/10 bg-white p-2 shadow-sm sm:max-w-[240px] md:max-w-[300px] md:rounded-3xl md:p-3 lg:max-w-[320px] dark:border-[#94a3b8]/25 dark:bg-[#121b26]">
            <div className="overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem]">
              <Image
                src="/about.png"
                alt="Shohorab Hossain Shawon"
                width={640}
                height={760}
                priority
                className="h-[200px] w-full object-cover sm:h-[220px] md:h-[300px] lg:h-[320px]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}