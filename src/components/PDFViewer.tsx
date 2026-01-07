'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface PDFViewerProps {
  filePath: string;
}

export default function PDFViewer({ filePath }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && pageNumber > 1) {
        setPageNumber(prev => prev - 1);
      } else if (e.key === 'ArrowRight' && pageNumber < numPages) {
        setPageNumber(prev => prev + 1);
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageNumber, numPages]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handlePrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div 
      className={`flex flex-col items-center justify-start w-full h-full bg-gray-50 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
      role="region"
      aria-label="PDF Document Viewer"
    >
      {/* Enhanced Toolbar */}
      <div className="sticky top-0 z-30 w-full bg-white border-b border-gray-300 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          {/* Page Navigation */}
          <button
            onClick={handlePrevPage}
            disabled={pageNumber <= 1}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            type="button"
            aria-label="Previous page"
            title="Previous page (← Arrow Left)"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md">
            <span className="text-sm font-mono" aria-live="polite" aria-atomic="true">
              Page <strong>{pageNumber}</strong> of <strong>{numPages}</strong>
            </span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={pageNumber >= numPages}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            type="button"
            aria-label="Next page"
            title="Next page (→ Arrow Right)"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
            type="button"
            aria-label="Zoom out"
            title="Zoom out"
          >
            <ZoomOut size={18} />
          </button>
          
          <span className="text-sm font-mono px-2" aria-live="polite">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
            type="button"
            aria-label="Zoom in"
            title="Zoom in"
          >
            <ZoomIn size={18} />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors ml-2"
            type="button"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            title="Toggle fullscreen (F key)"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* PDF Container with better scrolling */}
      <div 
        className="flex-1 w-full overflow-auto p-8 flex items-start justify-center"
        style={{ backgroundColor: '#f8f8f8' }}
        tabIndex={0}
        role="document"
        aria-label="Document content"
      >
        <Document
          file={filePath}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center h-64" role="status" aria-live="polite">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-mono text-sm">Loading PDF...</p>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center h-64 text-red-600" role="alert">
              <p className="font-mono text-sm">Failed to load PDF</p>
              <p className="text-xs text-gray-600 mt-2">Please try refreshing the page</p>
            </div>
          }
          options={{
            cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
            cMapPacked: true,
            standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
          }}
        >
          <div className="shadow-2xl bg-white">
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              loading={
                <div className="w-full h-96 bg-gray-100 animate-pulse flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Rendering page...</span>
                </div>
              }
            />
          </div>
        </Document>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="sticky bottom-0 w-full bg-gray-100 border-t border-gray-300 px-4 py-2 text-xs text-gray-600 text-center font-mono">
        <span className="sr-only">Keyboard shortcuts:</span>
        <span aria-hidden="true">← → to navigate pages • F for fullscreen • Scroll to view document</span>
      </div>
    </div>
  );
}
