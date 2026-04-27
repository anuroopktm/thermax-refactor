import { useForm } from "react-hook-form";
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
} from "@/validations/member";

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
  const form = useForm<MemberFormType>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      role: defaultValues?.role || "member",
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        {/* Name */}
        <Field>
          <Label>Name</Label>
          <Input
            placeholder="John Doe"
            {...form.register("name")}
            className="bg-transparent"
          />
          <FieldError errors={[form.formState.errors.name]} />
        </Field>

        {/* Email */}
        <Field>
          <Label>Email</Label>
          <Input
            placeholder="john@example.com"
            {...form.register("email")}
            className="bg-transparent"
          />
          <FieldError errors={[form.formState.errors.email]} />
        </Field>

        {/* Role */}
        <Field>
          <Label>Role</Label>
          <Select
            value={form.watch("role")}
            onValueChange={(val) =>
              form.setValue("role", val as MemberFormType["role"])
            }
          >
            <SelectTrigger className="cursor-pointer bg-transparent">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="owner" className="cursor-pointer">
                Owner
              </SelectItem>
              <SelectItem value="member" className="cursor-pointer">
                Member
              </SelectItem>
              <SelectItem value="viewer" className="cursor-pointer">
                Viewer
              </SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>

      <div className="flex justify-end gap-3 mt-6">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" className="cursor-pointer" disabled={isSaving}>
          {isSaving ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
