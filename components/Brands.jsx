'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- Brands Data ---
const brandsData = [
  { src: '/brands/simple_declaration.jpg', name: 'Simple Declaration' },
  { src: '/brands/aat_art_cafe.jpg', name: 'AAT Art Cafe' },
  { src: '/brands/mj_edu.jpg', name: 'MJ Education and Visa Services' },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const brandVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const hoverVariants = {
  hover: {
    scale: 1.08,
    y: -8,
    transition: { duration: 0.3 },
  },
};

// --- Main Brands Component ---
export default function Brands() {
  return (
    <section id="brands" className="w-full py-14 bg-white dark:bg-[#181A1B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl uppercase font-bold font-poppins text-gray-900 dark:text-white">
            BRANDS and Companies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            Brands and Companies I've had the privilege to collaborate with.
          </p>
        </motion.div>

        {/* Brands Grid - Centered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
            {brandsData.map((brand, idx) => (
              <motion.div
                key={idx}
                variants={brandVariants}
                className="group"
              >
                <motion.div
                  variants={hoverVariants}
                  whileHover="hover"
                  className="bg-gray-50 dark:bg-gray-700/50 from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-2xl dark:hover:shadow-gray-700/50 transition-all duration-300 h-56"
                >
                  <motion.div
                    
                    className="relative w-20 h-20 flex items-center justify-center"
                  >
                    <Image
                      src={brand.src}
                      alt={brand.name}
                      width={100}
                      height={100}
                      className="object-contain rounded-lg"
                    />
                  </motion.div>
                  <p className="text-sm h-12 flex items-center text-gray-800 dark:text-gray-200 text-center font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300">
                    {brand.name}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
