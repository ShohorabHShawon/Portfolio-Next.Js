'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CardBody, CardContainer, CardItem } from '@/components/ui/threeD-card';

const webProjects = [
    {
        id: 1,
        title: 'Responsive Travel Agency Landing Page',
        description: 'Responsive Travel Agency Landing Page using Next Js 15 and Tailwind CSS. This website is designed for a travel agency. It has a menu, about, and contact page.',
        image: '/projects/travel-agency-landing-page.png',
        live: 'https://travel-agency-landing-page-eight.vercel.app/',
        github: 'https://github.com/ShohorabHShawon/Travel-Agency-Landing-Page-NextJs-15'
    },
    {   id: 2,
        title: 'Modern Restaurant Website Design.',
        description: 'Modern Restaurant Website Design using Next Js 15 and Tailwind CSS. This website is designed for a restaurant. It has a menu, about, and contact page.',
        image: '/projects/restaurant-landing-page.png',
        live: 'https://projectrestaurant.vercel.app/',
        github: 'https://github.com/ShohorabHShawon/restaurant'
    },
    {   id: 3,
        title: 'Movie Database',
        description: ' A movie database app that uses the TMDB API to fetch movie data. This app is built using Next Js and Tailwind CSS and TMDB API.',
        image: '/projects/movie-database.png',
        live: 'https://movieocean.vercel.app/',
        github: 'https://github.com/ShohorabHShawon/Movie-Ocean-Next.JS'
    },
    {
        id: 4,
        title: 'Responsive Real Estate Landing Page',
        description: 'Responsive Real Estate Landing Page using Next Js 15 and Tailwind CSS. This website is designed for a real estate agency. It has a menu, about, and contact page.',
        image: '/projects/real-estate-landing-page.png',
        live: 'https://real-estate-landing-page-five-murex.vercel.app/',
        github: 'https://github.com/ShohorabHShawon/Real-Estate_Landing-Page'
    },
    {
        id: 5,
        title: 'Modern Restaurant Website Design.',
        description: 'Hungry Restaurant Website Design using Next Js and Tailwind CSS. This website is designed for a restaurant. It has a menu, about, and contact page.',
        image: '/projects/modern-restaurant-website.png',
        live: 'https://hungryrestaurant.vercel.app/',
        github: 'https://github.com/ShohorabHShawon/Hungry'
    },
    {
        id: 6,
        title: 'AI Content Generator',
        description: 'AI Content Generator is a web application that generates content using Google gemini API. It can generate content for any topic you want.',
        image: '/projects/ai-content-generator.png',
        live: '',
        github: 'https://github.com/ShohorabHShawon/AI-Content-Generator'
    },
    {
        id: 7,
        title: 'Indie Game Store',
        description: 'A game store using raw HTML, CSS and PHP with MySQL database. It has a user-friendly interface and a secure login system.',
        image: '/projects/indie-game-store.png',
        live: '',
        github: 'https://github.com/ShohorabHShawon/Webtech_Project_IGS/tree/main/igs'
    },
    {
        id: 8,
        title: 'ABC Service Hub',
        description: 'Basic Management System Project Using NextJs and NestJs. It has a user-friendly interface and a secure login system. It has a user and admin panel.',
        image: '/projects/abc-service-hub.png',
        live: '',
        github: 'https://github.com/ProgSomel/ABC_Service_Hub/tree/shawon'
    },
    
]

export default function WebProjects() {
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
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-3"
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
                                href={project.github}
                                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                            >
                                Github
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>
            </motion.div>
        ))}
    </div>
)
}
