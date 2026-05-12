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
import { useCreateMasterActivity } from "@/services/query/transmitter-ocr/master-activities.service";

interface AddMasterActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMasterActivityDialog({
  open,
  onOpenChange,
}: AddMasterActivityDialogProps) {
  const { mutateAsync, isPending } = useCreateMasterActivity();

  const form = useForm<MasterActivityFormType>({
    resolver: zodResolver(masterActivitySchema),
    defaultValues: {
      title: "",
      device_type: "TRANSMITTER",
      template: "",
    },
  });

  const handleSubmit = async (data: MasterActivityFormType) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("device_type", data.device_type);
    formData.append("template", data.template);
    formData.append("document", data.file[0]);

    toast.promise(mutateAsync(formData), {
      loading: "Creating master activity...",
      success: () => {
        onOpenChange(false);
        form.reset();
        return "Master activity created successfully!";
      },
      error: (err) =>
        err.response?.data?.detail || "Failed to create master activity.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Master Activity</DialogTitle>
        </DialogHeader>
        <MasterActivityForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSaving={isPending}
          submitLabel="Create Activity"
        />
      </DialogContent>
    </Dialog>
  );
}
