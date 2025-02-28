"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Seller } from "@/types/seller";
import { UserAvatarSection } from "./user-avatar-section";
import { ProfileFormSection } from "./profile-form-section";

interface ProfileFormProps {
  user: Seller;
}

/**
 * Main profile form component that combines all profile-related sections
 * with a mobile-first responsive design
 */
export function ProfileForm({ user }: ProfileFormProps) {
  // Early return if no user data
  if (!user) return null;

  // Create validation messages object for form validation
  const validationMessagesObj = {
    min_length: (value: string) => `يجب أن يكون الحقل ${value} حرفًا على الأقل`,
    max_length: (value: string) => `يجب أن يكون الحقل أقل من ${value} حرفًا`,
    required: "هذا الحقل مطلوب",
  };

  // Prepare translations for avatar section
  const avatarTranslations = {
    change_avatar: "تغيير الصورة الشخصية",
    remove_avatar: "إزالة الصورة الشخصية",
    update_avatar: "تحديث الصورة",
    cancel: "إلغاء",
    avatar_updated: "تم تحديث الصورة الشخصية بنجاح",
    avatar_removed: "تم إزالة الصورة الشخصية",
    avatar_update_error: "حدث خطأ أثناء تحديث الصورة الشخصية",
    avatar_delete_error: "حدث خطأ أثناء إزالة الصورة الشخصية",
    dismiss: "إغلاق",
    joined_at: "تاريخ الانضمام",
  };

  // Prepare translations for profile form section
  const profileFormTranslations = {
    first_name: "الاسم الأول",
    last_name: "اسم العائلة",
    first_name_placeholder: "أدخل الاسم الأول",
    last_name_placeholder: "أدخل اسم العائلة",
    email: "البريد الإلكتروني",
    email_readonly: "لا يمكن تغيير البريد الإلكتروني",
    saving: "جاري الحفظ...",
    save_changes: "حفظ التغييرات",
    profile_updated: "تم تحديث الملف الشخصي بنجاح",
    update_error: "حدث خطأ أثناء تحديث الملف الشخصي",
    update_profile: "تحديث الملف الشخصي",
  };

  return (
    <div className="space-y-6">
      {/* Avatar and User Info Section */}
      <UserAvatarSection user={user} translations={avatarTranslations} />

      {/* Form Section */}
      <ProfileFormSection
        user={user}
        translations={profileFormTranslations}
        validationMessages={validationMessagesObj}
      />
    </div>
  );
}
