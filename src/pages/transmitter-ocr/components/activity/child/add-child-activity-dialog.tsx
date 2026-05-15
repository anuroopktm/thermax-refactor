import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChildActivityForm } from "./child-activity-form";
import { type ChildActivityForm as ChildActivityFormType } from "../../../validations/child-activity.schema";
import { toast } from "sonner";

interface AddChildActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddChildActivityDialog({
  open,
  onOpenChange,
}: AddChildActivityDialogProps) {
  const handleSubmit = async (_: ChildActivityFormType) => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: "Creating child activity...",
      success: () => {
        onOpenChange(false);
        return "Child activity created successfully";
      },
      error: "Failed to create child activity",
    });
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
