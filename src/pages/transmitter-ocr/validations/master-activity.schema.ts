import { z } from "zod";

export const masterActivitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  device_type: z.string().min(1, "Type is required"),
  template: z.string().min(1, "Master template is required"),
  file: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "File is required",
  }),
});

export type MasterActivityForm = z.infer<typeof masterActivitySchema>;
