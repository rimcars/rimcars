import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/components/layout/providers";
import { tajawal, cairo, almarai } from "./font/font";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "سيارات الريم - منصة بيع وشراء السيارات",
  description: "منصة متخصصة في بيع وشراء السيارات في موريتانيا",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${almarai.variable} ${tajawal.variable} ${cairo.variable} font-almarai`}
      >
        <Providers>
          <Toaster
            richColors
            position="top-center"
            theme="system"
            duration={2000}
          />
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
