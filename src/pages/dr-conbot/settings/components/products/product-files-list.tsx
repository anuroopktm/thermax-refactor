import { AccordionContent } from "@/components/ui/accordion";
import { ProductFileItem } from "./product-file-item";
import {
  useDrConbotProductDocuments,
  useDeleteDrConbotProductDocument,
} from "@/services/query/dr-conbot/products.service";
import { toast } from "sonner";

interface ProductFilesListProps {
  productId: string;
}

export function ProductFilesList({ productId }: ProductFilesListProps) {
  const { data: files = [], isLoading } = useDrConbotProductDocuments(
    Number(productId),
  );
  const deleteMutation = useDeleteDrConbotProductDocument(Number(productId));

  const handleRemove = async (documentId: string) => {
    toast.promise(deleteMutation.mutateAsync(Number(documentId)), {
      loading: "Removing file...",
      success: "File removed successfully",
      error: "Failed to remove file",
    });
  };

  if (isLoading) {
    return (
      <AccordionContent className="pt-3">
        <div className="py-6 text-center text-sm text-muted-foreground">
          Loading files...
        </div>
      </AccordionContent>
    );
  }

  return (
    <AccordionContent className="pt-3 space-y-3">
      {files.length > 0 ? (
        <div className="space-y-2">
          {files.map((file) => (
            <ProductFileItem
              key={file.id}
              productId={productId}
              file={file}
              onRemove={() => handleRemove(file.id)}
            />
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
