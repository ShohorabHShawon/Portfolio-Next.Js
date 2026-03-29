'use client';

import { motion, useReducedMotion } from 'framer-motion';

const defaultTransition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.7,
};

export default function BlogMotionSection({
  children,
  delay = 0,
  y = 18,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={{ willChange: 'opacity, transform' }}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y, scale: 0.985 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.24, ease: 'easeOut', delay }
          : { ...defaultTransition, delay }
      }
    >
      {children}
    </motion.div>
  );
}
