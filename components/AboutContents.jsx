'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- Main About Section Component ---
export default function AboutSection() {
  // --- Data for the neofetch-style display ---
  const profileData = {
    user: 'Shohorab Hossain Shawon',
    status: 'Available for Opportunities',
    host: 'Portfolio v3.0',
    shell: 'Next.js',
    experience: '3+ Years',
    ide: 'VS Code',
    core_skills: 'TypeScript, Next.Js, Tailwind CSS',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="about" className="w-full py-14 bg-white dark:bg-[#181A1B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900 dark:text-white">
            <span className="text-green-600">$</span> whoami
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            A brief summary of my professional identity.
          </p>
        </motion.div>

        {/* Neofetch-style component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-gray-50 dark:bg-gray-700/50  border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-8"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Left side: Profile Picture */}
            <div className="flex-shrink-0">
              <Image
                src="/shohorab.jpg"
                alt="Shohorab Hossain"
                width={200}
                height={200}
                className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-md h-44 w-40 md:h-52 md:w-48 lg:h-64 lg:w-56 xl:h-72 xl:w-64 object-cover"
              />
            </div>

            {/* Right side: System Info */}
            <motion.div
              className="font-mono text-sm md:text-md lg:text-lg text-gray-800 dark:text-gray-200 w-full md:pl-10 lg:pl-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p
                className="text-lg font-bold mb-2"
                variants={itemVariants}
              >
                <span className="text-green-600">shohorab</span>
                <span className="text-gray-500">@</span>
                <span className="text-green-600">portfolio</span>
              </motion.p>
              <motion.div
                className="border-b border-gray-300 dark:border-gray-600 w-full mb-4"
                variants={itemVariants}
              ></motion.div>

              {Object.entries(profileData).map(([key, value]) => (
                <motion.div key={key} className="flex" variants={itemVariants}>
                  <span className="w-28 text-green-600 font-bold">{key}</span>
                  <span>{value}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Narrative Section */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}
          className="mt-16 text-left pl-4 md:pl-0"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h3>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed md:text-xl text-lg">
            <p>
              As a Full Stack Developer, I thrive on the challenge of building
              complete, end-to-end web applications. My passion lies in the
              entire lifecycle of a project, from architect a scalable back-end
              with Nest.js to designing an intuitive and responsive front-end
              with Next.js and Tailwind CSS.
            </p>
            <p>
              My academic background in Computer Science & Engineering provided
              me with a strong theoretical foundation, but my practical
              experience has taught me the art of turning complex requirements
              into clean, maintainable, and user-friendly software. I believe in
              writing code that is not only functional but also a pleasure to
              read and build upon.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
