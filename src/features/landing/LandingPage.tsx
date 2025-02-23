"use client";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { FloatingCar } from "@/components/FloatingCar";
import { PartnersSection } from "@/components/PartnersSection";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function LandingPage() {

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                      Accelerate Your Journey with Exceptional Cars
            </h1>
            <p className="text-[17px] md:text-xl text-[#A1A1AA] mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover your ideal ride from our premium selection of vehicles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-white hover:bg-white/90 text-black text-base font-medium px-8">
                <Link href="/list-car">
                  List A car →
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base font-medium px-8 border-white/20 hover:bg-white/10"
              >
                <Link href="/view-cars">
                  View Cars →
                </Link>
              </Button>
            </div>
            <FloatingCar />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Main Content Section */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 tracking-tight">
            Join the Future of Car Selling
          </h2>
          <p className="text-center text-[17px] text-[#A1A1AA] max-w-3xl mx-auto mb-12 leading-relaxed">
            Experience a seamless and efficient way to sell your car with our innovative platform.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="bg-[#6B4276] hover:bg-[#6B4276]/90 text-white font-medium px-8">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Image src="/icon1.png" alt='feature1Title' width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-500">Browse through a vast range of cars to find the perfect match for you.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Image src="/icon2.png" alt='feature2Title' width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold mb-2">Trusted Reviews</h3>
              <p className="text-gray-500">Read reviews from other buyers to make informed decisions.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Image src="/icon3.png" alt='feature3Title' width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-500">Enjoy safe and secure transactions with our trusted payment methods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold">Ready to Sell Your Car?</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Join our community of satisfied car sellers today!
            </p>
            <Link href="/sign-up">
              <Button className="bg-primary text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
    </div>
  )
}

