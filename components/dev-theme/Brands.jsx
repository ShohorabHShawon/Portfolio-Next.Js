'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- Brands Data ---
const brandsData = [
  { src: '/brands/simple_declaration.jpg', name: 'Simple Declaration' },
  { src: '/brands/aat_art_cafe.jpg', name: 'AAT Art Cafe' },
  { src: '/brands/mj_edu.jpg', name: 'MJ Education and Visa Services' },
  { src: '/brands/a_pause.jpg', name: 'A Pause' },
  { src: '/brands/boho.png', name: 'Boho Boutique' },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const brandVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const hoverVariants = {
  hover: {
    y: -5,
    transition: { duration: 0.3 },
  },
};

// --- Main Brands Component ---
export default function Brands() {
  return (
    <section id="brands" className="w-full py-20 bg-white dark:bg-[#181A1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 dark:text-white mb-4">
            Brands & Companies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Collaborations with innovative brands and companies that share my vision for excellence.
          </p>
        </motion.div>

        {/* Brands Grid - Centered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {brandsData.map((brand) => (
            <motion.div
              key={brand.name}
              variants={brandVariants}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={hoverVariants}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-md dark:hover:shadow-gray-700/50 transition-all duration-300 h-full"
              >
                <motion.div
                  className="relative w-20 h-20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    width={120}
                    height={120}
                    className="object-contain rounded-lg"
                  />
                </motion.div>
                <p className="text-base font-medium text-gray-800 dark:text-gray-200 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {brand.name}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
