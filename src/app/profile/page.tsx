import { getUser } from "@/app/actions";
import { redirect } from "next/navigation";
import { ProfileFormSection } from "@/features/profile/components/profile-form-section";
import { UserAvatarSection } from "@/features/profile/components/user-avatar-section";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  // Arabic translations for the profile form and avatar section
  const translations = {
    first_name: "الاسم الأول",
    last_name: "اسم العائلة",
    first_name_placeholder: "أدخل الاسم الأول",
    last_name_placeholder: "أدخل اسم العائلة",
    email: "البريد الإلكتروني",
    email_readonly: "لا يمكن تعديل البريد الإلكتروني",
    saving: "جاري الحفظ...",
    save_changes: "حفظ التغييرات",
    profile_updated: "تم تحديث الملف الشخصي بنجاح",
    update_error: "حدث خطأ أثناء تحديث الملف الشخصي",
    update_profile: "تحديث الملف الشخصي",
    change_avatar: "تغيير الصورة الشخصية",
    remove_avatar: "إزالة الصورة",
    update_avatar: "تحديث الصورة",
    cancel: "إلغاء",
    avatar_updated: "تم تحديث الصورة الشخصية",
    avatar_removed: "تمت إزالة الصورة الشخصية",
    avatar_update_error: "حدث خطأ أثناء تحديث الصورة",
    avatar_delete_error: "حدث خطأ أثناء إزالة الصورة",
    dismiss: "إغلاق",
    joined_at: "تاريخ الانضمام"
  };

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">الملف الشخصي</h1>
      <UserAvatarSection user={user} translations={translations} />
      <div className="mt-8">
        <ProfileFormSection user={user} translations={translations} />
      </div>
    </div>
  );
} 