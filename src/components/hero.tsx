import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeroProps {
  isLoggedIn: boolean;
}

export default function Hero({ isLoggedIn }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-background pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
                <span className="block">Find Your Dream Car</span>
                <span className="block text-foreground">at RimCars</span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Browse our extensive collection of premium vehicles. From sleek sedans to rugged SUVs, 
                find the perfect match for your lifestyle and budget.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/cars">
                    <Button size="lg" className="px-8 py-3 text-lg">
                      Browse Cars
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  {!isLoggedIn && (
                    <Link href="/auth">
                      <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                        Sell Your Car
                      </Button>
                    </Link>
                  )}
                  {isLoggedIn && (
                    <Link href="/dashboard/listings/new">
                      <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                        Sell Your Car
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-64 w-full sm:h-72 md:h-96 lg:h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10 lg:hidden"></div>
          <Image
            alt="Luxury car"
            src="/car-hero.jpg"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
} 