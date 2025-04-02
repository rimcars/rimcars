import AddListingButton from "./add-listing-button";

export default function EmptyState() {
  return (
    <div className="bg-card rounded-lg shadow p-8 text-center">
      <p>لا توجد قوائم حالياً</p>
      <div className="mt-4">
        <AddListingButton />
      </div>
    </div>
  );
}
