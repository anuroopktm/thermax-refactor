import { ScrollArea } from "@/components/ui/scroll-area";
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
    <ScrollArea className="flex-1 h-full">
      <div className="flex justify-center p-8 min-h-full min-w-full">
        <div className="bg-card shadow-2xl border h-fit w-fit">
          <Document
            file={file}
            onLoadSuccess={onLoadSuccess}
            onLoadError={(err) => console.error(err)}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              className="max-w-none"
            />
          </Document>
        </div>
      </div>
    </ScrollArea>
  );
}
