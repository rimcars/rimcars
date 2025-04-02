import { Listing } from "../../types";
import ListingCard from "./listing-card";

interface ListingsGridProps {
  listings: Listing[];
}

export default function ListingsGrid({ listings }: ListingsGridProps) {
  return (
    <div className="bg-card rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-1 divide-y">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
