import Image from "next/image";
import { getUser } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left side - Auth form */}
      <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-background">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            src="/logo.png"
            alt="Avaque"
            width={48}
            height={48}
            className="mx-auto h-12 w-auto"
            priority
          />
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[450px]">
          <div className="bg-card px-4 py-4 shadow-sm ring-1 ring-border/5 sm:rounded-xl sm:px-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
