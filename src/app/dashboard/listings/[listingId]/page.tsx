export const dynamic = "force-dynamic";

import PageContainer from "@/components/layout/page-container";
import { Suspense } from "react";
import FormCardSkeleton from "@/features/listings/components/form-card-skeleton";
import ListingDetailContent from "@/features/listings/components/detail/listing-detail-content";
import { handleListingFormAction } from "@/features/listings/actions";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Dashboard : Car Listing",
};

type PageProps = { params: Promise<{ listingId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;

  async function formAction(formData: FormData) {
    "use server";
    return handleListingFormAction(formData, params.listingId);
  }

  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <ListingDetailContent
            listingId={params.listingId}
            formAction={formAction}
          />
        </Suspense>
      </div>
    </PageContainer>
  );
}
