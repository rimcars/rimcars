import React from 'react';
import ThemeToggle from './ThemeToggle/theme-toggle';

export default function Header() {
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <ThemeToggle />
    </header>
  );
}
