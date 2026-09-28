'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Document as DocumentType } from '@/types';
import { ExternalLink, FileText } from 'lucide-react';
import Image from 'next/image';
import FlipbookViewer from './FlipbookViewer';

interface DocumentCardProps {
  document: DocumentType;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [hasCoverError, setHasCoverError] = useState(false);

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
          {/* Static first-page screenshot; PDF.js only runs when the card opens. */}
          {hasCoverError ? (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-200 px-6 text-center">
              <FileText size={56} strokeWidth={1.25} className="mb-6 text-[#4169E1]/70" />
              <span className="font-serif text-2xl font-bold text-gray-800">{document.title}</span>
              <span className="mt-3 text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
                {document.category}
              </span>
            </div>
          ) : (
            <Image
              src={document.coverImage}
              alt={`First page of ${document.title}`}
              fill
              sizes="256px"
              className="object-contain bg-white"
              onError={() => setHasCoverError(true)}
            />
          )}
          
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
