import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.enum(["owner", "member", "viewer"]),
});

export type MemberForm = z.infer<typeof memberSchema>;
