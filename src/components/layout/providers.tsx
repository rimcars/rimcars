'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // prevents theme flash on initial load
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
      storageKey='theme-preference'
    >
      {children}
    </ThemeProvider>
  );
}
