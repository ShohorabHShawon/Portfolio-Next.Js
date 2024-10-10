'use client';

import Image from 'next/image';
import React from 'react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/threeD-card';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Card4() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 500 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <CardContainer className="inter-var relative m-2 w-full h-auto">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            Movie Database App
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            A movie database app that uses the TMDB API to fetch movie data.
            This app is built using Next Js and Tailwind CSS and TMDB API.
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/webProject4.png"
              height="1000"
              width="1000"
              className="h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl"
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
              href="https://github.com/ShohorabHShawon/MovieDB-Next.JS"
              target="__blank"
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