'use client';

import { motion } from 'framer-motion';
import { Document } from '@/types';
import UniqueAnimatedCover from './UniqueAnimatedCover';

interface DocumentCardProps {
  document: Document;
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
        {/* Unique Animated Cover */}
        <div className="relative w-full h-full">
          <UniqueAnimatedCover 
            documentId={document.id} 
            title={document.title}
            category={document.category}
          />
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end justify-center pb-6">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-sm font-mono px-4 py-2 bg-black bg-opacity-50 rounded">
                Open
              </span>
            </div>
          </div>
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
