import { LoginForm } from '@/features/auth/components/login-form';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/app/actions';

export const metadata = {
  title: 'Login | Avaque',
  description: 'Login to your account'
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (user) {
    console.log("user from the login page", user);
  }

  return <LoginForm />;
}
