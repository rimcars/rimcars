import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل",
      })
      .regex(/[A-Z]/, {
        message: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل",
      })
      .regex(/[a-z]/, {
        message: "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل",
      })
      .regex(/[0-9]/, {
        message: "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message:
          "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل (!@#$%^&*)",
      }),
    confirmPassword: z.string(),
    code: z.string().default(""),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

export type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;
