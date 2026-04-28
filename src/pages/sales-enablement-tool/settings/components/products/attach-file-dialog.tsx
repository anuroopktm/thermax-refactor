import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileForm } from "./file-form";
import { type AttachFileForm } from "@/validations/products.schema";

interface AttachFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
}

export function AttachFileDialog({
  open,
  onOpenChange,
  productName,
}: AttachFileDialogProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (data: AttachFileForm) => {
    setIsSaving(true);
    try {
      console.log("Attaching file to product:", productName, data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to attach file:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add file</DialogTitle>
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
