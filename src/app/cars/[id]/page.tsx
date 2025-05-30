import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPublicListingById } from "@/features/public-listings/actions";
import { convertListingToUiCar } from "@/features/public-listings/types";
import { CarDetailsClient } from "@/features/public-listings/components/car-details-client";

// Make dynamic to support future search params filtering
export const dynamic = "force-dynamic";

// Generate dynamic metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // Await params to get the actual values
  const { id } = await params;

  // Fetch car data using public client
  const { data: listing, error } = await getPublicListingById(id);

  if (!listing || error) {
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
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await params to get the actual values
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  // Fetch car data using public client (still fast, just not cached)
  const { data: listing, error } = await getPublicListingById(id);

  // If car not found or error, show 404 page
  if (!listing || error) {
    console.error("Failed to fetch car details:", error);
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
