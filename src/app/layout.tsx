import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/components/layout/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ahmed Abdellahi Abdat - Portfolio",
  description: "Full Stack Developer specializing in modern web applications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <Toaster
            richColors
            position="top-center"
            theme="system"
            duration={2000}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
