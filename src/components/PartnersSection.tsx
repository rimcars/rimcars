"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 100 }
  },
}

export function PartnersSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <p className="text-center text-[17px] text-[#A1A1AA] mb-16">
          CarMarket works with <span className="text-white underline underline-offset-4">Premium Car Brands</span>,
          Dealerships & Enterprises
        </p>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20%" }}
        >
          {[
            { src: "/bmw_logo.png", alt: "BMW" },
            { src: "/mercedes-logo.png", alt: "Mercedes" },
            { src: "/audi-logo.png", alt: "Audi" },
            { src: "/porche-logo.png", alt: "Porsche" },
           
          
            { src: "/placeholder.svg", alt: "Lexus" },
            { src: "/placeholder.svg", alt: "Tesla" },
          ].map((brand, index) => (
            <motion.div 
              key={index} 
              variants={item} 
              className="w-full max-w-[200px] h-12 relative"
            >
              <Image
                src={brand.src || "/placeholder.svg"}
                alt={brand.alt}
                fill
                className="object-contain brightness-200 hover:brightness-100 transition-all hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

