import { RegisterForm } from "@/features/auth/components/register-form";
import { getUser } from "@/app/actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Register | Avaque",
  description: "Create your account",
};

export default async function RegisterPage() {
  const user = await getUser();
  if (user) {
    redirect("/");
  }
  return <RegisterForm  />;
}
