'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
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
      className="text-lg md:text-xl leading-relaxed mb-6 text-gray-700 font-mono"
    >
      {children}
    </motion.p>
  );
}

export default function AboutPage() {
  const [showLagos, setShowLagos] = useState(false);
  const [showAbuja, setShowAbuja] = useState(false);
  const [showNigeria, setShowNigeria] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
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
          ← ÈBỤKÀ&apos;S
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

          {/* Main Content */}
          <div className="space-y-8">
            <AnimatedParagraph delay={0.1}>
              Hey, I&apos;m Ebuka.
            </AnimatedParagraph>

            <AnimatedParagraph delay={0.2}>
              Born to be a writer. Forced to code. Then I realized I can do both.
            </AnimatedParagraph>

            <AnimatedParagraph delay={0.3}>
              I was born in{' '}
              <span 
                className="relative inline-block cursor-pointer font-bold text-blue-600 hover:text-blue-800 transition-colors"
                onMouseEnter={() => setShowLagos(true)}
                onMouseLeave={() => setShowLagos(false)}
              >
                Lagos
                {showLagos && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute -top-40 left-1/2 transform -translate-x-1/2 z-50 bg-white p-3 rounded-lg shadow-xl border-2 border-gray-200"
                  >
                    <Image
                      src="/lagos.png"
                      alt="Lagos skyline"
                      width={350}
                      height={140}
                      className="rounded"
                    />
                  </motion.div>
                )}
              </span>
              , live in{' '}
              <span 
                className="relative inline-block cursor-pointer font-bold text-green-700 hover:text-green-900 transition-colors"
                onMouseEnter={() => setShowAbuja(true)}
                onMouseLeave={() => setShowAbuja(false)}
              >
                Abuja
                {showAbuja && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute -top-72 left-1/2 transform -translate-x-1/2 z-50 bg-white p-3 rounded-lg shadow-xl border-2 border-gray-200"
                  >
                    <Image
                      src="/abuja.png"
                      alt="Abuja City Gate"
                      width={200}
                      height={280}
                      className="rounded"
                    />
                  </motion.div>
                )}
              </span>
              , and was raised in{' '}
              <span 
                className="relative inline-block cursor-pointer font-bold text-green-600 hover:text-green-800 transition-colors"
                onMouseEnter={() => setShowNigeria(true)}
                onMouseLeave={() => setShowNigeria(false)}
              >
                Nigeria
                {showNigeria && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-50 bg-white p-2 rounded-lg shadow-xl border-2 border-gray-200"
                  >
                    <Image
                      src="/nigeria.png"
                      alt="Nigerian flag"
                      width={150}
                      height={100}
                      className="rounded"
                    />
                  </motion.div>
                )}
              </span>
              .
            </AnimatedParagraph>

            <AnimatedParagraph delay={0.4}>
              <span className="font-bold">Favorite writers:</span> Rick Riordan, James Baldwin, Ocean Vuong, and Roald Dahl.
            </AnimatedParagraph>

            <AnimatedParagraph delay={0.5}>
              If this isn&apos;t enough to hire me, I{' '}
              <span 
                className="relative inline-block cursor-pointer font-bold text-purple-600 hover:text-purple-800 transition-colors"
                onMouseEnter={() => setShowNotes(true)}
                onMouseLeave={() => setShowNotes(false)}
              >
                sing
                {showNotes && <MusicalNotes />}
              </span>
              . Really well. And I can do accents.
            </AnimatedParagraph>
          </div>
        </div>
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
          {/* Social Links */}
          <div className="flex justify-center gap-8 flex-wrap mb-8">
            {[
              { Icon: Github, href: 'https://github.com/david-ac1', label: 'GitHub' },
              { Icon: Linkedin, href: 'https://linkedin.com/in/davidachibiri1', label: 'LinkedIn' },
              { Icon: Mail, href: 'mailto:davidachibiri8@gmail.com', label: 'Email' },
              { Icon: Instagram, href: 'https://instagram.com/comme_c_ebuka', label: 'Instagram' },
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
          
          <p 
            className="text-base text-gray-600 font-mono"
          >
            Click the links if you want to say hi, collaborate, have coffee, or you know, hire me.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
