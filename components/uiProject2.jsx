'use client';

import Image from 'next/image';
import React from 'react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/threeD-card';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Card22() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, amount: 0.1 }}
    >
      <CardContainer className="inter-var relative p-1 m-2 w-full h-auto">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            Backpack Website Ui Design
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-1"
          >
            Simple and clean Backpack Website UI Design using Figma.
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/ui2.png"
              height="1000"
              width="1000"
              className="h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl line-clamp-1"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-10">
            <CardItem
              translateZ={20}
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            ></CardItem>
            <CardItem
              translateZ={20}
              as={Link}
              href="https://www.figma.com/proto/DDL0nQ6K2h1Of9BuoPcMfT/Backpack-Website-UI?node-id=0-1&t=GKf80MhA4gPH981X-1"
              target="__blank"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Prototype
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}
