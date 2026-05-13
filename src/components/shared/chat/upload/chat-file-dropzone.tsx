import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatFileDropzoneProps {
  onFilesSelected: (fileList: FileList | null) => void;
}

export function ChatFileDropzone({ onFilesSelected }: ChatFileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    onFilesSelected(e.dataTransfer.files);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "relative flex min-h-50 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors",
        dragActive
          ? "border-primary bg-muted"
          : "border-border hover:border-primary/50 hover:bg-muted/40",
      )}
    >
      <Input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={(e) => onFilesSelected(e.target.files)}
      />

      <div className="flex flex-col items-center gap-2 text-center">
        <UploadCloud className="size-6" />

        <div>
          <p className="text-base font-semibold">Drag & drop files here</p>

          <p className="text-sm text-muted-foreground">
            or click to browse files
          </p>
        </div>

        <Badge variant="outline">Max file size: 100MB</Badge>
      </div>
    </div>
  );
}
