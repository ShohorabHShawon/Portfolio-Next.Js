'use client';
import ThemeToggle from '@/components/ThemeToggle';
import { motion } from 'framer-motion';

export default function PhotographyNavbar() {
  return (
    <motion.nav
      className="fixed top-0 right-0 z-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <ThemeToggle />
    </motion.nav>
  );
}
