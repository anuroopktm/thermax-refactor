import { useState } from "react";
import { pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";

import { PdfToolbar } from "@/components/shared/ocr/pdf-toolbar";
import { PdfDocumentViewer } from "@/components/shared/ocr/pdf-document-viewer";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const SAMPLE_PDF =
  "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

export function MasterActivityModelPdfViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="relative flex flex-col h-full bg-muted/20 overflow-hidden">
      <PdfDocumentViewer
        file={SAMPLE_PDF}
        pageNumber={pageNumber}
        scale={scale}
        rotation={rotation}
        onLoadSuccess={onDocumentLoadSuccess}
      />

      <PdfToolbar
        pageNumber={pageNumber}
        numPages={numPages}
        setPageNumber={setPageNumber}
        scale={scale}
        setScale={setScale}
        setRotation={setRotation}
      />
    </div>
  );
}
