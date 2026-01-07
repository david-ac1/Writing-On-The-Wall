'use client';

import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  filePath: string;
}

export default function PDFViewer({ filePath }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-1 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full bg-gray-800 animate-pulse w-1/2"></div>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-auto flex items-center justify-center w-full">
        <Document
          file={filePath}
          onLoadSuccess={onDocumentLoadSuccess}
          loading=""
        >
          <Page 
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="shadow-2xl"
          />
        </Document>
      </div>

      {/* Navigation Controls */}
      {numPages > 0 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-full flex items-center gap-4 font-mono">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className="text-sm">
            {pageNumber} / {numPages}
          </span>
          
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
