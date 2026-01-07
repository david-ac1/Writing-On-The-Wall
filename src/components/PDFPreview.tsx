'use client';

import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFPreviewProps {
  filePath: string;
}

export default function PDFPreview({ filePath }: PDFPreviewProps) {
  return (
    <Document 
      file={filePath} 
      loading={
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-500 text-xs">Loading...</span>
        </div>
      }
      error={
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-600 text-xs">Preview unavailable</span>
        </div>
      }
      options={{
        cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
        cMapPacked: true,
      }}
    >
      <Page 
        pageNumber={1} 
        width={256} 
        height={320}
        renderTextLayer={false} 
        renderAnnotationLayer={false}
        loading={
          <div className="w-64 h-80 bg-gray-100 animate-pulse" />
        }
      />
    </Document>
  );
}

