import { AccordionContent } from "@/components/ui/accordion";
import { ProductFileItem } from "./product-file-item";
import { type File } from "./product-card";

interface ProductFilesListProps {
  files: File[];
}

export function ProductFilesList({ files }: ProductFilesListProps) {
  return (
    <AccordionContent className="pt-3 space-y-3">
      {files.length > 0 ? (
        <div className="space-y-2">
          {files.map((file) => (
            <ProductFileItem key={file.id} file={file} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-6 text-center">
          <p className="text-sm text-muted-foreground">No files attached</p>
        </div>
      )}
    </AccordionContent>
  );
}
