import { useId, useState } from "react";
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
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { editFaqSchema, type EditFaqForm } from "../../validations/faq.schema";
import { type FaqModel } from "@/services/query/dr-conbot/types";
import {
  useUpdateDrConbotFaq,
  useDeleteDrConbotFaq,
} from "@/services/query/dr-conbot/faq.service";
import { toast } from "sonner";
import { DeleteFaqDialog } from "./delete-faq-dialog";

interface EditFaqDialogProps {
  faq: FaqModel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditFaqDialog({ faq, open, onOpenChange }: EditFaqDialogProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const updateMutation = useUpdateDrConbotFaq(faq.id);
  const deleteMutation = useDeleteDrConbotFaq();

  const id = useId();
  const form = useForm<EditFaqForm>({
    resolver: zodResolver(editFaqSchema),
    defaultValues: {
      description: faq.description,
      kind: faq.kind,
    },
  });

  const onSubmit = async (data: EditFaqForm) => {
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

  const confirmDelete = async () => {
    toast.promise(deleteMutation.mutateAsync(faq.id), {
      loading: "Deleting document...",
      success: () => {
        setShowDeleteConfirm(false);
        onOpenChange(false);
        return "Document deleted successfully";
      },
      error: (err) =>
        err?.response?.data?.detail || "Failed to delete document",
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Edit FAQ Document Details</DialogTitle>
          </DialogHeader>

          <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldGroup className="flex-row">
                {/* Filename */}
                <Field className="flex-1">
                  <Label>Filename</Label>
                  <Input value={faq.filename} disabled />
                </Field>

                {/* Status */}
                <Field className="flex-1">
                  <Label>Pipeline Status</Label>
                  <Input value={faq.status} disabled />
                </Field>
              </FieldGroup>

              {/* Description */}
              <Field>
                <Label>Description*</Label>
                <Textarea
                  placeholder="Enter document description..."
                  className="min-h-[120px]"
                  {...form.register("description")}
                />
                <FieldError errors={[form.formState.errors.description]} />
              </Field>
            </FieldGroup>
          </form>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              className="cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              form={id}
              type="submit"
              className="cursor-pointer"
              disabled={updateMutation.isPending}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteFaqDialog
        faq={faq}
        open={showDeleteConfirm}
        isDeleting={deleteMutation.isPending}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={confirmDelete}
      />
    </>
  );
}
