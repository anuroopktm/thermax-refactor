import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  editFeedbackSchema,
  type EditFeedbackForm,
} from "@/pages/dr-conbot/settings/validations/feedback.schema";
import { type FaqModel } from "@/services/query/dr-conbot/types";
import {
  useUpdateDrConbotFaq,
  useDeleteDrConbotFaq,
} from "@/services/query/dr-conbot/faq.service";
import { toast } from "sonner";

interface EditFeedbackDialogProps {
  feedback: FaqModel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditFeedbackDialog({
  feedback,
  open,
  onOpenChange,
}: EditFeedbackDialogProps) {
  const updateMutation = useUpdateDrConbotFaq(feedback.id);
  const deleteMutation = useDeleteDrConbotFaq();
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<EditFeedbackForm>({
    resolver: zodResolver(editFeedbackSchema),
    defaultValues: {
      description: feedback.question,
      kind: feedback.kind,
    },
  });

  const onSubmit = async (data: EditFeedbackForm) => {
    toast.promise(updateMutation.mutateAsync(data), {
      loading: "Updating document...",
      success: () => {
        onOpenChange(false);
        return "Document updated successfully";
      },
      error: (err) =>
        err?.response?.data?.detail || "Failed to update document",
    });
  };

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to remove this FAQ document? This will delete it permanently.",
      )
    ) {
      setIsDeleting(true);
      toast.promise(deleteMutation.mutateAsync(feedback.id), {
        loading: "Deleting document...",
        success: () => {
          onOpenChange(false);
          setIsDeleting(false);
          return "Document deleted successfully";
        },
        error: (err) => {
          setIsDeleting(false);
          return err?.response?.data?.detail || "Failed to delete document";
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit FAQ Document Details</DialogTitle>
        </DialogHeader>

        <form
          id="edit-faq-doc-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup>
            {/* Filename Readonly */}
            <Field>
              <Label>Filename</Label>
              <Input
                value={feedback.filename}
                disabled
                className="bg-transparent opacity-80"
              />
            </Field>

            <FieldGroup className="flex-row">
              {/* Kind / Source Type */}
              <Field className="flex-1">
                <Label>Document Type</Label>
                <Select
                  value={form.watch("kind")}
                  onValueChange={(val) => val && form.setValue("kind", val)}
                >
                  <SelectTrigger className="cursor-pointer bg-transparent">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MANUAL" className="cursor-pointer">
                      Manual
                    </SelectItem>
                    <SelectItem value="FAQ" className="cursor-pointer">
                      FAQ
                    </SelectItem>
                    <SelectItem value="IMAGE" className="cursor-pointer">
                      Image
                    </SelectItem>
                    <SelectItem value="VIDEO" className="cursor-pointer">
                      Video
                    </SelectItem>
                    <SelectItem value="OTHER" className="cursor-pointer">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FieldError errors={[form.formState.errors.kind]} />
              </Field>

              {/* Status Display Only */}
              <Field className="flex-1">
                <Label>Pipeline Status</Label>
                <Input
                  value={feedback.status}
                  disabled
                  className="bg-transparent capitalize opacity-80"
                />
              </Field>
            </FieldGroup>

            {/* Description */}
            <Field>
              <Label>Description*</Label>
              <Textarea
                placeholder="Enter document description..."
                {...form.register("description")}
                className="bg-transparent min-h-[120px]"
              />
              <FieldError errors={[form.formState.errors.description]} />
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter className="justify-between flex items-center w-full">
          <Button
            type="button"
            variant="destructive"
            className="cursor-pointer mr-auto"
            onClick={handleDelete}
            disabled={isDeleting || updateMutation.isPending}
          >
            {isDeleting ? "Deleting..." : "Delete Document"}
          </Button>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              className="cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              form="edit-faq-doc-form"
              type="submit"
              className="cursor-pointer"
              disabled={updateMutation.isPending || isDeleting}
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
