import { ModeToggle } from "@/components/mode-toggle";
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import LogoutButton from "@/components/logout-button";
import { getUser } from "@/app/actions";
import Link from "next/link";
export default async function Home() {
  const user = await getUser();
  return (
    <section className="flex justify-center items-center h-screen">
      <ModeToggle />

      <h1>Hello World</h1>
      
      <ThemeToggle />
      
      {user && <LogoutButton />}

      <Link href="/dashboard" className="block px-4 py-2 rounded-md hover:bg-accent">Dashboard</Link>
      
    </section>
    
  );
}
