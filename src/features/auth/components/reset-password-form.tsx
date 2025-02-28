"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ArrowLeft, Lock, CheckCircle2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/utils/supabase/client";
import { PasswordInput } from "@/features/auth/components/shared/password-input";
import { AuthMessage } from "@/features/auth/components/shared/auth-message";
import {
  ResetPasswordSchema,
  ResetPasswordValues,
} from "@/features/auth/validations/reset-password-schema";
import { resetPassword } from "../actions/reset-password";

export function ResetPasswordForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const isSeller = searchParams.get("seller") === "true";
  const email = searchParams.get("email") || "";

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // If no code is provided, show error and redirect
  if (!code) {
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        <div className="w-full max-w-md px-4">
          <AuthMessage type="error" message={"Invalid link"} />
          <div className="mt-4">
            <Button asChild variant="outline" className="w-full gap-2 text-sm">
              <Link href={`/${isSeller ? "/seller/login" : "/login"}`}>
                العودة لتسجيل الدخول
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  async function onSubmit(values: ResetPasswordValues) {
    try {
      setError(null);
      setIsLoading(true);

      // Call the server action to reset password
      const result = await resetPassword({
        ...values,
        code: code || "", // Ensure code is never null
      });

      if (!result.success) {
        // Use the error message from the server response
        setError(result.message || "حدث خطأ");
        return;
      }

      // Success - show message and redirect to login
      setSuccess(true);
      setSuccessMessage(result.message || "تم إعادة تعيين كلمة المرور بنجاح");
      setTimeout(() => {
        router.push(`/${isSeller ? "seller/login" : "login"}`);
      }, 2000);
    } catch (error) {
      console.error("Error in onSubmit:", error);
      setError("حدث خطأ");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center">
      <div className="w-full max-w-md px-4 py-6">
        {/* Lock Icon with Animated Background */}
        <div className="relative mx-auto mb-6 flex h-[90px] w-[90px] items-center justify-center">
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
          <div className="absolute inset-2 rounded-full bg-primary/20" />
          <Lock className="relative h-10 w-10 text-primary" strokeWidth={1.5} />
        </div>

        {success ? (
          <div className="space-y-4">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-semibold tracking-tight">
                {successMessage || "تم إعادة تعيين كلمة المرور بنجاح"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                تم إعادة تعيين كلمة المرور بنجاح
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-xl font-semibold tracking-tight">
                إعادة تعيين كلمة المرور
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                أدخل كلمة المرور الجديدة
              </p>
            </div>

            <AuthMessage type="error" message={error} />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        كلمة المرور الجديدة
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="كلمة المرور الجديدة"
                          className="text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        تأكيد كلمة المرور
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="تأكيد كلمة المرور"
                          className="text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="w-full dark:bg-primary dark:hover:bg-primary/90 dark:text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      </div>
                    ) : (
                      "تأكيد كلمة المرور الجديدة"
                    )}
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full gap-2 text-sm"
                  >
                    <Link href={`/${isSeller ? "seller/login" : "login"}`}>
                      <ArrowLeft className="h-4 w-4" />
                      العودة لتسجيل الدخول
                    </Link>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
