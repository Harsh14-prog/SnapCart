"use client";

import { RootState } from "@/redux/store";
import { ShoppingBasket, Truck, Leaf, Clock } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HeroSection = () => {

 const userData = useSelector(
  (state: RootState) => state.user.userData
);

// console.log(userData)

  const slides = [
    {
      title: "Groceries in 10 Minutes ⚡",
      subtitle: "Fresh vegetables, fruits & essentials delivered fast",
      bg: "https://images.unsplash.com/photo-1543168256-418811576931",
    },
    {
      title: "Farm Fresh & Organic 🥦",
      subtitle: "Hand-picked groceries from trusted sellers",
      bg: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    },
    {
      title: "Daily Needs, Delivered 🚚",
      subtitle: "Affordable, fast and reliable grocery delivery",
      bg: "https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const i = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      3500
    );
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative w-[95%] mx-auto mt-32 h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
      {/* ✅ FIXED SLIDE BACKGROUND (no unmount = no white flash) */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{ opacity: index === current ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={slide.bg}
              fill
              alt="bg"
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
          </motion.div>
        ))}
      </div>

      {/* content (UNCHANGED) */}
      <div className="absolute inset-0 flex items-center justify-center text-white text-center px-6">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center gap-6 max-w-3xl"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold">
            {slides[current].title}
          </h1>

          <p className="text-lg text-gray-200">
            {slides[current].subtitle}
          </p>

          <button
            className="
              bg-green-500 text-white px-10 py-4 rounded-full font-semibold
              shadow-xl hover:shadow-[0_0_40px_rgba(34,197,94,0.7)]
              hover:scale-105 transition-all
            "
          >
            <ShoppingBasket className="inline mr-2" />
            Start Shopping
          </button>

          {/* trust pills */}
          <div className="flex gap-4 mt-6 flex-wrap justify-center">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <Clock size={16} /> 10 min delivery
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <Leaf size={16} /> Fresh items
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <Truck size={16} /> Free delivery
            </span>
          </div>
        </motion.div>
      </div>

      {/* progress bar (UNCHANGED) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          key={current}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.5, ease: "linear" }}
          className="h-full bg-green-400"
        />
      </div>
    </div>
  );
};

export default HeroSection;
