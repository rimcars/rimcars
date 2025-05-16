import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المفضلة | ريم كارز",
  description: "عرض السيارات المفضلة لديك",
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      {children}
    </main>
  );
} 