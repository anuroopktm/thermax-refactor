import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileForm } from "./file-form";
import { type FaqForm } from "../../validations/faq.schema";
import { useCreateDrConbotFaq } from "@/services/query/dr-conbot/faq.service";
import { toast } from "sonner";

interface AddFaqDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddFaqDialog({ open, onOpenChange }: AddFaqDialogProps) {
  const uploadFaqMutation = useCreateDrConbotFaq();

  const handleSubmit = (data: FaqForm) => {
    const fileObj = data.document[0];
    const formData = new FormData();
    formData.append("document", fileObj);
    formData.append("description", data.description);
    formData.append("kind", data.kind);

    toast.promise(uploadFaqMutation.mutateAsync(formData), {
      loading: "Uploading FAQ Document...",
      success: () => {
        onOpenChange(false);
        return "FAQ Document uploaded successfully";
      },
      error: (err) =>
        err?.response?.data?.detail || "Failed to upload FAQ document",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Upload FAQ Document</DialogTitle>
        </DialogHeader>
        <FileForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSaving={uploadFaqMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
