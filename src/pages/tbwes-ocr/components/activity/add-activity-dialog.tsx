import { useTbwesCreateActivity } from "@/services/query/tbwes-ocr";
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
    useTbwesCreateActivity();

  const handleSubmit = async (data: ActivityFormType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("document", data.file[0]);

    toast.promise(createActivity(formData), {
      loading: "Creating activity...",
      success: () => {
        onOpenChange(false);
        return "TbwesActivityModel created successfully!";
      },
      error: (err) =>
        err.response?.data?.detail ||
        "Failed to create activity. Please try again.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Create TbwesActivityModel</DialogTitle>
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
