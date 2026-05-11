import { z } from "zod";

export const activitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  template: z.string().min(1, "Template is required"),
  file: z.instanceof(FileList).refine((val) => val && val.length > 0, {
    message: "File is required",
  }),
});

export type ActivityForm = z.infer<typeof activitySchema>;
