import { z } from "zod";

export const productSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  shortName: z.string().min(1, "Short name is required"),
  models: z.string().min(1, "At least one model is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const attachFileSchema = z.object({
  file: z
    .any()
    .refine((val) => val !== null && val !== undefined, "File is required"),
  fileType: z.string().min(1, "File type is required"),
  models: z.string().min(1, "At least one model is required"),
  description: z.string().min(1, "Description is required"),
});

export type ProductForm = z.infer<typeof productSchema>;
export type AttachFileForm = z.infer<typeof attachFileSchema>;
