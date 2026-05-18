import { z } from "zod";

export const categorySchema = z.object({
  title: z.string().min(2, "Title is required"),
  short_title: z.string().optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const attachFileSchema = z.object({
  document: z
    .instanceof(FileList, { message: "Document file is required" })
    .refine((val) => val.length !== 0, "Document file is required"),
  description: z.string().min(1, "Description is required"),
  kind: z.string().min(1, "Document kind is required"),
});

export type CategoryForm = z.infer<typeof categorySchema>;
export type AttachFileForm = z.infer<typeof attachFileSchema>;
