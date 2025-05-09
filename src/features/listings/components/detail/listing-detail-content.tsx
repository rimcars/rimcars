import { getListingById } from "../../actions";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ListingForm from "./listing-form";
import BackButton from "./back-button";
import { getUser } from "@/app/actions";

interface ListingDetailContentProps {
  listingId: string;
  formAction: (formData: FormData) => Promise<{
    data?: any;
    error: string | null;
  }>;
}

export default async function ListingDetailContent({
  listingId,
  formAction,
}: ListingDetailContentProps) {
  // Server-side data fetching
  const isNew = listingId === "new";
  let listingData = null;
  const currentUser = await getUser();

  if (!isNew) {
    const result = await getListingById(listingId);
    if (result.error) {
      throw new Error(result.error);
    }
    listingData = result.data;
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <Heading
            title={isNew ? "إضافة سيارة جديدة" : "تعديل السيارة"}
            description={
              isNew ? "أضف سيارة جديدة للبيع." : "عدل بيانات السيارة المعروضة."
            }
          />
        </div>
      </div>
      <Separator />
      <ListingForm
        initialData={listingData}
        action={formAction}
        currentUser={currentUser}
      />
    </div>
  );
}
