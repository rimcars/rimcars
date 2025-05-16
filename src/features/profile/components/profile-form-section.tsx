"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Seller } from "@/types/seller";
import { toast } from "sonner";
import { updateProfile } from "../actions/profile-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AtSign, Loader2, User, UserRound } from "lucide-react";
import { USER_UPDATED_EVENT } from "@/hooks/use-user";

interface ProfileFormSectionProps {
  user: Seller;
  translations: {
    first_name: string;
    last_name: string;
    first_name_placeholder: string;
    last_name_placeholder: string;
    email: string;
    email_readonly: string;
    saving: string;
    save_changes: string;
    profile_updated: string;
    update_error: string;
    update_profile: string;
  };
}

export function ProfileFormSection({
  user,
  translations,
}: ProfileFormSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation messages defined inside the client component
  const validationMessages = {
    min_length: (value: string) => `يجب أن يكون على الأقل ${value} أحرف`,
    max_length: (value: string) => `يجب ألا يزيد عن ${value} حرفًا`,
    required: "هذا الحقل مطلوب"
  };

  // Split the name into first name and last name (if possible)
  const nameParts = user.name ? user.name.split(" ") : ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Create form schema with validation
  const formSchema = z.object({
    firstName: z
      .string()
      .min(2, { message: validationMessages.min_length("2") })
      .max(50, { message: validationMessages.max_length("50") }),
    lastName: z
      .string()
      .min(2, { message: validationMessages.min_length("2") })
      .max(50, { message: validationMessages.max_length("50") }),
    email: z.string().email().optional(),
  });

  // Initialize form with user data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName,
      lastName,
      email: user.email || "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Combine first name and last name
      const fullName = `${values.firstName} ${values.lastName}`.trim();

      await updateProfile({
        name: fullName,
      });
      toast.success(translations.profile_updated);

      // Trigger user data update event
      window.dispatchEvent(new Event(USER_UPDATED_EVENT));
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(translations.update_error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-right">
          {translations.update_profile}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-right"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {translations.first_name}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder={translations.first_name_placeholder}
                          {...field}
                          className="text-right pr-10"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-muted-foreground" />
                      {translations.last_name}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder={translations.last_name_placeholder}
                          {...field}
                          className="text-right pr-10"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <UserRound className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <AtSign className="h-4 w-4 text-muted-foreground" />
                    {translations.email}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled
                        className="text-right pr-10 bg-muted"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <AtSign className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </FormControl>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <AtSign className="h-3 w-3" />
                    {translations.email_readonly}
                  </p>
                </FormItem>
              )}
            />

            <div className="flex pt-4">
              <Button
                type="submit"
                className="w-full md:w-auto px-8"
                disabled={isSubmitting || !form.formState.isDirty}
              >
                {isSubmitting ? (
                  <>
                    {translations.saving}
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  translations.save_changes
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
