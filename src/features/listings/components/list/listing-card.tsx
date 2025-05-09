"use client";

import { useState } from "react";
import { Listing } from "../../types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteListing } from "../../actions";
import { toast } from "sonner";
import Image from "next/image";
import DeleteConfirmDialog from "./delete-confirm-dialog";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await deleteListing(listing.id);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("تم حذف السيارة بنجاح");
      router.refresh(); // Refresh the page to update the listing
    } catch (error) {
      toast.error("فشل في حذف السيارة");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className="p-4 hover:bg-accent/50 transition-colors">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-32 h-24 bg-muted rounded-md flex-shrink-0 relative overflow-hidden">
            {listing.images && listing.images.length > 0 ? (
              <Image
                src={listing.images[0]}
                alt={listing.car_name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 128px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                لا توجد صورة
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <h3 className="font-medium">{listing.car_name}</h3>
              <div className="text-primary font-bold">
                {listing.price.toLocaleString()} MRU
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {listing.description || "لا يوجد وصف"}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {listing.condition === "new" ? "جديد" : "مستعمل"}
              </span>
              <span className="text-xs bg-muted px-2 py-1 rounded-full">
                {listing.transmission === "automatic" ? "أوتوماتيك" : "يدوي"}
              </span>
              <span className="text-xs bg-muted px-2 py-1 rounded-full">
                {listing.fuel_type === "petrol"
                  ? "بنزين"
                  : listing.fuel_type === "diesel"
                  ? "ديزل"
                  : listing.fuel_type === "electric"
                  ? "كهرباء"
                  : "هجين"}
              </span>
            </div>
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/dashboard/listings/${listing.id}`)}
              >
                <Pencil className="h-4 w-4 mr-1" />
                تعديل
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash className="h-4 w-4 mr-1" />
                حذف
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </>
  );
}
