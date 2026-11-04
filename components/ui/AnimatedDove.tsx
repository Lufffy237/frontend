'use client';

import { motion } from 'framer-motion';

interface AnimatedDoveProps {
  className?: string;
  size?: number;
}

export function AnimatedDove({ className = '', size = 200 }: AnimatedDoveProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: [0, -15, 0],
      }}
      transition={{
        opacity: { duration: 0.8, ease: 'easeOut' },
        scale: { duration: 0.8, ease: 'easeOut' },
        rotate: { duration: 0.8, ease: 'easeOut' },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      aria-hidden="true"
    >
      {/* Cercle décoratif */}
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        stroke="#FF6600"
        strokeWidth="2"
        strokeDasharray="8 4"
        initial={{ pathLength: 0, rotate: 0 }}
        animate={{ pathLength: 1, rotate: 360 }}
        transition={{
          pathLength: { duration: 1.5, ease: 'easeOut' },
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        }}
        style={{ transformOrigin: '100px 100px' }}
      />

      {/* Corps de la colombe */}
      <motion.path
        d="M100 60 C120 60, 135 75, 135 95 C135 115, 120 130, 100 130 C90 130, 82 126, 76 120 L60 140 L70 118 C63 110, 60 102, 60 95 C60 75, 78 60, 100 60 Z"
        fill="#FF6600"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
      />

      {/* Aile gauche */}
      <motion.path
        d="M75 95 C60 85, 45 90, 40 100 C35 110, 45 120, 60 118 C65 117, 70 115, 75 112"
        stroke="#FF6600"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
      />

      {/* Aile droite */}
      <motion.path
        d="M115 95 C130 85, 145 90, 150 100 C155 110, 145 120, 130 118 C125 117, 120 115, 115 112"
        stroke="#FF6600"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
      />

      {/* Oeil */}
      <motion.circle
        cx="110"
        cy="88"
        r="2.5"
        fill="#1A1A1A"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1.2, ease: 'easeOut' }}
      />

      {/* Bec */}
      <motion.path
        d="M125 95 L135 97 L128 102 Z"
        fill="#E55A00"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1.3, ease: 'easeOut' }}
        style={{ transformOrigin: '130px 100px' }}
      />

      {/* Plumes décoratives */}
      {[0, 1, 2].map((i) => (
        <motion.line
          key={i}
          x1={80 + i * 8}
          y1="125"
          x2={75 + i * 8}
          y2="140"
          stroke="#FF6600"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1 + i * 0.1, ease: 'easeOut' }}
        />
      ))}
    </motion.svg>
  );
}