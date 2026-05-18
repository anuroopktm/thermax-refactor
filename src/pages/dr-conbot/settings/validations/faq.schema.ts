import { z } from "zod";

export const faqSchema = z.object({
  document: z
    .instanceof(FileList, { message: "Document file is required" })
    .refine((val) => val.length !== 0, "Document file is required")
    .refine((val) => {
      if (!val || val.length === 0) return false;
      const file = val[0];
      const name = file?.name?.toLowerCase();
      return name && (name.endsWith(".xls") || name.endsWith(".xlsx"));
    }, "Only Excel files (.xls, .xlsx) are supported"),
  description: z.string().min(1, "Description is required"),
  kind: z.string().min(1, "Kind is required"),
});

export const editFaqSchema = z.object({
  description: z.string().min(1, "Description is required"),
  kind: z.string().min(1, "Kind is required"),
});

export type FaqForm = z.infer<typeof faqSchema>;
export type EditFaqForm = z.infer<typeof editFaqSchema>;
