import { z } from "zod";

// Regular user registration schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "يجب أن يتكون الاسم من حرفين على الأقل"),
  email: z
    .string()
    .email("يرجى إدخال بريد إلكتروني صحيح"),
  password: z
    .string()
    .min(6, "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
