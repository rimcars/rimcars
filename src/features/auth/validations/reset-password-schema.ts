import { z } from "zod";

export const ResetPasswordSchema = z
    .object({
      password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
      }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
    });

export type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>; 


