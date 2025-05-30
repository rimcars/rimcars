"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/actions";
import type { DatabaseUser } from "@/types";
import {
  Heart,
  User as UserIcon,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { FavoritesCounter } from "@/features/favorites";
import { UserMenu } from "./UserMenu";
import { UserAvatar } from "@/components/ui/user-avatar";
import { MobileNavigation } from "./MobileNavigation";

interface HeaderProps {
  user: DatabaseUser | null;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();

  const navItems = [
    { name: "الرئيسية", href: "/", icon: null },
    { name: "السيارات", href: "/cars", icon: null },
    { name: "من نحن", href: "#about", icon: null },
    { name: "اتصل بنا", href: "#contact", icon: null },
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
        priority
      />
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left Side: Logo (for RTL mobile) */}
        <div className="flex items-center">
          {/* Logo - Always visible on left for mobile */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>

        {/* Center: Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 hover:scale-105 transform"
            >
              {item.name}
            </Link>
          ))}

          {/* Desktop Favorites */}
          <Link
            href="/favorites"
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200"
          >
            <FavoritesCounter asLink={false} showLabel={true} />
          </Link>
        </nav>

        {/* Right Side: User Menu + Hamburger (mobile) + Desktop Actions */}
        <div className="flex items-center gap-3">
          {/* Mobile User Dropdown Menu */}
          {user && (
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative rounded-full p-0 h-10 w-10"
                    aria-label="قائمة المستخدم"
                  >
                    <UserAvatar
                      imageUrl={user.avatar_url}
                      name={user.name}
                      email={user.email}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 sm:w-64 p-0 shadow-xl border border-muted-foreground/10"
                  sideOffset={4}
                  avoidCollisions={true}
                  collisionPadding={16}
                >
                  {/* User Info Header */}
                  <div className="p-4 border-b bg-muted/30">
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        imageUrl={user.avatar_url}
                        name={user.name}
                        email={user.email}
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-none truncate">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground mt-1 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2" dir="rtl">
                    {/* Seller Options */}
                    {user.role === "seller" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 cursor-pointer w-full px-3 py-2 rounded-md hover:bg-muted/80 transition-colors"
                          >
                            <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">لوحة التحكم</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-3 cursor-pointer w-full px-3 py-2 rounded-md hover:bg-muted/80 transition-colors"
                          >
                            <Settings className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">الإعدادات</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1" />
                      </>
                    )}

                    {/* Common User Options */}
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 cursor-pointer w-full px-3 py-2 rounded-md hover:bg-muted/80 transition-colors"
                      >
                        <UserIcon className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">الملف الشخصي</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/favorites"
                        className="flex items-center gap-3 cursor-pointer w-full px-3 py-2 rounded-md hover:bg-muted/80 transition-colors"
                      >
                        <Heart className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">المفضلة</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-1" />

                    {/* Logout */}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-3 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 w-full px-3 py-2 rounded-md hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">تسجيل الخروج</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-muted/80 transition-colors"
                  aria-label="فتح القائمة"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 p-0 border-l-0 shadow-2xl overflow-hidden"
              >
                <SheetDescription className="sr-only">
                  قائمة التنقل الرئيسية للهاتف المحمول
                </SheetDescription>
                <MobileNavigation
                  user={user}
                  navItems={navItems}
                  onLogout={handleLogout}
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden md:block">
            <ModeToggle />
          </div>

          {/* Desktop User Actions - Now using the simplified UserMenu component */}
          <div className="hidden md:block">
            <UserMenu user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
