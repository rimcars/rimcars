"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.push("/dashboard/listings")}
      className="h-8 w-8"
      title="العودة إلى القائمة"
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
}
