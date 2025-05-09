import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeroProps {
  isLoggedIn: boolean;
}

export default function Hero({ isLoggedIn }: HeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Blue background image */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="Background"
          src="/hero-bg.png"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Content section */}
          <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
              <span className="block">Find Your Dream Car</span>
              <span className="block text-foreground">at RimCars</span>
            </h1>
            <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl">
              Browse our extensive collection of premium vehicles. From sleek sedans to rugged SUVs, 
              find the perfect match for your lifestyle and budget.
            </p>
            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:gap-3">
              <div className="rounded-md shadow">
                <Link href="/cars">
                  <Button size="lg" className="px-8 py-3 text-lg">
                    Browse Cars
                  </Button>
                </Link>
              </div>
              <div className="mt-3 sm:mt-0">
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
          
          {/* Car image section */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                alt="SUV car"
                src="/hero.jpg"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 