import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPublicListingById } from "@/features/public-listings/actions";
import { convertListingToUiCar } from "@/features/public-listings/types";
import { CarDetailsClient } from "@/features/public-listings/components/car-details-client";

export const dynamic = "force-dynamic";

// Generate dynamic metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Fetch car data
  const { data: listing } = await getPublicListingById(params.id);

  if (!listing) {
    return {
      title: "سيارة غير موجودة",
      description: "لم يتم العثور على السيارة المطلوبة",
    };
  }

  return {
    title: `${listing.car_name} - تفاصيل السيارة`,
    description: listing.description || `تفاصيل ${listing.car_name}`,
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch car data
  const { data: listing, error } = await getPublicListingById(params.id);

  // If car not found, show 404 page
  if (!listing || error) {
    notFound();
  }

  // Convert listing to UI car format
  const car = convertListingToUiCar(listing);

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="container py-10">Loading...</div>}>
        <CarDetailsClient car={car} />
      </Suspense>
    </div>
  );
}
