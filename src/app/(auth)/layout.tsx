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
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-12">
          <Image
            src="/rimcars-logo.png"
            alt="RimCars"
            width={320}
            height={100}
            className="mx-auto h-32 w-auto"
            priority
          />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-[450px]">
          <div className="bg-card px-6 py-8 shadow-sm ring-1 ring-border/5 sm:rounded-xl sm:px-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
