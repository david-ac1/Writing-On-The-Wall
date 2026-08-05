'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Code2, BookOpenText } from 'lucide-react';
import { Document } from '@/types';
import WorksDrawer from './WorksDrawer';

interface PocketFooterProps {
  works: Document[];
}

export default function PocketFooter({ works }: PocketFooterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPocketOpen, setIsPocketOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<'technical' | 'academic' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 220;
      setIsVisible(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const technicalWorks = works.filter(work => work.category === 'Systems');
  const academicWorks = works.filter(work => work.category === 'Sovereignty');

  return (
    <>
      <footer
        className={`fixed bottom-20 left-1/2 z-40 -translate-x-1/2 transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="relative flex flex-col items-center gap-3">
          <AnimatePresence>
            {isPocketOpen && !activeDrawer && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute bottom-full mb-3 flex items-center gap-3 rounded-full border border-[#4169E1]/10 bg-white/90 px-3 py-2 shadow-xl backdrop-blur-md"
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveDrawer('technical');
                    setIsPocketOpen(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#4169E1]/15 bg-[#F9F9F9] px-4 py-2 text-xs font-mono uppercase tracking-[0.25em] text-[#4169E1] transition-transform hover:scale-105 hover:border-[#4169E1]/30"
                >
                  <Code2 size={14} />
                  Technical
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDrawer('academic');
                    setIsPocketOpen(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#4169E1]/15 bg-[#F9F9F9] px-4 py-2 text-xs font-mono uppercase tracking-[0.25em] text-[#4f6d8a] transition-transform hover:scale-105 hover:border-[#4169E1]/30"
                >
                  <BookOpenText size={14} />
                  Academic
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            aria-label="Open hidden sections"
            onClick={() => setIsPocketOpen(prev => !prev)}
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex h-4 w-14 items-center justify-center rounded-full border border-[#4169E1]/15 bg-white/80 shadow-sm backdrop-blur-sm transition-colors hover:border-[#4169E1]/25 hover:bg-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#4169E1]/80 transition-transform group-hover:scale-125" />
          </motion.button>
        </div>
      </footer>

      <WorksDrawer
        open={activeDrawer === 'technical'}
        title="Technical Works"
        eyebrow="System room"
        description="Engineering notes, systems thinking, and technical experiments live here."
        works={technicalWorks}
        accentClassName="text-blue-700"
        onClose={() => setActiveDrawer(null)}
      />

      <WorksDrawer
        open={activeDrawer === 'academic'}
        title="Academic Works"
        eyebrow="Archive room"
        description="Essays, policy work, and scholarly pieces live here."
        works={academicWorks}
        accentClassName="text-emerald-700"
        onClose={() => setActiveDrawer(null)}
      />
    </>
  );
}