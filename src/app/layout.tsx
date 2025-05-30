import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/components/layout/providers";
import { tajawal, cairo, almarai } from "./font/font";
import StagewiseDevToolbar from "@/components/dev/stagewise-dev-toolbar";

export const metadata: Metadata = {
  title: "بورصتي - منصة بيع وشراء السيارات",
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
          <Toaster richColors position="top-center" duration={2000} />
          {children}
          {/* Stagewise dev toolbar - only loads in development */}
          <StagewiseDevToolbar />
        </Providers>
      </body>
    </html>
  );
}
