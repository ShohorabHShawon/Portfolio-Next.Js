'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiPlay } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay,
    },
  }),
};

const popIn = {
  hidden: { opacity: 0, scale: 0.92, rotate: -2 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.25,
    },
  },
};

function NeoHero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#f9f3df] px-4 pb-12 pt-32 text-[#131313] dark:bg-[#0f1218] dark:text-[#f6f2e8] md:px-8 md:pt-36 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-[26rem] w-[26rem] rounded-full bg-[#ef4b3f]/35 blur-3xl dark:bg-[#ef4b3f]/20" />
        <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#39d5ff]/35 blur-3xl dark:bg-[#39d5ff]/20" />
        <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_2px_2px,#111_1.2px,transparent_0)] [background-size:18px_18px] dark:opacity-15" />
        <div className="absolute left-0 top-0 h-24 w-full opacity-40 [background-image:repeating-linear-gradient(165deg,transparent_0,transparent_14px,rgba(255,255,255,0.7)_14px,rgba(255,255,255,0.7)_18px)] dark:opacity-20" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8">
        <motion.div
          className="order-2 md:order-1 md:col-span-7"
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="mb-6 inline-flex items-center rounded-md border-[3px] border-[#111] bg-[#ffe063] px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#111] shadow-[4px_4px_0_0_#111] dark:border-[#f6f2e8] dark:bg-[#ffe063] dark:text-[#121214] dark:shadow-[4px_4px_0_0_#f6f2e8]"
            variants={fadeUp}
            custom={0.05}
          >
            CHAPTER 01: HERO INTRO
          </motion.p>

          <motion.h1
            className="font-poppins text-4xl font-black uppercase leading-[0.92] text-[#111] [text-shadow:4px_4px_0px_#ffe063] dark:text-[#f6f2e8] dark:[text-shadow:4px_4px_0px_#ef4b3f] sm:text-6xl lg:text-8xl"
            variants={fadeUp}
            custom={0.12}
          >
            SHOHORAB
            <span className="block text-[#ef4b3f] dark:text-[#ff8f7a]">HOSSAIN SHAWON</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl rounded-2xl border-[3px] border-[#111] bg-white/85 px-4 py-3 text-base font-medium leading-relaxed text-[#1e1e1e] shadow-[6px_6px_0_0_#111] backdrop-blur dark:border-[#f6f2e8] dark:bg-white/10 dark:text-white/90 dark:shadow-[6px_6px_0_0_#f6f2e8] sm:text-lg"
            variants={fadeUp}
            custom={0.2}
          >
            Boss level mix of engineering and visual storytelling. I build expressive
            digital products as a Software Engineer and Full Stack Developer, while
            framing stories through photography and cinematography.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            variants={fadeUp}
            custom={0.3}
          >
            <Link
              href="/Shohorab_Hossain_Shawon.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border-[3px] border-[#111] bg-[#111] px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0_0_#ef4b3f] transition-transform duration-300 hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#f6f2e8] dark:text-[#131313] dark:shadow-[4px_4px_0_0_#39d5ff]"
            >
              Resume File <FiArrowUpRight />
            </Link>
            <Link
              href="/photography"
              className="inline-flex items-center gap-2 rounded-md border-[3px] border-[#111] bg-[#39d5ff] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#101010] shadow-[4px_4px_0_0_#111] transition-transform duration-300 hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#39d5ff] dark:text-[#101010] dark:shadow-[4px_4px_0_0_#f6f2e8]"
            >
              <FiPlay className="text-xs" /> Photography
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-md border-[3px] border-[#111] bg-[#ffe063] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#111] shadow-[4px_4px_0_0_#111] transition-transform duration-300 hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#ffe063] dark:text-[#121214] dark:shadow-[4px_4px_0_0_#f6f2e8]"
            >
              Story Log
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 flex items-center gap-3"
            variants={fadeUp}
            custom={0.38}
          >
            <a
              href="https://github.com/ShohorabHShawon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-md border-[3px] border-[#111] bg-white p-3 text-[#131313] shadow-[3px_3px_0_0_#111] transition-transform hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#1f2023] dark:text-[#f6f2e8] dark:shadow-[3px_3px_0_0_#f6f2e8]"
            >
              <FiGithub className="text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/shohorabhshawon/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-md border-[3px] border-[#111] bg-white p-3 text-[#131313] shadow-[3px_3px_0_0_#111] transition-transform hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#1f2023] dark:text-[#f6f2e8] dark:shadow-[3px_3px_0_0_#f6f2e8]"
            >
              <FiLinkedin className="text-lg" />
            </a>
            <a
              href="mailto:shohorabhshawon@gmail.com"
              aria-label="Email"
              className="rounded-md border-[3px] border-[#111] bg-white p-3 text-[#131313] shadow-[3px_3px_0_0_#111] transition-transform hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#1f2023] dark:text-[#f6f2e8] dark:shadow-[3px_3px_0_0_#f6f2e8]"
            >
              <FiMail className="text-lg" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative order-1 md:order-2 md:col-span-5"
          variants={popIn}
          initial="hidden"
          animate="visible"
        >
          <div className="relative mx-auto w-full max-w-[18rem] sm:max-w-sm lg:max-w-md">
            <div className="absolute -left-8 top-8 hidden h-[74%] w-10 -rotate-6 rounded-md border-[3px] border-[#111] bg-[#ef4b3f] shadow-[4px_4px_0_0_#111] md:block dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]" />
            <div className="absolute -right-7 -top-7 h-24 w-24 rotate-12 rounded-md border-[3px] border-[#111] bg-[#ffe063] shadow-[4px_4px_0_0_#111] dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]" />

            <div className="relative overflow-hidden rounded-[1.8rem] border-[4px] border-[#111] bg-white/85 p-3 shadow-[8px_8px_0_0_#111] dark:border-[#f6f2e8] dark:bg-[#1a1b1f] dark:shadow-[8px_8px_0_0_#f6f2e8]">
              <div className="absolute right-4 top-4 z-20 rounded-md border-[3px] border-[#111] bg-[#ffe063] px-2 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#111] dark:border-[#f6f2e8]">
                Hero Shot
              </div>
              <div className="relative overflow-hidden rounded-[1.2rem] border-[3px] border-[#111] dark:border-[#f6f2e8]">
                <Image
                  src="/profile.jpg"
                  alt="Shohorab Hossain Shawon"
                  width={650}
                  height={800}
                  priority
                  className="h-[320px] w-full object-cover sm:h-[460px] lg:h-[500px]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.75)_100%)]" />
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.5)_1px,transparent_0)] [background-size:14px_14px]" />
              </div>

              <div className="absolute bottom-7 left-7 right-7 rounded-md border-[3px] border-white/45 bg-[#111]/70 px-4 py-3 text-white backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffe063]">Speech Bubble</p>
                <p className="mt-1 text-sm font-semibold">I build worlds where code, design, and cinema share the same panel.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default NeoHero;