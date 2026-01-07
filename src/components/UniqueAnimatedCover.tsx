'use client';

import { motion } from 'framer-motion';

interface UniqueAnimatedCoverProps {
  documentId: string;
  title: string;
  category: 'Systems' | 'Sovereignty' | 'Witness';
}

const coverDesigns = {
  // Systems covers
  'rust-memory-safety': {
    gradient: ['#7c2d12', '#ea580c', '#fb923c'],
    particles: 'circuit',
    pattern: 'memory-blocks',
    glow: '#fdba74',
  },
  'gemini-optimization': {
    gradient: ['#1e3a8a', '#3b82f6', '#60a5fa'],
    particles: 'stars',
    pattern: 'neural-network',
    glow: '#93c5fd',
  },
  'health-tech-architecture': {
    gradient: ['#0c4a6e', '#0ea5e9', '#38bdf8'],
    particles: 'nodes',
    pattern: 'architecture-grid',
    glow: '#7dd3fc',
  },
  
  // Sovereignty covers
  'sustainability-competition': {
    gradient: ['#065f46', '#10b981', '#34d399'],
    particles: 'leaves',
    pattern: 'sustainability-wave',
    glow: '#6ee7b7',
  },
  'health-economics-africa': {
    gradient: ['#064e3b', '#059669', '#10b981'],
    particles: 'pulse',
    pattern: 'economic-flow',
    glow: '#6ee7b7',
  },
  'akinwade-foundation': {
    gradient: ['#134e4a', '#14b8a6', '#2dd4bf'],
    particles: 'growth',
    pattern: 'foundation-pillars',
    glow: '#5eead4',
  },
  
  // Witness covers
  'shot-glass': {
    gradient: ['#581c87', '#a855f7', '#c084fc'],
    particles: 'droplets',
    pattern: 'liquid-flow',
    glow: '#e9d5ff',
  },
  'after-the-end': {
    gradient: ['#4c0519', '#be123c', '#fb7185'],
    particles: 'embers',
    pattern: 'horizon',
    glow: '#fda4af',
  },
  'climate-future-leaders': {
    gradient: ['#14532d', '#16a34a', '#4ade80'],
    particles: 'seeds',
    pattern: 'earth-grid',
    glow: '#86efac',
  },
  'eulogy-straight-man': {
    gradient: ['#312e81', '#6366f1', '#818cf8'],
    particles: 'memories',
    pattern: 'portrait-frame',
    glow: '#c7d2fe',
  },
  'evaristo-poetry': {
    gradient: ['#7c2d12', '#dc2626', '#f59e0b'],
    particles: 'words',
    pattern: 'manuscript',
    glow: '#fcd34d',
  },
  'martini': {
    gradient: ['#1e1b4b', '#7c3aed', '#a78bfa'],
    particles: 'bubbles',
    pattern: 'glass-refraction',
    glow: '#ddd6fe',
  },
  'prince-thousand-enemies': {
    gradient: ['#450a0a', '#991b1b', '#dc2626'],
    particles: 'warriors',
    pattern: 'battle-lines',
    glow: '#fca5a5',
  },
};

export default function UniqueAnimatedCover({ documentId, title }: UniqueAnimatedCoverProps) {
  const design = coverDesigns[documentId as keyof typeof coverDesigns] || coverDesigns['rust-memory-safety'];
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Dynamic gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(135deg, ${design.gradient[0]} 0%, ${design.gradient[1]} 50%, ${design.gradient[2]} 100%)`,
            `linear-gradient(225deg, ${design.gradient[1]} 0%, ${design.gradient[2]} 50%, ${design.gradient[0]} 100%)`,
            `linear-gradient(315deg, ${design.gradient[2]} 0%, ${design.gradient[0]} 50%, ${design.gradient[1]} 100%)`,
            `linear-gradient(45deg, ${design.gradient[0]} 0%, ${design.gradient[1]} 50%, ${design.gradient[2]} 100%)`,
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Pattern overlay based on document type */}
      <PatternOverlay pattern={design.pattern} color={design.glow} />

      {/* Animated particles specific to content */}
      <ParticleSystem type={design.particles} color={design.glow} />

      {/* Radial pulse effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 0%, ${design.gradient[0]}60 100%)`,
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Title with enhanced glow */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,            repeatType: 'loop',            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          <motion.h3
            className="text-white font-serif text-2xl font-bold text-center drop-shadow-2xl relative z-10"
            style={{
              textShadow: `0 0 30px ${design.glow}, 0 0 60px ${design.glow}, 0 2px 4px rgba(0,0,0,0.5)`,
            }}
            animate={{
              textShadow: [
                `0 0 30px ${design.glow}, 0 0 60px ${design.glow}, 0 2px 4px rgba(0,0,0,0.5)`,
                `0 0 40px ${design.glow}, 0 0 80px ${design.glow}, 0 2px 4px rgba(0,0,0,0.5)`,
                `0 0 30px ${design.glow}, 0 0 60px ${design.glow}, 0 2px 4px rgba(0,0,0,0.5)`,
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
          {/* Title backdrop blur */}
          <div className="absolute inset-0 bg-black opacity-20 blur-xl -z-10 scale-110" />
        </motion.div>
      </div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-0 left-0 w-24 h-24"
        style={{
          borderLeft: `3px solid ${design.glow}`,
          borderTop: `3px solid ${design.glow}`,
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-24 h-24"
        style={{
          borderRight: `3px solid ${design.glow}`,
          borderBottom: `3px solid ${design.glow}`,
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
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

function PatternOverlay({ pattern, color }: { pattern: string; color: string }) {
  const patterns: Record<string, React.ReactElement> = {
    'memory-blocks': (
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="memory-blocks" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect x="5" y="5" width="20" height="20" fill={color} />
            <rect x="35" y="35" width="20" height="20" fill={color} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#memory-blocks)" />
      </svg>
    ),
    'neural-network': (
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="neural" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="3" fill={color} />
            <circle cx="90" cy="50" r="3" fill={color} />
            <circle cx="50" cy="90" r="3" fill={color} />
            <line x1="10" y1="10" x2="90" y2="50" stroke={color} strokeWidth="1" />
            <line x1="90" y1="50" x2="50" y2="90" stroke={color} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural)" />
      </svg>
    ),
    'sustainability-wave': (
      <svg className="absolute inset-0 w-full h-full opacity-15">
        <motion.path
          d="M0,50 Q25,20 50,50 T100,50"
          stroke={color}
          strokeWidth="2"
          fill="none"
          animate={{ d: ['M0,50 Q25,20 50,50 T100,50', 'M0,50 Q25,80 50,50 T100,50', 'M0,50 Q25,20 50,50 T100,50'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    ),
    'liquid-flow': (
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.ellipse
          cx="50%"
          cy="50%"
          rx="40%"
          ry="30%"
          fill={color}
          animate={{ ry: ['30%', '35%', '30%'], rx: ['40%', '35%', '40%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    ),
    'manuscript': (
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="lines" x="0" y="0" width="100%" height="30" patternUnits="userSpaceOnUse">
            <line x1="10%" y1="15" x2="90%" y2="15" stroke={color} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines)" />
      </svg>
    ),
  };
  
  return patterns[pattern] || patterns['memory-blocks'];
}

function ParticleSystem({ type, color }: { type: string; color: string }) {
  const particleCount = 8;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: 10 + (i * 80) / particleCount,
    y: 15 + (i % 3) * 30,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: type === 'words' ? '4px' : '3px',
            height: type === 'words' ? '4px' : '3px',
            backgroundColor: color,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: type === 'embers' ? [-10, -40, -10] : type === 'droplets' ? [0, 40, 0] : [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: type === 'bubbles' ? [1, 1.8, 1] : [1, 1.5, 1],
            x: type === 'leaves' ? [-5, 5, -5] : 0,
          }}
          transition={{
            duration: 3 + (particle.id % 3),
            repeat: Infinity,
            delay: particle.id * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}
