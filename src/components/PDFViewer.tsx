'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, AlertCircle } from 'lucide-react';

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
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (hasError) return; // Disable navigation when error occurs
      
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
  }, [pageNumber, numPages, hasError]);

  useEffect(() => {
    // Reset states when filePath changes
    setHasError(false);
    setIsLoading(true);
    setPageNumber(1);
  }, [filePath]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    try {
      setNumPages(numPages);
      setIsLoading(false);
      setHasError(false);
    } catch (error) {
      console.error('Error setting document state:', error);
      setHasError(true);
      setIsLoading(false);
    }
  }

  function onDocumentLoadError(error: Error) {
    console.error('PDF load error:', error);
    setHasError(true);
    setIsLoading(false);
  }

  const handlePrevPage = () => {
    if (hasError || pageNumber <= 1) return;
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (hasError || pageNumber >= numPages) return;
    setPageNumber(pageNumber + 1);
  };

  const handleZoomIn = () => {
    if (hasError) return;
    setScale(prev => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    if (hasError) return;
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setPageNumber(1);
    // Force component re-render by updating key
    window.location.reload();
  };

  // Error state UI
  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] bg-gray-50 p-8">
        <div className="max-w-md text-center">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load PDF</h3>
          <p className="text-gray-600 mb-6">
            The document could not be loaded. This might be due to network issues, browser compatibility, or file corruption.
          </p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            type="button"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

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
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex flex-col items-center justify-center h-64" role="status" aria-live="polite">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-mono text-sm">Loading PDF...</p>
              <p className="text-gray-500 font-mono text-xs mt-2">This may take a moment</p>
            </div>
          }
          error={null}
          options={{
            cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
            cMapPacked: true,
            standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
            disableStream: true,
            disableAutoFetch: true,
            isEvalSupported: false,
            useSystemFonts: true,
          }}
        >
          <div className="shadow-2xl bg-white">
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              renderMode="canvas"
              loading={
                <div className="w-full h-96 bg-gray-100 animate-pulse flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Rendering page...</span>
                </div> {pageNumber}...</span>
                </div>
              }
              error={
                <div className="w-full h-96 bg-red-50 flex flex-col items-center justify-center">
                  <AlertCircle size={32} className="text-red-500 mb-2" />
                  <span className="text-red-600 text-sm">Page rendering failed</span>
                </div>
              }
              onRenderError={(error) => {
                console.error('Page render error:', error);
              }
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
