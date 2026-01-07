'use client';

import { motion } from 'framer-motion';
import { Document as DocumentType } from '@/types';
import { FileText, ExternalLink } from 'lucide-react';

interface DocumentCardProps {
  document: DocumentType;
  onClick: () => void;
}

export default function DocumentCard({ document, onClick }: DocumentCardProps) {
  const handleClick = () => {
    // Open PDF in new tab using native browser viewer
    window.open(document.filePath, '_blank');
  };

  return (
    <motion.div
      className="cursor-pointer group"
      whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={handleClick}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="relative w-64 h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-shadow group-hover:shadow-2xl flex flex-col items-center justify-center p-6">
        {/* Document Icon */}
        <div className="mb-4">
          <FileText size={64} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
        
        {/* Title */}
        <h3 className="text-gray-900 font-serif text-lg font-bold text-center mb-2 line-clamp-3">
          {document.title}
        </h3>
        
        {/* Description */}
        {document.description && (
          <p className="text-gray-600 text-sm text-center line-clamp-2 mb-4">
            {document.description}
          </p>
        )}
        
        {/* Open Indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-blue-600 text-sm font-medium flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
            Open PDF <ExternalLink size={16} />
          </span>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm">
          <span className="text-xs font-mono text-gray-600 uppercase">
            {document.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
