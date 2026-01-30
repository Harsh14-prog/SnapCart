"use client";

import { ArrowLeft, Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import Image from "next/image";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/cartSlice";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartData, subTotal, deliveryFee, finalTotal } = useSelector(
    (state: RootState) => state.cart,
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const FREE_DELIVERY_LIMIT = 499;
  const progress = Math.min((subTotal / FREE_DELIVERY_LIMIT) * 100, 100);
  const remaining = FREE_DELIVERY_LIMIT - subTotal;

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 pb-28">
      <div className="w-[94%] sm:w-[90%] md:w-[80%] mx-auto pt-8">
        {/* HEADER */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 font-medium mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to home</span>
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-800 mb-10"
        >
          Your Cart
        </motion.h1>

        {/* EMPTY CART */}
        {cartData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl py-24 px-6 text-center overflow-hidden"
          >
            {/* soft background glow */}
            <div className="absolute inset-0 bg-linear-to-br from-green-100/40 via-transparent to-green-200/40" />

            {/* floating icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-white shadow-lg flex items-center justify-center"
            >
              <ShoppingBasket className="w-10 h-10 text-green-600" />
            </motion.div>

            <h2 className="relative z-10 text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
              Your cart is empty
            </h2>

            <p className="relative z-10 text-gray-600 max-w-sm mx-auto mb-8 text-base sm:text-lg">
              Looks like you haven’t added anything yet. Start shopping to fill
              your cart with fresh groceries 🥬
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="relative z-10"
            >
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-10 py-3 rounded-full font-semibold text-white
      bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg transition-all"
              >
                Start Shopping
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cartData.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-md hover:shadow-xl transition-all p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4"
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-3"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.unit}</p>
                      <p className="text-green-700 font-bold mt-1">
                        ₹{Number(item.price) * item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-full">
                      <button
                        className="bg-white rounded-full p-1 hover:bg-green-100"
                        onClick={() => dispatch(decreaseQuantity(item._id))}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-semibold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="bg-white rounded-full p-1 hover:bg-green-100"
                        onClick={() => dispatch(increaseQuantity(item._id))}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ORDER SUMMARY */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 h-fit lg:sticky lg:top-24"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Order Summary
              </h2>

              {/* FREE DELIVERY PROGRESS */}
              <div className="mb-5 bg-green-50 rounded-2xl p-4">
                {subTotal >= FREE_DELIVERY_LIMIT ? (
                  <p className="text-green-700 font-semibold text-sm text-center">
                    🎉 You unlocked FREE delivery!
                  </p>
                ) : (
                  <p className="text-sm text-gray-700 text-center mb-2">
                    Add{" "}
                    <span className="font-semibold text-green-700">
                      ₹{remaining}
                    </span>{" "}
                    more for free delivery
                  </p>
                )}

                <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-green-600 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-medium">₹{deliveryFee}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-700">₹{finalTotal}</span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => router.push("/user/checkout")}
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-full text-lg hover:bg-green-700 transition"
              >
                Proceed to Checkout
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
