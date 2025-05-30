import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
  spinnerVariant?:
    | "default"
    | "circle"
    | "pinwheel"
    | "circle-filled"
    | "ellipsis"
    | "ring"
    | "bars"
    | "infinite";
  children: React.ReactNode;
}

/**
 * Enhanced Button component with loading state and spinner
 * Perfect for form submissions, API calls, etc.
 */
export function LoadingButton({
  loading = false,
  spinnerVariant = "circle",
  disabled,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      className={cn("relative", loading && "cursor-not-allowed", className)}
      {...props}
    >
      {loading && (
        <Spinner
          variant={spinnerVariant}
          size={16}
          className="mr-2 text-current"
        />
      )}
      <span className={cn(loading && "opacity-70")}>{children}</span>
    </Button>
  );
}

/**
 * Demo showing different use cases for LoadingButton
 */
export function LoadingButtonDemo() {
  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold">أمثلة على أزرار التحميل</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Form Submit */}
        <LoadingButton loading={true} spinnerVariant="circle">
          إرسال البيانات
        </LoadingButton>

        {/* Car Search */}
        <LoadingButton loading={true} spinnerVariant="ring" variant="outline">
          البحث عن السيارات
        </LoadingButton>

        {/* Add to Favorites */}
        <LoadingButton
          loading={true}
          spinnerVariant="circle-filled"
          variant="secondary"
        >
          إضافة للمفضلة
        </LoadingButton>

        {/* Load More Cars */}
        <LoadingButton loading={true} spinnerVariant="bars" variant="ghost">
          تحميل المزيد من السيارات
        </LoadingButton>
      </div>
    </div>
  );
}
