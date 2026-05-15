import { z } from "zod";

export const childActivitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  indexPagesToTrim: z.string().optional(),
  activitySheet: z.string().min(1, "TbwesActivityModel sheet is required"),
  file: z.instanceof(File, { message: "File is required" }),
});

export type ChildActivityForm = z.infer<typeof childActivitySchema>;
