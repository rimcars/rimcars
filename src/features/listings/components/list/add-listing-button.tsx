"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddListingButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/dashboard/listings/new")}
      className="gap-1"
    >
      <PlusCircle className="h-4 w-4" />
      <span>إضافة سيارة</span>
    </Button>
  );
}
