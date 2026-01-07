'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileText } from 'lucide-react';

if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
}

interface PDFPreviewProps {
  filePath: string;
}

export default function PDFPreview({ filePath }: PDFPreviewProps) {
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleLoadError = (error: Error) => {
    console.warn('PDF preview load error (falling back to icon):', error);
    setHasError(true);
  };

  const handleLoadSuccess = () => {
    setHasError(false);
    setHasLoaded(true);
  };

  // Fallback UI for errors - simple and clean
  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
        <FileText size={64} className="text-gray-300 mb-3" />
        <span className="text-gray-500 text-sm font-mono">PDF Document</span>
      </div>
    );
  }

  return (
    <Document 
      file={filePath} 
      onLoadError={handleLoadError}
      onLoadSuccess={handleLoadSuccess}
      loading={
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-400 text-xs">Loading...</span>
        </div>
      }
      error={null}
      options={{
        cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/cmaps/`,
        cMapPacked: true,
        disableStream: true,
        disableAutoFetch: true,
        isEvalSupported: false,
        useSystemFonts: true,
        enableXfa: false,
      }}
    >
      <Page 
        pageNumber={1} 
        width={256} 
        height={320}
        renderTextLayer={false} 
        renderAnnotationLayer={false}
        renderMode="canvas"
        loading={
          <div className="w-64 h-80 bg-gray-100 animate-pulse" />
        }
        error={
          <div className="w-64 h-80 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center">
            <FileText size={48} className="text-gray-300 mb-2" />
            <span className="text-gray-500 text-xs">Preview unavailable</span>
          </div>
        }
        onRenderError={(error) => {
          console.warn('Page render error (using fallback):', error);
          setHasError(true);
        }}
      />
    </Document>
  );
}

