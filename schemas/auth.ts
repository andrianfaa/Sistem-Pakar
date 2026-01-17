import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.email("Invalid email address").trim(),
  username: z.string().min(3, "Username must be at least 3 characters long").trim(),
  password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character."
    })
    .trim()
});
export type Register = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long").trim(),
  password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character."
    })
    .trim()
});
export type Login = z.infer<typeof LoginSchema>;
