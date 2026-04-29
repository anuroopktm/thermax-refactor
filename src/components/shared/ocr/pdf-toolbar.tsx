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
import { Separator } from "@/components/ui/separator";

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
      <div className="flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer text-primary"
          onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
          disabled={pageNumber <= 1}
        >
          <ChevronLeft />
        </Button>

        <span className="text-xs font-bold tabular-nums min-w-12 text-center">
          {pageNumber} / {numPages}
        </span>

        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer text-primary"
          onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
          disabled={pageNumber >= numPages}
        >
          <ChevronRight />
        </Button>
      </div>

      <Separator orientation="vertical" className="bg-primary/50" />

      {/* Zoom */}
      <div className="flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer text-primary"
          onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
        >
          <ZoomOut />
        </Button>

        <span className="text-xs font-bold min-w-10 text-center">
          {Math.round(scale * 100)}%
        </span>

        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer text-primary"
          onClick={() => setScale((s) => Math.min(3, s + 0.1))}
        >
          <ZoomIn />
        </Button>
      </div>

      <Separator orientation="vertical" className="bg-primary/50" />

      {/* Actions */}
      <div className="flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer text-primary"
          onClick={() => setRotation((r) => (r + 90) % 360)}
        >
          <RotateCw />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer text-primary"
        >
          <Download />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer text-primary"
        >
          <Printer />
        </Button>
      </div>
    </div>
  );
}
