'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Document as DocumentType } from '@/types';
import { ExternalLink } from 'lucide-react';
import FlipbookViewer from './FlipbookViewer';
import dynamic from 'next/dynamic';

const PDFPreview = dynamic(() => import('./PDFPreview'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
      <span className="text-gray-400 text-xs">Loading...</span>
    </div>
  ),
});

interface DocumentCardProps {
  document: DocumentType;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleClick = () => {
    setIsViewerOpen(true);
  };

  return (
    <>
      <motion.div
        className="cursor-pointer group"
        whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={handleClick}
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      >
        <div className="relative w-64 h-80 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-shadow group-hover:shadow-2xl">
          {/* Preview using react-pdf for consistency with the modal viewer */}
          <div className="w-full h-full pointer-events-none">
            <PDFPreview filePath={document.filePath} />
          </div>
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          
          {/* Open Indicator on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-sm font-medium flex items-center gap-2 bg-black bg-opacity-60 px-4 py-2 rounded-full">
              Open PDF <ExternalLink size={16} />
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
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-mono text-gray-600 uppercase">
              {document.category}
            </span>
          </div>
        </div>
      </motion.div>

      <FlipbookViewer
        document={document}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </>
  );
}
