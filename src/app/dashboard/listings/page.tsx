export const dynamic = "force-dynamic";

import PageContainer from "@/components/layout/page-container";
import { getUserListings } from "@/features/listings/actions";
import SearchBar from "@/features/listings/components/list/search-bar";
import AddListingButton from "@/features/listings/components/list/add-listing-button";
import EmptyState from "@/features/listings/components/list/empty-state";
import ListingsGrid from "@/features/listings/components/list/listings-grid";
import { Listing } from "@/features/listings/types";

export const metadata = {
  title: "Dashboard : Listings",
};

export default async function ListingsPage() {
  // Fetch listings directly on the server
  const { data, error } = await getUserListings();

  // Ensure we always have an array
  const listings: Listing[] = data || [];

  return (
    <PageContainer>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">القوائم</h1>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <SearchBar listings={listings} />
            <AddListingButton />
          </div>
        </div>

        {listings.length === 0 ? (
          <EmptyState />
        ) : (
          <ListingsGrid listings={listings} />
        )}
      </div>
    </PageContainer>
  );
}
