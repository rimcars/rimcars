import { getUser } from "@/app/actions";
import { getLatestListings } from "@/features/public-listings/actions";
import { HeroSection } from "@/features/home/components/hero-section";
import FeaturedCars from "@/features/home/components/featured-cars";
import BrandSlider from "@/features/home/components/BrandSlider";
import { TestimonialsSection } from "@/features/home/components/testimonials";
import { testimonialsSectionData } from "@/features/home/components/testimonials-data";

export default async function Home() {
  const user = await getUser();
  const featuredCars = await getLatestListings();
  const cars = featuredCars.map((car) => ({
    ...car,
    make: car.make ?? "",
    model: car.model ?? "",
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection user={user} />
        <BrandSlider />
        <FeaturedCars cars={cars} />
        <TestimonialsSection
          title={testimonialsSectionData.title}
          description={testimonialsSectionData.description}
          testimonials={testimonialsSectionData.testimonials}
        />
      </main>
    </div>
  );
}
