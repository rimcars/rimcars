"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function FloatingCar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full h-[400px] md:h-[500px] flex justify-center items-center relative"
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative w-full max-w-[800px] h-full"
      >
        <Image src="/BM.jpg" alt="BMW Luxury Car" fill className="object-contain" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent bottom-0 h-20" />
      </motion.div>
    </motion.div>
  )
}

