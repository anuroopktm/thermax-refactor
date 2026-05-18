import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileForm } from "./file-form";
import { type AttachFileForm } from "@/pages/dr-conbot/settings/validations/products.schema";
import { useCreateDrConbotProductDocument } from "@/services/query/dr-conbot/products.service";
import { conbotApi } from "@/services/interceptor";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { drConbotKeys } from "@/services/query/dr-conbot/keys";

interface AttachFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productName: string;
}

export function AttachFileDialog({
  open,
  onOpenChange,
  productId,
  productName,
}: AttachFileDialogProps) {
  const [isSaving, setIsSaving] = useState(false);
  const uploadDocMutation = useCreateDrConbotProductDocument(Number(productId));
  const queryClient = useQueryClient();

  const handleSubmit = async (data: AttachFileForm) => {
    setIsSaving(true);
    try {
      const fileObj = data.document[0];
      const formData = new FormData();
      formData.append("document", fileObj);

      // 1. Upload the file
      const uploadRes = await uploadDocMutation.mutateAsync(formData);

      // 2. Immediately patch the description and kind (file metadata)
      if (uploadRes?.id) {
        await conbotApi.patch(
          `/doctor_conbot/product/${productId}/document/${uploadRes.id}`,
          {
            description: data.description,
            kind: data.kind,
          },
        );
      }

      // 3. Invalidate queries
      queryClient.invalidateQueries({
        queryKey: drConbotKeys.products.documents(Number(productId)),
      });
      queryClient.invalidateQueries({
        queryKey: drConbotKeys.products.all,
      });

      toast.success(`File attached successfully to ${productName}`);
      onOpenChange(false);
    } catch (error: any) {
      console.error("Failed to attach file:", error);
      toast.error(error?.response?.data?.detail || "Failed to attach file");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add file to {productName}</DialogTitle>
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
