import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface Car {
  id: string;
  car_name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  condition: string;
  images: string[];
}

interface FeaturedCarsProps {
  cars: Car[];
}

export default function FeaturedCars({ cars }: FeaturedCarsProps) {
  return (
    <section className="py-16 bg-muted/40">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Featured Vehicles</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our hand-picked selection of premium vehicles
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={car.images[0] || '/car-placeholder.jpg'}
                  alt={car.car_name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                <Badge 
                  variant={car.condition === 'new' ? 'default' : 'secondary'} 
                  className="absolute top-2 right-2"
                >
                  {car.condition === 'new' ? 'New' : 'Used'}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg truncate">{car.car_name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {car.make} {car.model} {car.year}
                </p>
                <p className="font-bold text-lg">${car.price.toLocaleString()}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/cars/${car.id}`} className="w-full">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/cars">
            <Button size="lg">View All Listings</Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 