'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import AbujaGate from '@/components/AbujaGate';
import MusicalNotes from '@/components/MusicalNotes';

function AnimatedParagraph({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="text-lg md:text-xl leading-relaxed mb-6 text-gray-700"
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {children}
    </motion.p>
  );
}

export default function AboutPage() {
  const [showGate, setShowGate] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFEF9] relative overflow-x-hidden">
      {/* Back to Home Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link
          href="/"
          className="text-gray-700 hover:text-gray-900 font-bold tracking-widest uppercase transition-colors"
          style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.25em' }}
        >
          ÈBỤKÀ&apos;S
        </Link>
      </motion.div>

      {/* Hero Section with Avatar */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Avatar Animation */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20,
              duration: 1 
            }}
            className="flex justify-center mb-12"
          >
            <div className="relative w-64 h-64">
              <Image
                src="/avatar.png"
                alt="Ebuka's avatar"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Handwritten-style heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl md:text-6xl text-center mb-16 text-gray-900"
            style={{ 
              fontFamily: "'Comic Sans MS', 'Brush Script MT', cursive",
              fontWeight: 'bold'
            }}
          >
            Hey, I&apos;m Ebuka
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <AnimatedParagraph delay={0.1}>
          I&apos;m a technologist, writer, and builder fascinated by the intersection of policy, 
          infrastructure, and human stories.
        </AnimatedParagraph>

        <AnimatedParagraph delay={0.2}>
          Originally from{' '}
          <span 
            className="relative inline-block cursor-pointer font-semibold text-green-700 hover:text-green-900 transition-colors"
            onMouseEnter={() => setShowGate(true)}
            onMouseLeave={() => setShowGate(false)}
          >
            Abuja, Nigeria
            {showGate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <AbujaGate />
              </motion.div>
            )}
          </span>
          , I spend my time building systems that blend technical rigor with poetic thinking.
        </AnimatedParagraph>

        <AnimatedParagraph delay={0.3}>
          My work spans technical writing, policy frameworks, and creative explorations—
          everything from blockchain governance to narrative storytelling.
        </AnimatedParagraph>

        <AnimatedParagraph delay={0.4}>
          When I&apos;m not writing or coding, you&apos;ll find me{' '}
          <span 
            className="relative inline-block cursor-pointer font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            onMouseEnter={() => setShowNotes(true)}
            onMouseLeave={() => setShowNotes(false)}
          >
            singing along to alt-rock
            {showNotes && <MusicalNotes />}
          </span>
          , exploring cities on foot, or deep in conversation about systems, sovereignty, and the future.
        </AnimatedParagraph>

        <AnimatedParagraph delay={0.5}>
          This site is my digital garden—a collection of technical work, policy frameworks, 
          and narrative experiments. It&apos;s a space for thinking out loud, building in public, 
          and connecting with people who care about these ideas.
        </AnimatedParagraph>
      </section>

      {/* Contact Section */}
      <section className="max-w-3xl mx-auto px-6 py-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 
            className="text-3xl md:text-4xl mb-8 text-gray-900"
            style={{ 
              fontFamily: "'Comic Sans MS', 'Brush Script MT', cursive",
              fontWeight: 'bold'
            }}
          >
            Let&apos;s Connect
          </h2>
          
          <p 
            className="text-lg md:text-xl mb-12 text-gray-700"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Click the links if you want to say hi, collaborate, have coffee, or you know, hire me.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-8 flex-wrap">
            {[
              { Icon: Github, href: 'https://github.com/david-ac1', label: 'GitHub' },
              { Icon: Linkedin, href: 'https://linkedin.com/in/ebuka', label: 'LinkedIn' },
              { Icon: Mail, href: 'mailto:hello@ebuka.com', label: 'Email' },
              { Icon: Instagram, href: 'https://instagram.com/ebuka', label: 'Instagram' },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-4 bg-white rounded-full border-2 border-gray-300 group-hover:border-gray-900 transition-colors shadow-sm">
                  <Icon size={28} className="text-gray-700 group-hover:text-gray-900 transition-colors" />
                </div>
                <span className="text-sm font-mono text-gray-600 group-hover:text-gray-900 transition-colors">
                  {label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer Sketch Doodle */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        className="fixed bottom-8 right-8 pointer-events-none"
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <path
            d="M20,50 Q35,20 50,50 T80,50"
            stroke="#1A1A1A"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="3" fill="#1A1A1A" />
        </svg>
      </motion.div>
    </div>
  );
}
