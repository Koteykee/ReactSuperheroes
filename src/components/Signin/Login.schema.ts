import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .trim()
    .min(3, { message: "Enter username or email" })
    .max(30, { message: "Username or email must be at most 30 characters" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(30, { message: "Password must be at most 30 characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
