import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileForm } from "../products/file-form"; // reuse fileform
import { type AttachFileForm } from "@/pages/dr-conbot/settings/validations/products.schema";
import { useCreateDrConbotFaq } from "@/services/query/dr-conbot/faq.service";
import { toast } from "sonner";

interface AddFaqDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddFaqDialog({ open, onOpenChange }: AddFaqDialogProps) {
  const [isSaving, setIsSaving] = useState(false);
  const uploadFaqMutation = useCreateDrConbotFaq();

  const handleSubmit = async (data: AttachFileForm) => {
    setIsSaving(true);
    try {
      const fileObj = data.document[0];
      const formData = new FormData();
      formData.append("document", fileObj);

      await uploadFaqMutation.mutateAsync({
        formData,
        description: data.description,
        kind: data.kind,
      });

      toast.success("FAQ Document uploaded successfully");
      onOpenChange(false);
    } catch (error: any) {
      console.error("Failed to upload FAQ:", error);
      toast.error(
        error?.response?.data?.detail || "Failed to upload FAQ document",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload FAQ Document</DialogTitle>
        </DialogHeader>
        <FileForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSaving={isSaving}
        />
      </DialogContent>
    </Dialog>
  );
}
