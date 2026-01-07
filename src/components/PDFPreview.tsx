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
      loading={<div className="w-full h-full bg-gray-100 animate-pulse" />}
    >
      <Page 
        pageNumber={1} 
        width={256} 
        renderTextLayer={false} 
        renderAnnotationLayer={false} 
      />
    </Document>
  );
}
