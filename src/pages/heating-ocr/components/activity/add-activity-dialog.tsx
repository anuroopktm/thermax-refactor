import { useHeatingCreateActivity } from "@/services/query/heating-ocr";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ActivityForm } from "./activity-form";
import { type ActivityForm as ActivityFormType } from "../../validations/activity.schema";
import { toast } from "sonner";

interface AddActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddActivityDialog({
  open,
  onOpenChange,
}: AddActivityDialogProps) {
  const { mutateAsync: createActivity, isPending: isSaving } =
    useHeatingCreateActivity();

  const handleSubmit = async (data: ActivityFormType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("document", data.file[0]);

    toast.promise(createActivity(formData), {
      loading: "Creating activity...",
      success: () => {
        onOpenChange(false);
        return "Activity created successfully!";
      },
      error: (err) =>
        err.response?.data?.detail ||
        "Failed to create activity. Please try again.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[600px]">
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
