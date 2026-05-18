import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const TEMPLATES = [
  { value: "template1", label: "Template 1" },
  { value: "template2", label: "Template 2" },
];

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
    defaultValues: {
      title: "",
      template: "",
    },
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

          {/* Template */}
          <Field>
            <Label>Template*</Label>
            <Controller
              name="template"
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Template" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEMPLATES.map((tpl) => (
                      <SelectItem
                        key={tpl.value}
                        value={tpl.value}
                        className="cursor-pointer"
                      >
                        {tpl.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[form.formState.errors.template]} />
          </Field>

          {/* File Upload */}
          <Field>
            <FieldLabel htmlFor="picture">File Upload*</FieldLabel>
            <Input
              id="picture"
              type="file"
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
          Save
        </Button>
      </DialogFooter>
    </>
  );
}
