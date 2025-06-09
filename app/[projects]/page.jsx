import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'

export default function ProjectsPage({ params }) {
  // You can access the dynamic route parameter with params.projects
  const projectType = params.projects;

  // Mock data - replace this with actual data fetching
  const getProjectData = (type) => {
    // This could be an API call or imported data based on the type
    const projectsData = {
      web: [
        {
          id: 1,
          title: "Web Project 1",
          description: "Description of web project",
          image: "/project1.jpg",
          live: "https://example.com",
          github: "https://github.com/example"
        }
        // Add more projects
      ],
      mobile: [
        // Mobile projects data
      ],
      // Add other project types
    };
    
    return projectsData[type] || [];
  };

  const projects = getProjectData(projectType);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {projects.map((project, index) => (
          <CardContainer key={project.id || index} className="inter-var relative m-2 w-full h-auto">
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
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={project.live}
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-green-700 dark:text-white text-white text-xs font-bold"
                >
                  Live
                </CardItem>
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
        ))}
      </motion.div>
    </>
  )
}
