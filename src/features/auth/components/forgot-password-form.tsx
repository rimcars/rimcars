"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";

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
import { supabase } from "@/utils/supabase/client";
import {
  ForgotPasswordFormValues,
  ForgotPasswordSchema
} from "@/features/auth/validations/forgot-password-schema";
import { AuthMessage } from "@/features/auth/components/shared/auth-message";
import { isUserExiste } from "@/app/actions";

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email");
  const isConsultant = searchParams.get("consultant") == "true";

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: emailFromQuery || "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    try {
      setError(null);
      setSuccess(false);
      setIsLoading(true);

      // Check if user exists in database
      const userExists = await isUserExiste(values.email);

      if (!userExists) {
        setError("User not found");
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(
        values.email,
        {
          redirectTo: `${window.location.origin}/reset-password?consultant=${isConsultant}?email=${values.email}`,
        }
      );

      if (error) {
        console.error(error);
        const rateLimitMatch = error.message.match(/after (\d+) seconds/);
        if (rateLimitMatch || error.message.includes("expired")) {
          const seconds = rateLimitMatch ? rateLimitMatch[1] : 60;
          setError(`Rate limit exceeded. Please try again in ${seconds} seconds.`);
          return;
        } else if (error.message.includes("email rate limit exceeded")) {
          setError("Rate limit exceeded");
          return;
        }
        setError("An error occurred");
        return;
      }

      setSuccess(true);
    } catch (error) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center">
      <div className="w-full max-w-md px-4 py-6">
        {/* Email Icon with Animated Background */}
        <div className="relative mx-auto mb-6 flex h-[90px] w-[90px] items-center justify-center">
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
          <div className="absolute inset-2 rounded-full bg-primary/20" />
          <Mail className="relative h-10 w-10 text-primary" strokeWidth={1.5} />
        </div>

        {success ? (
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-xl font-semibold tracking-tight">
                Check your email
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Email sent
              </p>
            </div>
            <Button asChild variant="outline" className="w-full gap-2 text-sm">
              <Link
                href={`/login${isConsultant ? "/consultant" : ""}`}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-xl font-semibold tracking-tight">
                Forgot your password?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your email to reset your password
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
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
                      "Reset password"
                    )}
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full gap-2 text-sm"
                  >
                    <Link
                      href={`/login${isConsultant ? "/consultant" : ""}`}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to login
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
