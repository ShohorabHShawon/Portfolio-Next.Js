'use client';

import Image from 'next/image';
import React from 'react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/threeD-card';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Card8() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, amount: 0.1 }}
    >
      <CardContainer className="inter-var relative m-2 w-full h-auto">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white line-clamp-1"
          >
            Responsive Real Estate Landing Page
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-3"
          >
            Responsive Real Estate Landing Page using Next Js 15 and Tailwind
            CSS. This website is designed for a real estate agency. It has a
            menu, about, and contact page.
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/webProject8.png"
              height="1000"
              width="1000"
              className="h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-10">
            <CardItem
              translateZ={20}
              as={Link}
              href="https://real-estate-landing-page-five-murex.vercel.app/"
              target="__blank"
              className="px-4 py-2 rounded-xl bg-black dark:bg-green-700 dark:text-white text-white text-xs font-bold"
            >
              Live
            </CardItem>
            <CardItem
              translateZ={20}
              as={Link}
              target="__blank"
              href="https://github.com/ShohorabHShawon/Real-Estate_Landing-Page"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Github
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}
