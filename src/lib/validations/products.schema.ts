import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(2, "Title is required"),
  short_title: z.string().min(1, "Short title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const attachFileSchema = z.object({
  document: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Document file is required"),
  description: z.string().min(1, "Description is required"),
  kind: z.string().min(1, "Document kind is required"),
});

export type ProductForm = z.infer<typeof productSchema>;
export type AttachFileForm = z.infer<typeof attachFileSchema>;
