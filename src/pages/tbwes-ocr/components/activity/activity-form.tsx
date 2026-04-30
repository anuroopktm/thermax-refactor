import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import {
  activitySchema,
  type ActivityForm as ActivityFormType,
} from "../../validations/activity.schema";
import { useId } from "react";

interface ActivityFormProps {
  onSubmit: (data: ActivityFormType) => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
}

export function ActivityForm({
  onSubmit,
  onCancel,
  isSaving = false,
}: ActivityFormProps) {
  const formId = useId();
  const form = useForm<ActivityFormType>({
    resolver: zodResolver(activitySchema),
  });

  return (
    <>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Title */}
          <Field>
            <Label>Title*</Label>
            <Input placeholder="Enter title" {...form.register("title")} />
            <FieldError errors={[form.formState.errors.title]} />
          </Field>

          {/* File Upload */}
          <Field>
            <FieldLabel htmlFor="picture">File Upload*</FieldLabel>
            <Input
              id="picture"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="cursor-pointer"
              {...form.register("file")}
            />
            <FieldError errors={[form.formState.errors.file]} />
          </Field>
        </FieldGroup>
      </form>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          form={formId}
          type="submit"
          className="cursor-pointer"
          disabled={isSaving}
        >
          Create Activity
        </Button>
      </DialogFooter>
    </>
  );
}
