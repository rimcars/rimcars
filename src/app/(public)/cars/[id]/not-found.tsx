import Link from "next/link"
import { Button } from "@/components/ui/button"


export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
    
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Car Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn&apos;t find the car you&apos;re looking for. It may have been sold or removed from our inventory.
          </p>
          <Button asChild>
            <Link href="/">Return to Inventory</Link>
          </Button>
        </div>
      </main>
     
    </div>
  )
}

