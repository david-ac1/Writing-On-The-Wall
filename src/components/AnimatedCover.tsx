'use client';

import { motion } from 'framer-motion';

interface AnimatedCoverProps {
  category: 'Systems' | 'Sovereignty' | 'Witness';
  title: string;
}

const categoryStyles = {
  Systems: {
    gradient: ['#1e3a8a', '#3b82f6', '#60a5fa'],
    accent: '#93c5fd',
  },
  Sovereignty: {
    gradient: ['#064e3b', '#10b981', '#34d399'],
    accent: '#6ee7b7',
  },
  Witness: {
    gradient: ['#4a044e', '#a855f7', '#c084fc'],
    accent: '#e9d5ff',
  },
};

// Pre-generated particle positions for consistency
const particleData = [
  { id: 0, x: 15, y: 20, duration: 4.2, delay: 0.5 },
  { id: 1, x: 75, y: 35, duration: 3.8, delay: 1.2 },
  { id: 2, x: 40, y: 60, duration: 4.5, delay: 0.3 },
  { id: 3, x: 85, y: 15, duration: 3.5, delay: 1.8 },
  { id: 4, x: 25, y: 80, duration: 4.0, delay: 0.8 },
  { id: 5, x: 60, y: 45, duration: 3.9, delay: 1.5 },
  { id: 6, x: 10, y: 55, duration: 4.3, delay: 0.2 },
  { id: 7, x: 90, y: 70, duration: 3.7, delay: 1.0 },
  { id: 8, x: 50, y: 25, duration: 4.1, delay: 0.6 },
  { id: 9, x: 70, y: 85, duration: 3.6, delay: 1.4 },
  { id: 10, x: 35, y: 10, duration: 4.4, delay: 0.4 },
  { id: 11, x: 55, y: 75, duration: 3.8, delay: 1.1 },
];

export default function AnimatedCover({ category, title }: AnimatedCoverProps) {
  const styles = categoryStyles[category];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(135deg, ${styles.gradient[0]} 0%, ${styles.gradient[1]} 50%, ${styles.gradient[2]} 100%)`,
            `linear-gradient(225deg, ${styles.gradient[1]} 0%, ${styles.gradient[2]} 50%, ${styles.gradient[0]} 100%)`,
            `linear-gradient(315deg, ${styles.gradient[2]} 0%, ${styles.gradient[0]} 50%, ${styles.gradient[1]} 100%)`,
            `linear-gradient(135deg, ${styles.gradient[0]} 0%, ${styles.gradient[1]} 50%, ${styles.gradient[2]} 100%)`,
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating particles */}
      {particleData.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: styles.accent,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Pulsing overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 0%, ${styles.gradient[0]}40 100%)`,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Title with glow effect */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <motion.h3
          className="text-white font-serif text-2xl font-bold text-center drop-shadow-2xl"
          style={{
            textShadow: `0 0 20px ${styles.accent}, 0 0 40px ${styles.accent}`,
          }}
          animate={{
            textShadow: [
              `0 0 20px ${styles.accent}, 0 0 40px ${styles.accent}`,
              `0 0 30px ${styles.accent}, 0 0 60px ${styles.accent}`,
              `0 0 20px ${styles.accent}, 0 0 40px ${styles.accent}`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {title}
        </motion.h3>
      </div>

      {/* Corner accents */}
      <motion.div
        className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 opacity-50"
        style={{ borderColor: styles.accent }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 opacity-50"
        style={{ borderColor: styles.accent }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1.5,
        }}
      />
    </div>
  );
}
