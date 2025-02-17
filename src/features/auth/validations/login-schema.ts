import { z } from "zod";

export const createLoginSchema = z.object({
  email: z.string().email({
    message: "البريد الإلكتروني غير صحيح",
  }),
  password: z.string().min(6, {
    message: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
  }),
});

export type LoginFormValues = z.infer<typeof createLoginSchema>;
