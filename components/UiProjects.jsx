'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiFigma } from 'react-icons/fi';

// The project data remains the same
const uiProjects = [
  {
    id: 1,
    title: 'Food Delivery Website',
    image: '/projects/food-delivery-ui.png',
    prototype:
      'https://www.figma.com/proto/clVgRF2aB3JTGS2beIqcOd/Hungry.com?node-id=0-1&t=CrEGqnhZsHcZOGes-1',
  },
  {
    id: 2,
    title: 'Food Delivery App',
    image: '/projects/food-delivery-app-ui.png',
    prototype:
      'https://www.figma.com/proto/gQ0wnLen5TbvS3l9MyDRE8/Hungry-Restaurant-App?node-id=0-1&t=pYCT7bfMVsvbkt6N-1',
  },
  {
    id: 3,
    title: 'E-commerce Mobile App',
    image: '/projects/e-commerce-ui.png',
    prototype:
      'https://www.figma.com/proto/AA9oWuR6XVdQOKpk5Mw4et/E-Commerce-Mobile-App?node-id=0-1&t=OL0lot6tF71bfAHv-1',
  },

  {
    id: 4,
    title: 'Classic Restaurant App',
    image: '/projects/classic-restaurant-ui.png',
    prototype:
      'https://www.figma.com/proto/zjkIpFq1uXLNg5p1HFf9pI/Restaurant?node-id=0-1&t=NHobr2iXW3my7TLa-1',
  },
  {
    id: 5,
    title: 'Pizza Restaurant Website',
    image: '/projects/pizza-ui.png',
    prototype:
      'https://www.figma.com/proto/89wxUVTcFgcjPiKFFuASZk/Untitled?node-id=0-1&t=XM96FXUWgoeZkmrT-1',
  },
  {
    id: 6,
    title: 'Backpack E-commerce Site',
    image: '/projects/backpack-website-ui.png',
    prototype:
      'https://www.figma.com/proto/DDL0nQ6K2h1Of9BuoPcMfT/Backpack-Website-UI?node-id=0-1&t=GKf80MhA4gPH981X-1',
  },
];

export default function UiProjects() {
  const scrollContainerRef = useRef(null);
  const projectRefs = useRef([]);
  // Initialize activeIndex to 1 to start with the second project
  const [activeIndex, setActiveIndex] = useState(1);
  const observerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current && projectRefs.current[1]) {
      const projectElement = projectRefs.current[1];
      const container = scrollContainerRef.current;
      const scrollLeftValue =
        projectElement.offsetLeft -
        container.offsetWidth / 2 +
        projectElement.offsetWidth / 2;
      container.scrollLeft = scrollLeftValue;
    }
  }, []);

  // State for drag-to-scroll functionality
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Function to scroll to a specific project by its index
  const scrollToIndex = useCallback((index) => {
    if (projectRefs.current[index]) {
      projectRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center', // This centers the element in the scroll view
      });
    }
  }, []);

  // Handlers for next/previous buttons
  const goToNext = () => {
    const nextIndex = (activeIndex + 1) % uiProjects.length;
    scrollToIndex(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = (activeIndex - 1 + uiProjects.length) % uiProjects.length;
    scrollToIndex(prevIndex);
  };

  // This effect sets up the Intersection Observer to sync the active dot with any scroll action
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most central and intersecting
        const intersectingEntries = entries.filter((e) => e.isIntersecting);
        if (intersectingEntries.length > 0) {
          const centralEntry = intersectingEntries.reduce((prev, curr) =>
            prev.intersectionRatio > curr.intersectionRatio ? prev : curr,
          );
          const index = projectRefs.current.indexOf(centralEntry.target);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.5, // Item is considered active when 50% is visible
      },
    );

    const currentRefs = projectRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observerRef.current.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref && observerRef.current) observerRef.current.unobserve(ref);
      });
    };
  }, []); // Dependencies removed to ensure observer is set up once, as scrollContainerRef.current is stable after initial render.

  // Handlers for robust drag-to-scroll
  const onMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const onMouseLeaveOrUp = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
  };

  const onMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.4 },
    inView: {
      opacity: 1,
      scale: 1,
      // Increased duration to make the animation slower and smoother
      transition: { duration: 1.0, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="projects"
      className="w-full py-14 bg-white dark:bg-[#181A1B] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-ttnorm text-gray-900 dark:text-white">
            UI / UX PROJECTS
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            UI / UX Design & Prototypes
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto rounded-2xl snap-x snap-mandatory scroll-smooth scrollbar-hide pb-8 -mb-8 cursor-grab hover:rounded-2xl"
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeaveOrUp}
            onMouseUp={onMouseLeaveOrUp}
            onMouseMove={onMouseMove}
            initial="initial"
            whileInView="inView"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {uiProjects.map((project, index) => (
              <motion.div
                key={project.id}
                ref={(el) => (projectRefs.current[index] = el)}
                variants={cardVariants}
                className="group relative w-[75vw] md:w-[450px] flex-shrink-0 snap-center aspect-video rounded-2xl overflow-hidden shadow-lg select-none"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="w-full h-full object-cover pointer-events-none border-2 rounded-2xl hover:rounded-2xl overflow-hidden"
                />
                <div className="absolute inset-0 pointer-events-none" />

                <div className="absolute inset-0 p-6 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-hover:rounded-2xl bg-black/40 backdrop-blur-sm rounded-2xl transition-opacity ease-in-out duration-500">
                  <h3 className="text-2xl font-bold text-white text-center mb-4">
                    {project.title}
                  </h3>
                  <Link
                    href={project.prototype}
                    target="_blank"
                    className="inline-flex items-center gap-2 w-fit px-4 py-2 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-colors"
                  >
                    <FiFigma />
                    View Prototype
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={goToPrev}
            aria-label="Previous project"
            className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
          >
            <FiArrowLeft className="text-gray-700 dark:text-gray-200" />
          </button>
          <div className="flex items-center gap-2">
            {uiProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-green-500 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={goToNext}
            aria-label="Next project"
            className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
          >
            <FiArrowRight className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      </div>
    </section>
  );
}
