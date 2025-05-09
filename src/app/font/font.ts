import { Tajawal, Roboto, Cairo, Almarai } from "next/font/google";

export const tajawal = Tajawal({
  weight: ["400", "500", "700"],
  subsets: ["arabic"],
  variable: "--font-tajawal",
});

// cairo

export const cairo = Cairo({
  weight: ["400", "500", "700"],
  subsets: ["arabic"],
  variable: "--font-cairo",
});

export const almarai = Almarai({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-almarai",
});

export const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});
