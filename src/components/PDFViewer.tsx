"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Spinner } from "react-bootstrap";

// Configure worker for PDF.js (using Unpkg CDN for zero-config reliability in Next.js)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Keep PDF width responsive
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div 
      ref={containerRef}
      className="d-flex flex-column align-items-center w-100 pdf-viewer-container" 
      style={{ maxHeight: "75vh", overflowY: "auto", overflowX: "hidden", backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "8px" }}
    >
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="py-5 text-center text-secondary w-100 d-flex flex-column align-items-center justify-content-center">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p>Mempersiapkan Dokumen...</p>
          </div>
        }
        error={
          <div className="p-5 text-center text-danger">
            Gagal memuat PDF. Silakan gunakan tombol Download di bawah.
          </div>
        }
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div key={`page_${index + 1}`} className="mb-3 shadow-sm bg-white" style={{ display: 'flex', justifyContent: 'center' }}>
            <Page 
              pageNumber={index + 1} 
              width={containerWidth ? Math.min(containerWidth - 30, 800) : undefined}
              renderAnnotationLayer={true} 
              renderTextLayer={true} 
            />
          </div>
        ))}
      </Document>
      
      {/* Overriding some default react-pdf styles for better integration */}
      <style>{`
        .react-pdf__Page__canvas {
          margin: 0 auto;
        }
        .react-pdf__Page__textContent {
          /* Make text layer selectable but invisible */
          opacity: 0.2; 
        }
      `}</style>
    </div>
  );
}
