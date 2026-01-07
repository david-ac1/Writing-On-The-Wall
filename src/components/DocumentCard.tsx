'use client';

import { motion } from 'framer-motion';
import { Document as DocumentType } from '@/types';
import dynamic from 'next/dynamic';
import { PDFErrorBoundary } from './PDFErrorBoundary';
import { FileText } from 'lucide-react';

const PDFPreview = dynamic<{ filePath: string }>(
  () => import('./PDFPreview').then(mod => mod.default), 
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
        <span className="text-gray-500 text-xs">Loading...</span>
      </div>
    )
  }
);

interface DocumentCardProps {
  document: DocumentType;
  onClick: () => void;
}

export default function DocumentCard({ document, onClick }: DocumentCardProps) {
  return (
    <motion.div
      className="cursor-pointer group"
      whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="relative w-64 h-80 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-shadow group-hover:shadow-2xl">
        {/* PDF First Page as Cover with Error Boundary */}
        <PDFErrorBoundary
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
              <FileText size={48} className="text-gray-400 mb-2" />
              <span className="text-gray-600 text-xs text-center">Preview unavailable</span>
            </div>
          }
        >
          <PDFPreview filePath={document.filePath} />
        </PDFErrorBoundary>
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="text-white text-sm font-mono px-4 py-2 bg-black bg-opacity-50 rounded">
            Open
          </span>
        </div>
        
        {/* Title Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white font-serif text-lg font-bold line-clamp-2">
            {document.title}
          </h3>
          {document.description && (
            <p className="text-gray-300 text-xs mt-1 line-clamp-1">
              {document.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
