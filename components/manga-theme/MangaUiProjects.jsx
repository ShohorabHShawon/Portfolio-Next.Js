'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiFigma } from 'react-icons/fi';

const uiProjects = [
  {
    id: 1,
    title: 'Food Delivery Website',
    image: '/projects/food-delivery-ui.png',
    prototype: 'https://www.figma.com/proto/clVgRF2aB3JTGS2beIqcOd/Hungry.com?node-id=0-1&t=CrEGqnhZsHcZOGes-1',
  },
  {
    id: 2,
    title: 'Food Delivery App',
    image: '/projects/food-delivery-app-ui.png',
    prototype: 'https://www.figma.com/proto/gQ0wnLen5TbvS3l9MyDRE8/Hungry-Restaurant-App?node-id=0-1&t=pYCT7bfMVsvbkt6N-1',
  },
  {
    id: 3,
    title: 'E-commerce Mobile App',
    image: '/projects/e-commerce-ui.png',
    prototype: 'https://www.figma.com/proto/AA9oWuR6XVdQOKpk5Mw4et/E-Commerce-Mobile-App?node-id=0-1&t=OL0lot6tF71bfAHv-1',
  },
  {
    id: 4,
    title: 'Classic Restaurant App',
    image: '/projects/classic-restaurant-ui.png',
    prototype: 'https://www.figma.com/proto/zjkIpFq1uXLNg5p1HFf9pI/Restaurant?node-id=0-1&t=NHobr2iXW3my7TLa-1',
  },
  {
    id: 5,
    title: 'Pizza Restaurant Website',
    image: '/projects/pizza-ui.png',
    prototype: 'https://www.figma.com/proto/89wxUVTcFgcjPiKFFuASZk/Untitled?node-id=0-1&t=XM96FXUWgoeZkmrT-1',
  },
  {
    id: 6,
    title: 'Backpack E-commerce Site',
    image: '/projects/backpack-website-ui.png',
    prototype: 'https://www.figma.com/proto/DDL0nQ6K2h1Of9BuoPcMfT/Backpack-Website-UI?node-id=0-1&t=GKf80MhA4gPH981X-1',
  },
];

export default function MangaUiProjects() {
  return (
    <section className="relative left-1/2 right-1/2 w-screen min-h-screen -translate-x-1/2 bg-[#f9f3df] py-14 dark:bg-[#0f1218]">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_2px_2px,#111_1px,transparent_0)] [background-size:18px_18px] dark:opacity-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center relative">
          <p className="mb-3 inline-flex rounded-md border-[3px] border-[#111] bg-[#39d5ff] px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#111] shadow-[4px_4px_0_0_#111] dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]">
            CHAPTER 05A
          </p>
          <h2 className="font-poppins text-4xl font-black uppercase text-[#111] [text-shadow:3px_3px_0px_#39d5ff] dark:text-[#f6f2e8] dark:[text-shadow:3px_3px_0px_#ef4b3f] lg:text-5xl">
            UI Arena
          </h2>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[#222]/80 dark:text-white/70">
            Figma prototype panels
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {uiProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border-[3px] border-[#111] bg-white shadow-[6px_6px_0_0_#111] dark:border-[#f6f2e8] dark:bg-[#171b22] dark:shadow-[6px_6px_0_0_#f6f2e8]"
            >
              <div className="absolute right-3 top-3 z-20 rounded-md border-[2px] border-[#111] bg-[#ffe063] px-2 py-1 text-[10px] font-black uppercase tracking-wide text-[#111] dark:border-[#f6f2e8]">
                Draft
              </div>
              <div className="relative aspect-video border-b-[3px] border-[#111] dark:border-[#f6f2e8]">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(160deg,transparent_0,transparent_16px,rgba(255,255,255,0.5)_16px,rgba(255,255,255,0.5)_20px)]" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-black uppercase text-[#111] dark:text-[#f6f2e8]">{project.title}</h3>
                <Link
                  href={project.prototype}
                  target="_blank"
                  className="mt-3 inline-flex items-center gap-2 rounded-md border-[3px] border-[#111] bg-[#ffe063] px-3 py-2 text-xs font-black uppercase tracking-wide text-[#111] shadow-[4px_4px_0_0_#111] dark:border-[#f6f2e8] dark:shadow-[4px_4px_0_0_#f6f2e8]"
                >
                  <FiFigma /> View Prototype
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
