import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MasterActivityForm } from "./master-activity-form";
import { type MasterActivityForm as MasterActivityFormType } from "../../validations/master-activity.schema";

interface AddMasterActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMasterActivityDialog({
  open,
  onOpenChange,
}: AddMasterActivityDialogProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (data: MasterActivityFormType) => {
    setIsSaving(true);
    try {
      console.log("Creating Master Activity:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create master activity:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Master Activity</DialogTitle>
        </DialogHeader>
        <MasterActivityForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSaving={isSaving}
        />
      </DialogContent>
    </Dialog>
  );
}
