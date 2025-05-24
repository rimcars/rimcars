import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/components/layout/providers";
import { tajawal, cairo, almarai } from "./font/font";
import Footer from "@/components/footer-section";
import Header from "@/components/header";
import { getUser, getUserProfile } from "@/app/actions";

export const metadata: Metadata = {
  title: "سيارات الريم - منصة بيع وشراء السيارات",
  description: "منصة متخصصة في بيع وشراء السيارات في موريتانيا",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const userDetails = user ? await getUserProfile(user.id) : null;

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
          <Header user={user} userDetails={userDetails} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
