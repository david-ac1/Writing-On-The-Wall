import { motion } from 'framer-motion';

export default function MusicalNotes() {
  const notes = ['♪', '♫', '♩', '♬'];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {notes.map((note, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl text-blue-600"
          initial={{ y: 0, opacity: 0, x: `${20 + i * 20}%` }}
          animate={{
            y: [-20, -60, -100],
            opacity: [0, 1, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
          style={{ top: '50%' }}
        >
          {note}
        </motion.div>
      ))}
    </div>
  );
}
