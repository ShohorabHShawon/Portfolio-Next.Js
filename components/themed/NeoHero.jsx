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
      className="relative flex min-h-screen items-center overflow-hidden bg-[#fff3d6] px-4 pb-12 pt-32 text-[#131313] dark:bg-[#121214] dark:text-[#f6f2e8] md:px-8 md:pt-36 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-[26rem] w-[26rem] rounded-full bg-[#ff4d37]/35 blur-3xl dark:bg-[#ff4d37]/20" />
        <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#2ac6ff]/35 blur-3xl dark:bg-[#2ac6ff]/20" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_2px_2px,#0d0d0d_1.3px,transparent_0)] [background-size:26px_26px] dark:opacity-15" />
        <div className="absolute left-0 top-0 h-16 w-full bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.45)_25%,rgba(255,255,255,0.45)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.45)_75%)] bg-[length:24px_24px] dark:opacity-20" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8">
        <motion.div
          className="md:col-span-7"
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="mb-6 inline-flex items-center rounded-md border-[3px] border-[#131313] bg-[#ffea00] px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#111] shadow-[4px_4px_0_0_#131313] dark:border-[#f6f2e8] dark:bg-[#ffde00] dark:text-[#121214] dark:shadow-[4px_4px_0_0_#f6f2e8]"
            variants={fadeUp}
            custom={0.05}
          >
            Player One: Creative Mode
          </motion.p>

          <motion.h1
            className="font-poppins text-4xl font-black uppercase leading-[0.95] text-[#111] [text-shadow:3px_3px_0px_#ffea00] dark:text-[#f6f2e8] dark:[text-shadow:3px_3px_0px_#ff5a36] sm:text-6xl lg:text-8xl"
            variants={fadeUp}
            custom={0.12}
          >
            SHOHORAB
            <span className="block text-[#ff5a1f] dark:text-[#ff8c61]">HOSSAIN SHAWON</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl rounded-xl border-2 border-[#131313]/20 bg-white/70 px-4 py-3 text-base leading-relaxed text-[#202020] shadow-[0_12px_30px_-16px_rgba(0,0,0,0.7)] backdrop-blur dark:border-white/25 dark:bg-white/10 dark:text-white/85 sm:text-lg"
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
              className="inline-flex items-center gap-2 rounded-md border-[3px] border-[#131313] bg-[#131313] px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0_0_#ff5a1f] transition-transform duration-300 hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#f6f2e8] dark:text-[#131313] dark:shadow-[4px_4px_0_0_#2ac6ff]"
            >
              Resume <FiArrowUpRight />
            </Link>
            <Link
              href="/photography"
              className="inline-flex items-center gap-2 rounded-md border-[3px] border-[#131313] bg-[#2ac6ff] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#101010] shadow-[4px_4px_0_0_#131313] transition-transform duration-300 hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#2ac6ff] dark:text-[#101010] dark:shadow-[4px_4px_0_0_#f6f2e8]"
            >
              <FiPlay className="text-xs" /> Photography
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-md border-[3px] border-[#131313] bg-[#ffea00] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#111] shadow-[4px_4px_0_0_#131313] transition-transform duration-300 hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#ffea00] dark:text-[#121214] dark:shadow-[4px_4px_0_0_#f6f2e8]"
            >
              Read Blog
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
              className="rounded-md border-[3px] border-[#131313] bg-white p-3 text-[#131313] shadow-[3px_3px_0_0_#131313] transition-transform hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#1f2023] dark:text-[#f6f2e8] dark:shadow-[3px_3px_0_0_#f6f2e8]"
            >
              <FiGithub className="text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/shohorabhshawon/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-md border-[3px] border-[#131313] bg-white p-3 text-[#131313] shadow-[3px_3px_0_0_#131313] transition-transform hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#1f2023] dark:text-[#f6f2e8] dark:shadow-[3px_3px_0_0_#f6f2e8]"
            >
              <FiLinkedin className="text-lg" />
            </a>
            <a
              href="mailto:shohorabhshawon@gmail.com"
              aria-label="Email"
              className="rounded-md border-[3px] border-[#131313] bg-white p-3 text-[#131313] shadow-[3px_3px_0_0_#131313] transition-transform hover:-translate-y-1 dark:border-[#f6f2e8] dark:bg-[#1f2023] dark:text-[#f6f2e8] dark:shadow-[3px_3px_0_0_#f6f2e8]"
            >
              <FiMail className="text-lg" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative md:col-span-5"
          variants={popIn}
          initial="hidden"
          animate="visible"
        >
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div className="absolute -left-8 top-8 hidden h-[74%] w-10 -rotate-6 rounded-md border-[3px] border-[#131313] bg-[#ff4d37] shadow-[4px_4px_0_0_#131313] md:block dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]" />
            <div className="absolute -right-7 -top-7 h-24 w-24 rotate-12 rounded-md border-[3px] border-[#131313] bg-[#ffea00] shadow-[4px_4px_0_0_#131313] dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]" />

            <div className="relative overflow-hidden rounded-[1.8rem] border-[4px] border-[#131313] bg-white/80 p-3 shadow-[8px_8px_0_0_#131313] dark:border-[#f6f2e8] dark:bg-[#1a1b1f] dark:shadow-[8px_8px_0_0_#f6f2e8]">
              <div className="relative overflow-hidden rounded-[1.2rem] border-[3px] border-[#131313] dark:border-[#f6f2e8]">
                <Image
                  src="/profile.jpg"
                  alt="Shohorab Hossain Shawon"
                  width={650}
                  height={800}
                  priority
                  className="h-[400px] w-full object-cover sm:h-[460px] lg:h-[500px]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.75)_100%)]" />
                <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:22px_22px]" />
              </div>

              <div className="absolute bottom-7 left-7 right-7 rounded-md border-[3px] border-white/30 bg-[#131313]/70 px-4 py-3 text-white backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ffea00]">Quest Active</p>
                <p className="mt-1 text-sm font-semibold">Building worlds where code meets cinematic storytelling.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default NeoHero;