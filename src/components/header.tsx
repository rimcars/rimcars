"use client";
import Link from "next/link";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/actions";
import { Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  user: User | null;
  userDetails?: {
    avatar_url?: string;
  } | null;
}

export default function Header({ user, userDetails }: HeaderProps) {
  const router = useRouter();
  const navItems = [
    { name: "الرئيسية", href: "/" },
    { name: "السيارات", href: "/cars" },
    { name: "من نحن", href: "#about" },
    { name: "اتصل بنا", href: "#contact" },
  ];
  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
      toast.success("تم تسجيل الخروج بنجاح");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("فشل تسجيل الخروج");
    }
  };
  const Logo = ({ className }: { className?: string }) => {
    return (
      <Image
        src="/rimcars-logo.png"
        alt="RIMCARS Logo"
        width={120}
        height={40}
        className={cn("h-auto w-auto", className)}
      />
    );
  };
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
             <Logo/>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link 
                href="/favorites" 
                className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
              >
                <Heart className="h-4 w-4" />
                <span>المفضلة</span>
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />

          {!user && (
            <Link href="/login">
              <Button>تسجيل الدخول</Button>
            </Link>
          )}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="overflow-hidden rounded-full">
                {userDetails?.avatar_url ? (
                  <Image
                    src={userDetails.avatar_url}
                    alt="الصورة الشخصية"
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {user.email?.[0].toUpperCase() || "م"}
                  </div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="text-right">
                {user.role === "seller" && (
                  <>
                    <DropdownMenuItem>
                      <Link href="/dashboard" className="w-full">لوحة التحكم</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard/settings" className="w-full">الإعدادات</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">الملف الشخصي</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/favorites" className="w-full">المفضلة</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer justify-end w-full text-red-500"
                >
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
