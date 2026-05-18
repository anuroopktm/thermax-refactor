import { memo } from "react";
import { AccordionContent } from "@/components/ui/accordion";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderOpen, Loader2 } from "lucide-react";
import { ProductFileItem } from "./product-file-item";

interface ProductFilesListProps {
  files: Array<{
    id: string;
    name: string;
    type?: string;
    status?: string;
    kind?: string;
    description?: string;
  }>;
  onRemove?: (fileId: string) => void;
  onDownload?: (fileId: string) => void;
  downloadingFileId?: string | null;
  isLoading?: boolean;
}

export function ProductFilesList({
  files,
  onRemove,
  onDownload,
  downloadingFileId = null,
  isLoading = false,
}: ProductFilesListProps) {
  if (isLoading) {
    return <FilesSkeleton />;
  }

  return (
    <AccordionContent className="pt-3 space-y-3">
      {files.length > 0 ? (
        <div className="space-y-2">
          {files.map((file) => (
            <ProductFileItem
              key={file.id}
              file={file}
              onRemove={onRemove ? () => onRemove(file.id) : undefined}
              onDownload={onDownload ? () => onDownload(file.id) : undefined}
              downloading={downloadingFileId === file.id}
            />
          ))}
        </div>
      ) : (
        <FilesEmptyState />
      )}
    </AccordionContent>
  );
}

/* ---------------- EMPTY STATE ---------------- */

const FilesEmptyState = memo(() => {
  return (
    <Empty className="py-6 border border-dashed rounded-md">
      <EmptyHeader>
        <EmptyMedia>
          <FolderOpen className="size-6 text-primary" />
        </EmptyMedia>
        <EmptyTitle className="text-sm font-medium">
          No files attached
        </EmptyTitle>
        <EmptyDescription className="text-xs text-muted-foreground">
          Attach files to this product to see them here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
});

FilesEmptyState.displayName = "FilesEmptyState";

/* ---------------- SKELETON ---------------- */

const FilesSkeleton = memo(() => {
  return (
    <AccordionContent className="pt-3">
      <div className="py-6 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin text-primary" />
        <span>Loading files...</span>
      </div>
    </AccordionContent>
  );
});

FilesSkeleton.displayName = "FilesSkeleton";
