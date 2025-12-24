import { z } from "zod";

export const registrationSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Login must be at least 3 characters" })
      .max(30, { message: "Login must be at most 30 characters" }),
    email: z
      .email({ message: "Invalid email address" })
      .trim()
      .max(30, { message: "Email must be at most 30 characters" }),
    password: z
      .string({ message: "" })
      .trim()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(30, { message: "Password must be at most 30 characters" })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number",
      }),

    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
