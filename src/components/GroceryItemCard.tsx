"use client";
import React from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { addToCart , decreaseQuantity, increaseQuantity } from "@/redux/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface IGrocery {
  _id: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
}

function GroceryItemCard({ item }: { item: IGrocery }) {
  const dispatch = useDispatch<AppDispatch>();
  const { cartData } = useSelector((state: RootState) => state.cart);

  const cartItem = cartData.find((i) => i._id == item._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="
        bg-white rounded-2xl
        border border-gray-200
        p-3 sm:p-4 flex flex-col
        transition-all duration-300
        hover:shadow-lg hover:border-green-200
      "
    >
      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="relative aspect-4/3 w-full mb-2"
      >
        <Image
          src={item.image}
          fill
          alt={item.name}
          className="object-contain"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </motion.div>

      {/* Info */}
      <div className="flex-1">
        <p className="text-xs text-gray-500 mb-0.5">{item.category}</p>

        <h3 className="text-sm sm:text-base font-medium text-gray-800 leading-snug line-clamp-2">
          {item.name}
        </h3>

        <p className="text-xs text-gray-400 mt-0.5">{item.unit}</p>
      </div>

      {/* Price + Button */}
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="font-semibold text-green-700 text-base sm:text-lg">
          ₹{item.price}
        </span>

        {!cartItem ? (
          <motion.button
            onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
            flex items-center justify-center gap-1
            bg-green-600 hover:bg-green-700
            text-white text-xs sm:text-sm
            px-3 sm:px-4 py-2
            rounded-full transition
            shadow-sm hover:shadow-md
            whitespace-nowrap
            min-w-24 sm:min-w-30
          "
          >
            <ShoppingCart size={14} />
            Add
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex items-center justify-center bg-green-50 border border-green-200 rounded-full py-2 px-4 gap-4"
          >
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition-all"
              onClick={() => dispatch(decreaseQuantity(item._id))}
            >
              <Minus size={16} className="text-green-700" />
            </button>
            <span className="text-sm font-semibold text-gray-800">
              {cartItem.quantity}
            </span>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition-all"
              onClick={() => dispatch(increaseQuantity(item._id))}
            >
              <Plus size={16} className="text-green-700" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default GroceryItemCard;
