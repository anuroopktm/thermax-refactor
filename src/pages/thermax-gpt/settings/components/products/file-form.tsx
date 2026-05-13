import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import { DialogFooter } from "@/components/ui/dialog";
import {
  attachFileSchema,
  type AttachFileForm as AttachFileFormType,
} from "@/pages/thermax-gpt/settings/validations/products.schema";
import { Input } from "@/components/ui/input";

interface FileFormProps {
  onSubmit: (data: AttachFileFormType) => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
}

export function FileForm({
  onSubmit,
  onCancel,
  isSaving = false,
}: FileFormProps) {
  const form = useForm<AttachFileFormType>({
    resolver: zodResolver(attachFileSchema),
    defaultValues: {
      fileType: "Manual",
      models: "VTB 04, VTB 06, VTB 10, VTB 15",
      description: "",
    },
  });

  const models = form
    .watch("models")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);

  return (
    <>
      <form
        id="attach-file-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FieldGroup>
          <FieldGroup className="flex-row">
            {/* Upload File */}
            <Field className="flex-2">
              <FieldLabel htmlFor="picture">File Upload*</FieldLabel>
              <Input id="picture" type="file" {...form.register("file")} />
              <FieldError errors={[form.formState.errors.file]} />
            </Field>

            {/* File type */}
            <Field className="flex-1">
              <Label>File type</Label>
              <Select
                value={form.watch("fileType")}
                onValueChange={(val) => val && form.setValue("fileType", val)}
              >
                <SelectTrigger className="cursor-pointer bg-transparent">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manual" className="cursor-pointer">
                    Manual
                  </SelectItem>
                  <SelectItem value="Other" className="cursor-pointer">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={[form.formState.errors.fileType]} />
            </Field>
          </FieldGroup>

          {/* Models */}
          <Field>
            <Label>Models</Label>
            <div className="flex flex-wrap gap-2 p-2 rounded-lg border border-input min-h-[40px] bg-transparent">
              {models.map((model, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-2 py-0.5 text-xs font-normal flex items-center gap-1"
                >
                  {model}
                  <X className="size-3 cursor-pointer" />
                </Badge>
              ))}
            </div>
            <FieldError errors={[form.formState.errors.models]} />
          </Field>

          {/* Description */}
          <Field>
            <Label>Description*</Label>
            <Textarea
              placeholder="Enter file description..."
              {...form.register("description")}
              className="bg-transparent min-h-[120px]"
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
          form="attach-file-form"
          type="submit"
          className="cursor-pointer"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </>
  );
}
