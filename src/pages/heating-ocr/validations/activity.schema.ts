import { z } from "zod";

export const activitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  template: z.string().min(1, "Template is required"),
  file: z.any(), // Keeping it as any to handle FileList from react-hook-form
});

export type ActivityForm = z.infer<typeof activitySchema>;
