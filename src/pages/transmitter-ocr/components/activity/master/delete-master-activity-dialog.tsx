import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { MasterActivitiesModel } from "@/services/query/transmitter-ocr/types";
import { useDeleteMasterActivity } from "@/services/query/transmitter-ocr/master-activities.service";

interface DeleteMasterActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: MasterActivitiesModel | null;
}

export function DeleteMasterActivityDialog({
  open,
  onOpenChange,
  activity,
}: DeleteMasterActivityDialogProps) {
  const { mutateAsync, isPending } = useDeleteMasterActivity();

  const handleDelete = async () => {
    if (!activity) return;

    toast.promise(mutateAsync(activity.id), {
      loading: "Deleting master activity...",
      success: () => {
        onOpenChange(false);
        return "Master activity deleted successfully!";
      },
      error: (err) =>
        err.response?.data?.detail || "Failed to delete master activity.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Master Activity</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{activity?.title}</strong>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="cursor-pointer"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
