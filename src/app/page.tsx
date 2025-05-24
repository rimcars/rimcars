import { getUser, getLatestListings } from "@/app/actions";
import { HeroSection } from "@/components/hero-section-4";
import SearchBar from "@/features/home/components/search-bar";
import FeaturedCars from "@/features/home/components/featured-cars";
import Testimonials from "@/features/home/components/testimonials";
import BrandSlider from "@/components/brand-slider";
import { TestimonialsSection } from "@/features/home/components/testimonals";
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
