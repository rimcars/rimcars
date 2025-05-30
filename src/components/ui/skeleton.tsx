import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

/**
 * Reusable Car Card Skeleton component
 * Matches the structure of the CarCard component used in featured cars and listings
 */
function CarCardSkeleton() {
  return (
    <div className="overflow-hidden transition-all duration-300 bg-background border shadow-sm rounded-lg">
      {/* Car Image Skeleton with overlays */}
      <div className="relative h-48 w-full">
        <Skeleton className="h-full w-full" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-12" /> {/* Year badge */}
            <Skeleton className="h-6 w-10" /> {/* Condition badge */}
          </div>
          <Skeleton className="h-8 w-8 rounded-full" /> {/* Favorite button */}
        </div>

        {/* Quick view button */}
        <div className="absolute bottom-3 right-3">
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Brand and model */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16" /> {/* Brand badge */}
          <Skeleton className="h-4 w-20" /> {/* Model */}
        </div>

        {/* Title and Price */}
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-32" /> {/* Car name */}
          <div className="text-right">
            <Skeleton className="h-6 w-20" /> {/* Price */}
          </div>
        </div>

        {/* Compact specifications row */}
        <div className="flex items-center justify-between pt-3 border-t">
          <Skeleton className="h-4 w-12" /> {/* Mileage */}
          <Skeleton className="h-4 w-12" /> {/* Year */}
          <Skeleton className="h-4 w-12" /> {/* Fuel */}
          <Skeleton className="h-4 w-12" /> {/* Transmission */}
        </div>

        {/* Location */}
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Card Footer with buttons */}
      <div className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-10 w-full" /> {/* Details button */}
          <Skeleton className="h-10 w-full" /> {/* Contact button */}
        </div>
      </div>
    </div>
  );
}

export { Skeleton, CarCardSkeleton };
