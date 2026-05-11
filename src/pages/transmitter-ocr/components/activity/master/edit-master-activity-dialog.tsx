import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MasterActivityForm } from "./master-activity-form";
import {
  masterActivitySchema,
  type MasterActivityForm as MasterActivityFormType,
} from "../../../validations/master-activity.schema";
import { toast } from "sonner";
import type { MasterActivityItem } from "@/services/query/transmitter-ocr/types";
import { useUpdateMasterActivity } from "@/services/query/transmitter-ocr/master-activities.service";

interface EditMasterActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: MasterActivityItem;
}

export function EditMasterActivityDialog({
  open,
  onOpenChange,
  activity,
}: EditMasterActivityDialogProps) {
  const { mutateAsync, isPending } = useUpdateMasterActivity(activity.id);

  const form = useForm<MasterActivityFormType>({
    resolver: zodResolver(masterActivitySchema),
    defaultValues: {
      title: activity.title,
      device_type: activity.device_type,
      template: activity?.template?.toUpperCase() || "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: activity.title,
        device_type: activity.device_type,
        template: activity?.template?.toUpperCase() || "",
      });
    }
  }, [activity, open, form]);

  const handleSubmit = async (data: MasterActivityFormType) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("device_type", data.device_type);
    formData.append("template", data.template);
    if (data.file?.[0]) {
      formData.append("document", data.file[0]);
    }

    toast.promise(mutateAsync(formData), {
      loading: "Updating master activity...",
      success: () => {
        onOpenChange(false);
        return "Master activity updated successfully!";
      },
      error: (err) =>
        err.response?.data?.detail || "Failed to update master activity.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Master Activity</DialogTitle>
        </DialogHeader>
        <MasterActivityForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSaving={isPending}
          submitLabel="Update Activity"
          isEdit={true}
          currentFilename={activity.filename}
        />
      </DialogContent>
    </Dialog>
  );
}
