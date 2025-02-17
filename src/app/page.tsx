import { ModeToggle } from "@/components/mode-toggle";
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";

export default function Home() {
  return (
    <section className="flex justify-center items-center h-screen">
      <ModeToggle />

      <h1>Hello World</h1>

      <ThemeToggle />
    </section>
  );
}
