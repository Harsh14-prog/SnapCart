"use client";
import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";

interface IGrocery {
  _id: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
}

function GroceryItemCard({ item }: { item: IGrocery }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{ y: -4 }}
      className="
        bg-white rounded-xl
        border border-gray-200
        p-4 flex flex-col
        transition-all duration-300
        hover:shadow-xl hover:border-green-200
      "
    >
      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
        className="relative w-full h-36 mb-3"
      >
        <Image
          src={item.image}
          fill
          alt={item.name}
          className="object-contain"
          sizes="(max-width:768px) 100vw, 25vw"
        />
      </motion.div>

      {/* Info */}
      <div className="flex-1">
        <p className="text-xs text-gray-500 mb-1">{item.category}</p>

        <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">
          {item.name}
        </h3>

        <p className="text-xs text-gray-400 mt-1">{item.unit}</p>
      </div>

      {/* Price + Button */}
      <div className="mt-3 flex items-center justify-between">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="font-semibold text-green-700 text-base"
        >
          ₹{item.price}
        </motion.span>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            flex items-center gap-1
            bg-green-600 hover:bg-green-700
            text-white text-xs px-4 py-2
            rounded-full transition
            shadow-sm hover:shadow-md
          "
        >
          <ShoppingCart size={14} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

export default GroceryItemCard;
