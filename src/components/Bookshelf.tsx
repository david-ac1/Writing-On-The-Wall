'use client';

import { useState } from 'react';
import Link from 'next/link';
import DocumentCard from './DocumentCard';
import { Document, Category } from '@/types';

interface BookshelfProps {
  works: Document[];
}

const categories: { name: Category; description: string }[] = [
  { name: 'Systems', description: 'Technical explorations and proof of work' },
  { name: 'Sovereignty', description: 'Policy frameworks and digital autonomy' },
  { name: 'Witness', description: 'Poetry, narrative, and human experience' },
];

export default function Bookshelf({ works }: BookshelfProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredWorks = selectedCategory
    ? works.filter(work => work.category === selectedCategory)
    : works;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <Link 
            href="/about"
            className="inline-block hover:opacity-70 transition-opacity"
          >
            <p className="text-gray-700 font-bold text-base tracking-widest uppercase mb-3" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.25em' }}>
              ÈBỤKÀ&apos;S
            </p>
          </Link>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-deep-slate mb-4">
            Writing on the Wall
          </h1>
          <p className="text-lg text-gray-600 font-mono">
            A digital archive of technical work, policy frameworks, and narrative explorations
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 rounded-full font-mono text-sm transition-all ${
              selectedCategory === null
                ? 'bg-deep-slate text-white'
                : 'bg-white text-deep-slate border border-gray-300 hover:border-deep-slate'
            }`}
          >
            All Works
          </button>
          {categories.map(({ name, description }) => (
            <button
              key={name}
              onClick={() => setSelectedCategory(name)}
              className={`px-6 py-3 rounded-full font-mono text-sm transition-all ${
                selectedCategory === name
                  ? 'bg-deep-slate text-white'
                  : 'bg-white text-deep-slate border border-gray-300 hover:border-deep-slate'
              }`}
              title={description}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Category Sections */}
        {selectedCategory ? (
          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-deep-slate mb-2">
              {selectedCategory}
            </h2>
            <p className="text-gray-600 mb-8 font-mono text-sm">
              {categories.find(c => c.name === selectedCategory)?.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {filteredWorks.map(work => (
                <DocumentCard
                  key={work.id}
                  document={work}
                />
              ))}
            </div>
          </section>
        ) : (
          categories.map(({ name, description }) => {
            const categoryWorks = works.filter(work => work.category === name);
            if (categoryWorks.length === 0) return null;
            
            return (
              <section key={name} className="mb-16">
                <h2 className="text-3xl font-serif font-bold text-deep-slate mb-2">
                  {name}
                </h2>
                <p className="text-gray-600 mb-8 font-mono text-sm">{description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                  {categoryWorks.map(work => (
                    <DocumentCard
                      key={work.id}
                      document={work}
                    />
                  ))}
                </div>
              </section>
            );
          })
        )}

        {filteredWorks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-mono">No documents in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
