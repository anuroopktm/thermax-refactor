import { useId } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  memberSchema,
  type MemberForm as MemberFormType,
} from "@/validations/members.schema";
import { DialogFooter } from "@/components/ui/dialog";

const ROLE_OPTIONS = [
  { value: "", label: "Select role" },
  { value: "OWNER", label: "Owner" },
  { value: "MEMBER", label: "Member" },
  { value: "VIEWER", label: "Viewer" },
];

interface MemberFormProps {
  defaultValues?: Partial<MemberFormType>;
  onSubmit: (data: MemberFormType) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  isSaving?: boolean;
}

export function MemberForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Save changes",
  isSaving = false,
}: MemberFormProps) {
  const formId = useId();
  const form = useForm<MemberFormType>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      role: defaultValues?.role || "",
    },
  });

  return (
    <>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Name */}
          <Field>
            <Label>Name</Label>
            <Input placeholder="John Doe" {...form.register("name")} />
            <FieldError errors={[form.formState.errors.name]} />
          </Field>

          {/* Email */}
          <Field>
            <Label>Email</Label>
            <Input placeholder="john@example.com" {...form.register("email")} />
            <FieldError errors={[form.formState.errors.email]} />
          </Field>

          {/* Role */}
          <Field>
            <Label>Role</Label>
            <Controller
              name="role"
              control={form.control}
              render={({ field }) => (
                <>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Select role">
                        {field.value
                          ? ROLE_OPTIONS.find(
                              (opt) => opt.value === field.value,
                            )?.label
                          : undefined}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={[form.formState.errors.role]} />
                </>
              )}
            />
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
          {submitLabel}
        </Button>
      </DialogFooter>
    </>
  );
}
