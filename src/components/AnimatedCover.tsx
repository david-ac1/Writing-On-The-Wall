'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedCoverProps {
  category: 'Systems' | 'Sovereignty' | 'Witness';
  title: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
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

export default function AnimatedCover({ category, title }: AnimatedCoverProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const styles = categoryStyles[category];

  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

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
      {particles.map((particle) => (
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
          }}particle.duration,
            repeat: Infinity,
            delay: particle.delaym() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
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
