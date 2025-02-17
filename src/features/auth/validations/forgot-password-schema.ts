import { z } from "zod";


export const ForgotPasswordSchema =  z.object({
    email: z
      .string()
      .email("Invalid email")
  });


export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>
