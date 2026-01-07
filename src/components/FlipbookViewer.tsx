'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Document as WorkDocument } from '@/types';
import dynamic from 'next/dynamic';

// Dynamically import react-pdf to avoid SSR issues
const PDFViewer = dynamic(() => import('./PDFViewer'), { ssr: false });

interface FlipbookViewerProps {
  document: WorkDocument | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FlipbookViewer({ document, isOpen, onClose }: FlipbookViewerProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      if (typeof window !== 'undefined') {
        window.document.body.style.overflow = 'hidden';
      }
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      if (typeof window !== 'undefined') {
        window.document.body.style.overflow = 'auto';
      }
    };
  }, [isOpen, onClose]);

  if (!document) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="relative w-full h-full max-w-7xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black to-transparent p-4 flex items-center justify-between">
                <h2 className="text-white font-serif text-2xl font-bold">
                  {document.title}
                </h2>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10"
                  aria-label="Close viewer"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="w-full h-full pt-16">
                {document.type === 'pdf' && (
                  <PDFViewer filePath={document.filePath} />
                )}
                {document.type === 'markdown' && (
                  <div className="p-8 overflow-auto h-full">
                    <p className="text-gray-600">Markdown viewer coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
