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

export default function StudioUiProjects() {
  return (
    <section className="relative bg-[#f8f5ee] px-4 py-14 dark:bg-[#0b1118] md:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-2xl font-bold uppercase tracking-[0.08em] text-[#334155] dark:text-[#cbd5e1] sm:text-3xl">UI and UX</p>
          <h2 className="mt-2 font-poppins text-xl font-semibold text-[#0f172a] dark:text-[#f5f4ef] sm:text-2xl">
            Interface Prototypes
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {uiProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="overflow-hidden rounded-2xl border border-[#1f2937]/10 bg-white shadow-sm dark:border-[#94a3b8]/25 dark:bg-[#121b26]"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#1f2937] dark:text-[#e5e7eb]">
                  {project.title}
                </h3>
                <Link
                  href={project.prototype}
                  target="_blank"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#1f2937]/10 bg-[#0f2233] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f5f4ef] dark:border-[#94a3b8]/25"
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
