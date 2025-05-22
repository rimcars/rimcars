"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react"

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = React.useState(true)
  const [isChatOpen, setIsChatOpen] = React.useState(false)

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">ابق على تواصل</h2>
            <p className="mb-6 text-muted-foreground">
              انضم إلى نشرتنا الإخبارية للحصول على أحدث التحديثات والعروض الحصرية.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">اشتراك</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">روابط سريعة</h3>
            <nav className="space-y-2 text-sm">
              <a href="/" className="block transition-colors hover:text-primary">
                الرئيسية
              </a>
              <a href="/about" className="block transition-colors hover:text-primary">
                من نحن
              </a>
            
              <a href="#" className="block transition-colors hover:text-primary">
                اتصل بنا
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">اتصل بنا</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>١٢٣ شارع الابتكار</p>
              <p>مدينة التقنية، TC ١٢٣٤٥</p>
              <p>الهاتف: ٧٨٩٠-٤٥٦-١٢٣</p>
              <p>البريد الإلكتروني: hello@example.com</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">تابعنا</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">فيسبوك</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>تابعنا على فيسبوك</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">تويتر</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>تابعنا على تويتر</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">انستغرام</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>تابعنا على انستغرام</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">لينكد إن</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>تواصل معنا على لينكد إن</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} ريم كارز. جميع الحقوق محفوظة.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-primary">
              سياسة الخصوصية
            </a>
            <a href="/terms" className="transition-colors hover:text-primary">
              شروط الخدمة
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              إعدادات ملفات تعريف الارتباط
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

