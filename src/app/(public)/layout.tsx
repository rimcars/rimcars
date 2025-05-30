import Header from "@/components/layout/header/main";
import { Footer } from "@/components/layout/footer";
import { getUserWithProfile } from "@/app/actions";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get user data for the header
  const user = await getUserWithProfile();

  return (
    <>
      <Header user={user} />
      {children}
      <Footer />
    </>
  );
} 