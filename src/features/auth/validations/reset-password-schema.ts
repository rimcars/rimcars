import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

export type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;
