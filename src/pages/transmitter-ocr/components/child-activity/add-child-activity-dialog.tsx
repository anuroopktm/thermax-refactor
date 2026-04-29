import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChildActivityForm } from "./child-activity-form";
import { type ChildActivityForm as ChildActivityFormType } from "../../validations/child-activity.schema";

interface AddChildActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddChildActivityDialog({
  open,
  onOpenChange,
}: AddChildActivityDialogProps) {
  const handleSubmit = async (data: ChildActivityFormType) => {
    console.log("Form data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create Child Activity
          </DialogTitle>
        </DialogHeader>
        <ChildActivityForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
