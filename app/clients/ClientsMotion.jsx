'use client';

import { motion } from 'framer-motion';

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export function ClientReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: reveal.hidden,
        visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ClientListReveal({ children, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ClientRowReveal({ children, className = '' }) {
  return (
    <motion.article variants={reveal} className={className}>
      {children}
    </motion.article>
  );
}
