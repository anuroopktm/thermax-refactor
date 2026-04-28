import { Document, Page } from "react-pdf";

interface PdfDocumentViewerProps {
  file: string;
  pageNumber: number;
  scale: number;
  rotation: number;
  onLoadSuccess: ({ numPages }: { numPages: number }) => void;
}

export function PdfDocumentViewer({
  file,
  pageNumber,
  scale,
  rotation,
  onLoadSuccess,
}: PdfDocumentViewerProps) {
  return (
    <div className="flex-1 overflow-auto flex justify-center p-8">
      <div className="bg-white shadow-2xl border min-h-fit">
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          onLoadError={(err) => console.error(err)}
        >
          <Page pageNumber={pageNumber} width={600 * scale} rotate={rotation} />
        </Document>
      </div>
    </div>
  );
}
