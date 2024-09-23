"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/threeD-card";
import Link from "next/link";
import { motion } from "framer-motion";

export function Card() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 500 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <CardContainer className="inter-var relative p-1 m-2 w-full h-auto">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            Indie Game Store
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            A game store using raw HTML, CSS and PHP
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/project1.png"
              height="1000"
              width="1000"
              className="h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            ></CardItem>
            <CardItem
              translateZ={20}
              as={Link}
              href="https://github.com/ShohorabHShawon/Webtech_Project_IGS/tree/main/igs"
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
