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

  const handleLoadError = (error: Error) => {
    console.error('PDF preview load error:', error);
    setHasError(true);
  };

  // Fallback UI for errors
  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
        <FileText size={48} className="text-gray-400 mb-2" />
        <span className="text-gray-600 text-xs text-center">Preview unavailable</span>
      </div>
    );
  }

  return (
    <Document 
      file={filePath} 
      onLoadError={handleLoadError}
      loading={
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-500 text-xs">Loading...</span>
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
          <div className="w-64 h-80 bg-gray-200 flex flex-col items-center justify-center">
            <FileText size={32} className="text-gray-400 mb-2" />
            <span className="text-gray-600 text-xs">Cannot render</span>
          </div>
        }
        onRenderError={(error) => {
          console.error('Page render error:', error);
          setHasError(true);
        }}
      />
    </Document>
  );
}

