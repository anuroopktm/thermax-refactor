import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { DialogFooter } from "@/components/ui/dialog";
import {
  attachFileSchema,
  type AttachFileForm as AttachFileFormType,
} from "@/pages/dr-conbot/settings/validations/products.schema";
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
      description: "",
      kind: "MANUAL",
    },
  });

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
              <Input
                id="picture"
                type="file"
                className="bg-transparent"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    form.setValue("document", files);
                  }
                }}
              />
              <FieldError errors={[form.formState.errors.document]} />
            </Field>

            {/* File type / Kind */}
            <Field className="flex-1">
              <Label>File type</Label>
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
          </FieldGroup>

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
