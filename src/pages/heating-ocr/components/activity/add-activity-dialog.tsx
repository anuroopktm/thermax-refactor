import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ActivityForm } from "./activity-form";
import { type ActivityForm as ActivityFormType } from "../../validations/activity.schema";

interface AddActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddActivityDialog({
  open,
  onOpenChange,
}: AddActivityDialogProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (data: ActivityFormType) => {
    setIsSaving(true);
    try {
      console.log("Creating Activity:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create activity:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Activity</DialogTitle>
        </DialogHeader>
        <ActivityForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSaving={isSaving}
        />
      </DialogContent>
    </Dialog>
  );
}
