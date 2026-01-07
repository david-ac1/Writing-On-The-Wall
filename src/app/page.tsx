'use client';

import { useState } from 'react';
import Bookshelf from '@/components/Bookshelf';
import FlipbookViewer from '@/components/FlipbookViewer';
import { works } from '@/lib/works';
import { Document } from '@/types';

export default function Home() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    // Keep selectedDocument for a brief moment to allow exit animation
    setTimeout(() => setSelectedDocument(null), 300);
  };

  return (
    <>
      <Bookshelf works={works} onDocumentClick={handleDocumentClick} />
      <FlipbookViewer
        document={selectedDocument}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
      />
    </>
  );
}
