import { cn } from "@/lib/utils";
import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
}

export default function PageContainer({
  children,
  className,
  scrollable = false,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        "flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6",
        scrollable && "overflow-auto",
        className
      )}
    >
      {children}
    </main>
  );
}
