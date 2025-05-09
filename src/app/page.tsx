import { getUser } from "@/app/actions";
import Link from "next/link";
import Hero from "@/components/hero";
import Header from "@/components/header";
import SearchBar from "@/components/search-bar";
import FeaturedCars from "@/components/featured-cars";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";

async function getFeaturedCars() {
  // This would typically fetch from your database
  // For now, we'll use mock data
  return [
    {
      id: "1",
      car_name: "BMW 3 Series",
      make: "BMW",
      model: "3 Series",
      year: 2023,
      price: 45000,
      condition: "new",
      images: ["/car-placeholder.jpg"]
    },
    {
      id: "2",
      car_name: "Mercedes-Benz C-Class",
      make: "Mercedes-Benz",
      model: "C-Class",
      year: 2022,
      price: 42000,
      condition: "used",
      images: ["/car-placeholder.jpg"]
    },
    {
      id: "3",
      car_name: "Audi A4",
      make: "Audi",
      model: "A4",
      year: 2023,
      price: 39000,
      condition: "new",
      images: ["/car-placeholder.jpg"]
    }
  ];
}

export default async function Home() {
  const user = await getUser();
  const featuredCars = await getFeaturedCars();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      
      <main className="flex-1">
        <Hero isLoggedIn={!!user} />
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <SearchBar />
        </div>
        <FeaturedCars cars={featuredCars} />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
