import { LoginForm } from '@/features/auth/components/login-form';

export const metadata = {
  title: 'Login | Avaque',
  description: 'Login to your account'
};

export default async function LoginPage() {
  return <LoginForm />;
}
