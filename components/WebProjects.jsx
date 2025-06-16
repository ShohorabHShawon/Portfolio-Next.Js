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
        github: 'https://github.com/ShohorabHShawon/Travel-Agency-Landing-Page-NextJs-15',
        tags: ['Next.js', 'Tailwind CSS', 'Travel']
    },
    {   id: 2,
        title: 'Modern Restaurant Website Design.',
        description: 'Modern Restaurant Website Design using Next Js 15 and Tailwind CSS. This website is designed for a restaurant. It has a menu, about, and contact page.',
        image: '/projects/restaurant-landing-page.png',
        live: 'https://projectrestaurant.vercel.app/',
        github: 'https://github.com/ShohorabHShawon/restaurant',
        tags: ['Next.js', 'Tailwind CSS', 'Restaurant']
    },
    {   id: 3,
        title: 'Movie Database',
        description: ' A movie database app that uses the TMDB API to fetch movie data. This app is built using Next Js and Tailwind CSS and TMDB API.',
        image: '/projects/movie-database.png',
        live: 'https://movieocean.vercel.app/',
        github: 'https://github.com/ShohorabHShawon/Movie-Ocean-Next.JS',
        tags: ['Next.js', 'API', 'TMDB']
    },
    {
        id: 4,
        title: 'Responsive Real Estate Landing Page',
        description: 'Responsive Real Estate Landing Page using Next Js 15 and Tailwind CSS. This website is designed for a real estate agency. It has a menu, about, and contact page.',
        image: '/projects/real-estate-landing-page.png',
        live: 'https://real-estate-landing-page-five-murex.vercel.app/',
        github: 'https://github.com/ShohorabHShawon/Real-Estate_Landing-Page',
        tags: ['Next.js', 'Real Estate', 'Landing Page']
    },
    {
        id: 5,
        title: 'Modern Restaurant Website Design.',
        description: 'Hungry Restaurant Website Design using Next Js and Tailwind CSS. This website is designed for a restaurant. It has a menu, about, and contact page.',
        image: '/projects/modern-restaurant-website.png',
        live: 'https://hungryrestaurant.vercel.app/',
        github: 'https://github.com/ShohorabHShawon/Hungry',
        tags: ['Next.js', 'Restaurant', 'Modern Design']
    },
    {
        id: 6,
        title: 'AI Content Generator',
        description: 'AI Content Generator is a web application that generates content using Google gemini API. It can generate content for any topic you want.',
        image: '/projects/ai-content-generator.png',
        live: '',
        github: 'https://github.com/ShohorabHShawon/AI-Content-Generator',
        tags: ['AI', 'Google Gemini', 'Content Generator']
    },
    {
        id: 7,
        title: 'Indie Game Store',
        description: 'A game store using raw HTML, CSS and PHP with MySQL database. It has a user-friendly interface and a secure login system.',
        image: '/projects/indie-game-store.png',
        live: '',
        github: 'https://github.com/ShohorabHShawon/Webtech_Project_IGS/tree/main/igs',
        tags: ['PHP', 'MySQL', 'E-commerce']
    },
    {
        id: 8,
        title: 'ABC Service Hub',
        description: 'Basic Management System Project Using NextJs and NestJs. It has a user-friendly interface and a secure login system. It has a user and admin panel.',
        image: '/projects/abc-service-hub.png',
        live: '',
        github: 'https://github.com/ProgSomel/ABC_Service_Hub/tree/shawon',
        tags: ['Next.js', 'NestJS', 'Management System']
    },
]

export default function WebProjects() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
            {webProjects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="group"
                >
                    <CardContainer className="inter-var w-full">
                        <CardBody className="bg-white dark:bg-gray-900 relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] dark:hover:shadow-emerald-500/[0.1] border border-gray-200 dark:border-gray-700 w-full h-auto rounded-2xl p-0 overflow-hidden shadow-md dark:shadow-lg">
                            <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
                                <CardItem translateZ="60" className="w-full h-full">
                                    <Image
                                        src={project.image}
                                        height="400"
                                        width="600"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        alt={project.title}
                                    />
                                </CardItem>
                                
                                {/* Overlay with buttons - appears on hover */}
                                <motion.div 
                                    className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    {project.live && (
                                        <CardItem
                                            translateZ={20}
                                            as={Link}
                                            href={project.live}
                                            target="_blank"
                                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Live Demo
                                        </CardItem>
                                    )}
                                    <CardItem
                                        translateZ={20}
                                        as={Link}
                                        href={project.github}
                                        target="_blank"
                                        className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg"
                                    >
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                        GitHub
                                    </CardItem>
                                </motion.div>
                            </div>
                            {/* Content */}
                            <div className="p-4 flex flex-col">
                                <CardItem translateZ="50" className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 transition-all duration-300">
                                    {project.title}
                                </CardItem>
                                
                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-gray-600 dark:text-gray-300 text-xs mb-3 line-clamp-2  flex-grow transition-all duration-300"
                                >
                                    {project.description}
                                </CardItem>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {project.tags?.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Bottom Action Buttons - Always Visible */}
                                <div className="flex gap-2 mt-auto">
                                    {project.live && (
                                        <Link
                                            href={project.live}
                                            target="_blank"
                                            className="flex-1 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-center py-2 px-3 rounded-lg text-xs font-medium transition-colors duration-200 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            View Live
                                        </Link>
                                    )}
                                    <Link
                                        href={project.github}
                                        target="_blank"
                                        className="flex-1 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-center py-2 px-3 rounded-lg text-xs font-medium transition-colors duration-200 border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-1"
                                    >
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                        View Code
                                    </Link>
                                </div>
                            </div>
                        </CardBody>
                    </CardContainer>
                </motion.div>
            ))}
        </div>
    )
}
