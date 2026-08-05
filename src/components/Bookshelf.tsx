'use client';

import { motion } from 'framer-motion';
import DocumentCard from './DocumentCard';
import { Document } from '@/types';

interface BookshelfProps {
  works: Document[];
}

export default function Bookshelf({ works }: BookshelfProps) {
  return (
    <div className="min-h-screen py-14 px-4 sm:px-6 lg:px-8 pb-40">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-14">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-serif font-bold text-deep-slate mb-4"
          >
            Writing on the Wall
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-gray-600 font-mono max-w-3xl mx-auto"
          >
            Poems, stories, and narrative fragments.
          </motion.p>
        </header>

        {works.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 font-mono">No narrative works yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {works.map(work => (
              <DocumentCard key={work.id} document={work} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
