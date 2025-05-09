import { getUser, getLatestListings } from "@/app/actions";
import { HeroSection } from "@/components/hero-section-4";
import Header from "@/components/header";
import SearchBar from "@/features/home/components/search-bar";
import FeaturedCars from "@/features/home/components/featured-cars";
import Testimonials from "@/features/home/components/testimonials";
import Footer from "@/components/footer";
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
      {/* <Header user={user} /> */}
      <main className="flex-1">
        <HeroSection />
        <BrandSlider />
        <FeaturedCars cars={cars} />
        {/* <div className="container mx-auto px-4 -mt-8 relative z-10">
          <SearchBar />
        </div> */}
        <TestimonialsSection
          title={testimonialsSectionData.title}
          description={testimonialsSectionData.description}
          testimonials={testimonialsSectionData.testimonials}
        />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
