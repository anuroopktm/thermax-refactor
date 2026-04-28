import { z } from "zod";

export const masterActivitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["Transmitter", "Gauge"], {
    message: "Please select a type",
  }),
  masterType: z.string().min(1, "Master template is required"),
  file: z.instanceof(File, { message: "File is required" }),
});

export type MasterActivityForm = z.infer<typeof masterActivitySchema>;
