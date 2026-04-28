import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PdfToolbarProps {
  pageNumber: number;
  numPages: number;
  setPageNumber: (updater: (p: number) => number) => void;
  scale: number;
  setScale: (updater: (s: number) => number) => void;
  setRotation: (updater: (r: number) => number) => void;
}

export function PdfToolbar({
  pageNumber,
  numPages,
  setPageNumber,
  scale,
  setScale,
  setRotation,
}: PdfToolbarProps) {
  return (
    <div className="absolute bottom-6 z-20 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/95 backdrop-blur-md px-3 py-2 rounded-xl border shadow-xl ring-1 ring-black/5">
      {/* Navigation */}
      <div className="flex items-center gap-1 pr-2 border-r">
        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer"
          onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
          disabled={pageNumber <= 1}
        >
          <ChevronLeft className="size-4" />
        </Button>

        <span className="text-xs font-bold tabular-nums min-w-12 text-center">
          {pageNumber} / {numPages}
        </span>

        <Button
          size="icon"
          variant="ghost"
          className="size-8 cursor-pointer"
          onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
          disabled={pageNumber >= numPages}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {/* Zoom */}
      <div className="flex items-center gap-1 px-1 border-r">
        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer"
          onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
        >
          <ZoomOut className="size-4" />
        </Button>

        <span className="text-xs font-bold min-w-10 text-center">
          {Math.round(scale * 100)}%
        </span>

        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer"
          onClick={() => setScale((s) => Math.min(3, s + 0.1))}
        >
          <ZoomIn className="size-4" />
        </Button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 pl-1">
        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer"
          onClick={() => setRotation((r) => (r + 90) % 360)}
        >
          <RotateCw className="size-4" />
        </Button>

        <Button size="icon" variant="ghost" className="cursor-pointer">
          <Download className="size-4" />
        </Button>

        <Button size="icon" variant="ghost" className="size-8 cursor-pointer">
          <Printer className="size-4" />
        </Button>
      </div>
    </div>
  );
}
