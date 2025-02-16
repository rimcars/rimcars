'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/features/auth/components/shared/password-input';
import {
  RegisterFormValues,
  registerSchema
} from '../validations/register-schema';
import { isUserExist, signupUser } from '@/features/auth/actions/signup';
import { cn } from '@/lib/utils';

interface AuthMessageProps {
  type: 'error' | 'success';
  message: string | null;
}

function AuthMessage({ type, message }: AuthMessageProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        'rounded-md p-3 text-sm',
        type === 'error'
          ? 'bg-destructive/15 text-destructive'
          : 'bg-emerald-500/15 text-emerald-500'
      )}
    >
      {message}
    </div>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      setError(null);
      setIsPending(true);

      const userExists = await isUserExist(values.email);

      if (userExists?.id) {
        setError('Email already exists');
        return;
      }

      const result = await signupUser(values);
      if (result?.error) {
        setError(result.error);
        console.log(result.error);
        return;
      }

      router.replace('/verify-email');
    } catch (error) {
      console.log(error);
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Create an Account
        </h1>
        <p className='text-sm text-muted-foreground'>
          Enter your details to create your account
        </p>
      </div>

      <AuthMessage type='error' message={error} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='Create a password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='w-full bg-primary/90 hover:bg-primary'
            disabled={isPending}
          >
            {isPending ? (
              <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-white' />
            ) : (
              <>
                Create Account
                <ArrowRight className='ml-2 h-4 w-4' />
              </>
            )}
          </Button>

          <div className='text-center text-sm'>
            <p className='text-muted-foreground'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='font-medium text-primary hover:underline'
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
