'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import DocumentCard from './DocumentCard';
import { Document } from '@/types';

interface WorksDrawerProps {
  open: boolean;
  title: string;
  eyebrow: string;
  description: string;
  works: Document[];
  accentClassName: string;
  onClose: () => void;
}

export default function WorksDrawer({
  open,
  title,
  eyebrow,
  description,
  works,
  accentClassName,
  onClose,
}: WorksDrawerProps) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close drawer"
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 28 }}
            className="relative z-10 w-full max-w-7xl rounded-t-[2rem] border border-[#4169E1]/10 bg-white/96 shadow-[0_-20px_80px_rgba(26,26,26,0.14)] backdrop-blur-md"
          >
            <div className="flex items-start justify-between gap-6 border-b border-[#4169E1]/10 px-6 pt-6 pb-4 sm:px-8">
              <div className="max-w-3xl">
                <p className={`text-xs uppercase tracking-[0.45em] font-mono mb-3 ${accentClassName}`}>
                  {eyebrow}
                </p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-slate mb-2">
                  {title}
                </h2>
                <p className="text-sm md:text-base text-gray-600 font-mono">
                  {description}
                </p>
              </div>

              <button
                type="button"
                aria-label={`Close ${title} drawer`}
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#4169E1]/10 bg-[#F9F9F9] text-gray-700 transition-transform hover:scale-105 hover:border-[#4169E1]/25 hover:text-[#4169E1]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[72vh] overflow-y-scroll px-6 py-6 sm:px-8 sm:py-8 [scrollbar-gutter:stable]">
              {works.length === 0 ? (
                <div className="py-16 text-center text-gray-500 font-mono">
                  No works in this section yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
                  {works.map(work => (
                    <DocumentCard key={work.id} document={work} />
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}