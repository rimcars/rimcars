import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
});

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
