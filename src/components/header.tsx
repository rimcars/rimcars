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
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { FavoritesCounter } from "@/features/favorites";

interface HeaderProps {
  user: User | null;
  userDetails?: {
    avatar_url?: string;
  } | null;
}

export default function Header({ user, userDetails }: HeaderProps) {
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

  const UserAvatar = ({ size = "sm" }: { size?: "sm" | "md" }) => {
    const avatarClasses = size === "md" ? "h-10 w-10" : "h-9 w-9";
    const displayName = user?.email?.split("@")[0] || user?.email || "مستخدم";

    if (userDetails?.avatar_url) {
      return (
        <Image
          src={userDetails.avatar_url}
          alt="الصورة الشخصية"
          width={size === "md" ? 40 : 36}
          height={size === "md" ? 40 : 36}
          className={`${avatarClasses} rounded-full object-cover border-2 border-white shadow-md`}
        />
      );
    }

    return (
      <div
        className={`${avatarClasses} flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white font-bold border-2 border-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer`}
      >
        <span className="text-sm font-bold">
          {displayName.charAt(0).toUpperCase()}
        </span>
      </div>
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
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative rounded-full p-0 h-10 w-10"
                    aria-label="قائمة المستخدم"
                  >
                    <UserAvatar />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 p-0 shadow-xl border border-muted-foreground/10"
                  sideOffset={8}
                  alignOffset={-8}
                >
                  {/* User Info Header */}
                  <div className="p-4 border-b bg-muted/30">
                    <div className="flex items-center gap-3">
                      <UserAvatar size="md" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-none truncate">
                          {user.email?.split("@")[0] || "مستخدم"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground mt-1 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    {/* Seller Options */}
                    {user.role === "seller" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 cursor-pointer w-full px-3 py-2"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            <span>لوحة التحكم</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-3 cursor-pointer w-full px-3 py-2"
                          >
                            <Settings className="h-4 w-4" />
                            <span>الإعدادات</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}

                    {/* Common User Options */}
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 cursor-pointer w-full px-3 py-2"
                      >
                        <UserIcon className="h-4 w-4" />
                        <span>الملف الشخصي</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/favorites"
                        className="flex items-center gap-3 cursor-pointer w-full px-3 py-2"
                      >
                        <Heart className="h-4 w-4" />
                        <span>المفضلة</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Logout */}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-3 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 w-full px-3 py-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>تسجيل الخروج</span>
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
                side="right"
                className="w-80 p-0 border-l-0 shadow-2xl overflow-hidden"
              >
                <div className="flex flex-col h-full max-h-screen bg-background">
                  {/* Sheet Header - Fixed */}
                  <SheetHeader className="p-6 border-b bg-muted/30 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <Logo className="w-24" />
                      <div className="flex-1" />
                      <ModeToggle />
                    </div>
                    <SheetTitle className="text-right text-lg font-bold text-foreground">
                      قائمة التنقل
                    </SheetTitle>
                  </SheetHeader>

                  {/* Scrollable Content Area */}
                  <div className="flex-1 overflow-y-auto">
                    {/* User Profile Section (if logged in) */}
                    {user && (
                      <div className="p-6 border-b bg-muted/10 flex-shrink-0">
                        <div className="flex items-center gap-3 p-4 rounded-lg bg-background border shadow-sm">
                          <UserAvatar size="md" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {user.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {user.role === "seller" ? "بائع" : "مشتري"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Items */}
                    <nav className="p-6">
                      <div className="space-y-1">
                        {navItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-muted/80 transition-all duration-200 hover:translate-x-1"
                          >
                            <span>{item.name}</span>
                          </Link>
                        ))}

                        {/* Favorites with Counter */}
                        <Link
                          href="/favorites"
                          className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-muted/80 transition-all duration-200 hover:translate-x-1"
                        >
                          <Heart className="h-4 w-4" />
                          <span>المفضلة</span>
                          <FavoritesCounter asLink={false} showLabel={false} />
                        </Link>
                      </div>
                    </nav>
                  </div>

                  {/* User Section - Fixed at bottom */}
                  <div className="border-t bg-muted/20 p-6 flex-shrink-0">
                    {!user ? (
                      <div className="space-y-3">
                        <Link href="/login" className="w-full">
                          <Button className="w-full h-11 font-medium">
                            تسجيل الدخول
                          </Button>
                        </Link>
                        <Link href="/signup" className="w-full">
                          <Button
                            variant="outline"
                            className="w-full h-11 font-medium"
                          >
                            إنشاء حساب جديد
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {/* User Actions */}
                        {user.role === "seller" && (
                          <>
                            <Link href="/dashboard" className="w-full">
                              <Button
                                variant="outline"
                                className="w-full justify-start gap-3 h-10"
                              >
                                <LayoutDashboard className="h-4 w-4" />
                                لوحة التحكم
                              </Button>
                            </Link>
                            <Link href="/dashboard/settings" className="w-full">
                              <Button
                                variant="outline"
                                className="w-full justify-start gap-3 h-10"
                              >
                                <Settings className="h-4 w-4" />
                                الإعدادات
                              </Button>
                            </Link>
                          </>
                        )}

                        <Link href="/profile" className="w-full">
                          <Button
                            variant="outline"
                            className="w-full justify-start gap-3 h-10"
                          >
                            <UserIcon className="h-4 w-4" />
                            الملف الشخصي
                          </Button>
                        </Link>

                        <Link href="/favorites" className="w-full">
                          <Button
                            variant="outline"
                            className="w-full justify-start gap-3 h-10"
                          >
                            <Heart className="h-4 w-4" />
                            المفضلة
                          </Button>
                        </Link>

                        <Button
                          onClick={handleLogout}
                          variant="destructive"
                          className="w-full justify-start gap-3 h-10 mt-4"
                        >
                          <LogOut className="h-4 w-4" />
                          تسجيل الخروج
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden md:block">
            <ModeToggle />
          </div>

          {/* Desktop User Actions */}
          {!user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="font-medium">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="font-medium">إنشاء حساب</Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:block">
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative rounded-full p-0 h-10 w-10"
                    aria-label="قائمة المستخدم"
                  >
                    <UserAvatar />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 p-0 shadow-xl border border-muted-foreground/10"
                  sideOffset={8}
                >
                  {/* User Info Header */}
                  <div className="p-4 border-b bg-muted/30">
                    <div className="flex items-center gap-3">
                      <UserAvatar size="md" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-none truncate">
                          {user.email?.split("@")[0] || "مستخدم"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground mt-1 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    {/* Seller Options */}
                    {user.role === "seller" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 cursor-pointer w-full px-3 py-2"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            <span>لوحة التحكم</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-3 cursor-pointer w-full px-3 py-2"
                          >
                            <Settings className="h-4 w-4" />
                            <span>الإعدادات</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}

                    {/* Common User Options */}
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 cursor-pointer w-full px-3 py-2"
                      >
                        <UserIcon className="h-4 w-4" />
                        <span>الملف الشخصي</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/favorites"
                        className="flex items-center gap-3 cursor-pointer w-full px-3 py-2"
                      >
                        <Heart className="h-4 w-4" />
                        <span>المفضلة</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Logout */}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-3 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 w-full px-3 py-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>تسجيل الخروج</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
