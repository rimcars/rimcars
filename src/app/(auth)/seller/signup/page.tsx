import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata = {
  title: "Register as Seller | Avaque",
  description: "Create your account",
};

export default function RegisterPage() {
  return <RegisterForm isSeller={true} />;
}
