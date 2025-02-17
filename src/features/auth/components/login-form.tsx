"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/features/auth/components/shared/password-input";
import { AuthMessage } from "@/features/auth/components/shared/auth-message";
import { GoogleSignInButton } from "@/features/auth/components/google-sign-in-button";
import { login } from "../actions/login";
import {
  LoginFormValues,
  createLoginSchema,
} from "@/features/auth/validations/login-schema";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Check for verification success message and errors
  useEffect(() => {
    if (searchParams?.get("verified") === "true") {
      setSuccess("Email verified");
    }

    // Handle URL error parameters
    const urlError = searchParams?.get("error");
    const errorCode = searchParams?.get("error_code");
    const errorDescription = searchParams?.get("error_description");

    if (urlError || errorCode || errorDescription) {
      if (
        errorCode === "otp_expired" ||
        errorDescription?.includes("expired")
      ) {
        setError("Link expired");
      } else if (urlError === "No code provided") {
        setError("Invalid link");
      } else if (errorCode === "access_denied") {
        setError("Access denied");
      } else {
        setError("Error");
      }
    }
  }, [searchParams]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(createLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      setError(null);
      setUnverifiedEmail(null);
      setIsPending(true);

      const result = await login(values);
      console.log("result of the login from the login form", result);

      if (!result?.error) {
        return;
      }

      // Handle errors
      const errorMessage = result.error.toLowerCase();
      if (errorMessage.includes("invalid login credentials")) {
        setError("Invalid credentials");
      } else if (errorMessage.includes("email not confirmed")) {
        setError("Email not confirmed");
        setUnverifiedEmail(values.email);
      } else if (errorMessage.includes("too many requests")) {
        setError("Too many requests");
      } else if (errorMessage.includes("network")) {
        setError("Network error");
      } else if (errorMessage.includes("rate limit")) {
        const seconds = errorMessage.match(/\d+/)?.[0] || "60";
        setError("Rate limit");
      } else if (errorMessage.includes("pending approval")) {
        setError("Pending approval");
      } else if (errorMessage.includes("profile not found")) {
        setError("Profile not found");
      } else {
        setError("Error");
      }
    } catch (error) {
      console.error(error);
      setError("Error");
    } finally {
      setIsPending(false);
    }
  }

  // Update the sign up link to preserve the returnTo parameter
  const signUpHref = `/signup`;

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          تسجيل الدخول للوحة التحكم
        </h1>
        <p className="text-sm text-muted-foreground">
          قم بتسجيل الدخول إلى لوحة التحكم الخاصة بك
        </p>
      </div>

      {!error && !isPending && success && (
        <AuthMessage type="success" message={success} />
      )}
      <AuthMessage
        type="error"
        message={error}
        unverifiedEmail={unverifiedEmail}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>كلمة المرور</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-start">
            <Link
              href={`/forgot-password?email=${form.getValues("email")}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full dark:bg-primary dark:hover:bg-primary/90 dark:text-white"
            disabled={isPending}
          >
            {isPending ? (
              "جاري تسجيل الدخول..."
            ) : (
              <>
                تسجيل الدخول
                <ArrowLeft className={`mr-2 h-4 w-4`} />
              </>
            )}
          </Button>
        </form>
      </Form>

      <>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              أو المتابعة باستخدام
            </span>
          </div>
        </div>
        <GoogleSignInButton />
      </>

      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          ليس لديك حساب؟{" "}
          <Link
            href={signUpHref}
            className="font-medium text-primary hover:underline"
          >
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
}
