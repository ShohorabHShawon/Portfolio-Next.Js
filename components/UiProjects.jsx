'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CardBody, CardContainer, CardItem } from '@/components/ui/threeD-card';

const webProjects = [
    {
        id: 1,
        title: 'E-commerce Mobile App Ui Design',
        description: 'Modern E-commerce Mobile App Ui Design using Figma.',
        image: '/projects/e-commerce-ui.png',
        prototype: 'https://www.figma.com/proto/AA9oWuR6XVdQOKpk5Mw4et/E-Commerce-Mobile-App?node-id=0-1&t=OL0lot6tF71bfAHv-1'
    },
    {   id: 2,
        title: 'Food Delivery Website Ui Design.',
        description: 'Food Delivery Website Ui Design and Prototype using Figma.',
        image: '/projects/food-delivery-ui.png',
        prototype: 'https://www.figma.com/proto/clVgRF2aB3JTGS2beIqcOd/Hungry.com?node-id=0-1&t=CrEGqnhZsHcZOGes-1'
    },
    {   id: 3,
        title: 'Food Delivery APP Ui Design.',
        description: 'Food Delivery APP Ui Design and Prototype using Figma.',
        image: '/projects/food-delivery-app-ui.png',
        prototype: 'https://www.figma.com/proto/gQ0wnLen5TbvS3l9MyDRE8/Hungry-Restaurant-App?node-id=0-1&t=pYCT7bfMVsvbkt6N-1'
    },
    {
        id: 4,
        title: 'Classic Restaurant App.',
        description: 'Classic Restaurant App Ui Design and Prototype using Figma.',
        image: '/projects/classic-restaurant-ui.png',
        prototype: 'https://www.figma.com/proto/zjkIpFq1uXLNg5p1HFf9pI/Restaurant?node-id=0-1&t=NHobr2iXW3my7TLa-1'
    },
    {
        id: 5,
        title: ' Pizza / Restaurant Website Ui Design using Figma.',
        description: 'Pizza / Restaurant Website Ui Design and Prototype using Figma.',
        image: '/projects/pizza-ui.png',

        prototype: 'https://www.figma.com/proto/89wxUVTcFgcjPiKFFuASZk/Untitled?node-id=0-1&t=XM96FXUWgoeZkmrT-1'
    },
    {
        id: 6,
        title: 'Backpack Website Ui Design',
        description: 'Backpack Website Ui Design and Prototype using Figma.',
        image: '/projects/backpack-website-ui.png',

        prototype: 'https://www.figma.com/proto/DDL0nQ6K2h1Of9BuoPcMfT/Backpack-Website-UI?node-id=0-1&t=GKf80MhA4gPH981X-1'
    },

]

export default function UiProjects() {
return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {webProjects.map((project) => (
            <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: false, amount: 0.1 }}
            >
                <CardContainer className="inter-var relative m-2 w-full h-auto">
                    <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-gray-50 dark:bg-gray-950 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border shadow-lg">
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white line-clamp-1"
                        >
                            {project.title}
                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-1"
                        >
                            {project.description}
                        </CardItem>
                        <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                                src={project.image}
                                height="1000"
                                width="1000"
                                className="h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="thumbnail"
                            />
                        </CardItem>
                        <div className="flex justify-between items-center mt-10">
                            {project.live && (
                                <CardItem
                                    translateZ={20}
                                    as={Link}
                                    href={project.live}
                                    target="_blank"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-green-700 dark:text-white text-white text-xs font-bold"
                                >
                                    Live
                                </CardItem>
                            )}
                            <CardItem
                                translateZ={20}
                                as={Link}
                                target="_blank"
                                href={project.prototype}
                                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                            >
                                Prototype
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>
            </motion.div>
        ))}
    </div>
)
}
