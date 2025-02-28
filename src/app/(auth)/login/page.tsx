import { LoginForm } from '@/features/auth/components/login-form';
import { getUser } from '@/app/actions';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Login | Avaque',
  description: 'Login to your account'
};

export default async function LoginPage() {
  const user = await getUser();
  if (user) {
    redirect("/");
  }
  return <LoginForm />;
}
