import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { DialogFooter } from "@/components/ui/dialog";
import { faqSchema, type FaqForm } from "../../validations/faq.schema";

interface FileFormProps {
  onSubmit: (data: FaqForm) => void;
  onCancel: () => void;
  isSaving?: boolean;
  submitLabel?: string;
}

export function FileForm({
  onSubmit,
  onCancel,
  isSaving = false,
  submitLabel = "Upload",
}: FileFormProps) {
  const id = useId();
  const form = useForm<FaqForm>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      description: "",
      kind: "FAQ", // Default to FAQ for FAQ uploads
    },
  });

  return (
    <>
      <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Upload File */}
          <Field>
            <Label htmlFor="faq-file">File Upload*</Label>
            <Input
              id="faq-file"
              type="file"
              accept=".xls,.xlsx"
              className="cursor-pointer"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  form.setValue("document", files);
                }
              }}
            />
            <FieldError errors={[form.formState.errors.document]} />
          </Field>

          {/* Description */}
          <Field>
            <Label>Description*</Label>
            <Textarea
              placeholder="Enter FAQ description..."
              {...form.register("description")}
              className="min-h-[120px]"
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
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          form={id}
          type="submit"
          className="cursor-pointer"
          disabled={isSaving}
        >
          {submitLabel}
        </Button>
      </DialogFooter>
    </>
  );
}
