"use client";

import Image from "next/image";
import { Button } from "./ui/button";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero relative bg-white">
      <div className="flex-1 pt-36 px-6 sm:px-16 max-w-[1440px] mx-auto">
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
          Find, book, rent a car—quick and super easy!
        </h1>

        <p className="text-xl text-gray-600 mt-6 max-w-lg">
          Streamline your car rental experience with our effortless booking process.
        </p>

        <Button
          className="mt-10"
          size="lg"
          onClick={handleScroll}
        >
          Explore Cars
        </Button>
      </div>
      
      <div className="relative w-full h-[500px] mt-16">
        <div className="hero__image">
          <Image src="/hero.png" alt="hero" fill className="object-contain" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </div>
    </div>
  );
};

export default Hero;