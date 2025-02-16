'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';

export default function GithubSignInButton() {
  const handleGithubSignIn = () => {
    // TODO: Implement Supabase GitHub authentication later
    toast.info('GitHub authentication will be implemented with Supabase soon!');
  };

  return (
    <Button
      className='w-full'
      variant='outline'
      type='button'
      onClick={handleGithubSignIn}
      disabled
    >
      <Icons.gitHub className='mr-2 h-4 w-4' />
      Continue with Github
    </Button>
  );
}
