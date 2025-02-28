import { getUser } from "@/app/actions";
import { ProfileForm } from "@/features/profile/components/profile-form";
import { Settings, UserCircle } from "lucide-react";

export const metadata = {
  title: "الإعدادات | لوحة التحكم",
  description: "تحديث معلومات الحساب الشخصي",
};

export default async function SettingsPage() {
  // Get user data - authentication is already handled by middleware
  const user = await getUser();

  return (
    <main className="container max-w-4xl mx-auto py-4 px-4 md:py-8 md:px-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1"></div>
        <div className="flex items-center gap-3 text-right">
          <Settings className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">إعدادات الحساب</h1>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-gradient-to-l from-primary/10 to-transparent p-4 rounded-lg border border-primary/5">
          <p className="text-muted-foreground text-right flex items-center justify-end gap-2">
            <UserCircle className="h-5 w-5 text-primary" />
            قم بتحديث معلومات حسابك الشخصي وإدارة صورتك الشخصية.
          </p>
        </div>

        <ProfileForm user={user} />
      </div>
    </main>
  );
}
