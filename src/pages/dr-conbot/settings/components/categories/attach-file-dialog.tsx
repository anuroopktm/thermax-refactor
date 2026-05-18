import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileForm } from "./file-form";
import { type AttachFileForm } from "../../validations/categories.schema";
import { useCreateDrConbotCategoryDocument } from "@/services/query/dr-conbot/categories.service";
import { toast } from "sonner";

interface AttachFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
  categoryName: string;
}

export function AttachFileDialog({
  open,
  onOpenChange,
  categoryId,
  categoryName,
}: AttachFileDialogProps) {
  const uploadDocMutation = useCreateDrConbotCategoryDocument(
    Number(categoryId),
  );

  const handleSubmit = (data: AttachFileForm) => {
    const fileObj = data.document[0];
    const formData = new FormData();

    formData.append("document", fileObj);
    formData.append("description", data.description);
    formData.append("kind", data.kind);

    toast.promise(uploadDocMutation.mutateAsync(formData), {
      loading: "Attaching file...",
      success: () => {
        onOpenChange(false);
        return `File attached successfully to ${categoryName}`;
      },
      error: (err) => err?.response?.data?.detail || "Failed to attach file",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Add file to {categoryName}</DialogTitle>
        </DialogHeader>
        <FileForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSaving={uploadDocMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
