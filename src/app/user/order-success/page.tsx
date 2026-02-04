"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle, Package } from "lucide-react";
import Link from "next/link";

function OrderSuccess() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center bg-linear-to-br from-green-50 via-white to-green-100 overflow-hidden">
      {/* soft background glow */}
      <div className="absolute -top-40 -left-40 w-125 h-125 bg-green-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-green-400/20 rounded-full blur-3xl" />

      {/* card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 bg-white/70 backdrop-blur-xl border border-green-100 rounded-3xl p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.08)] max-w-xl w-full"
      >
        {/* success icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          className="relative mx-auto w-fit"
        >
          <CheckCircle className="text-green-600 w-24 h-24 md:w-28 md:h-28" />
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-full h-full rounded-full bg-green-500 blur-2xl" />
          </motion.div>
        </motion.div>

        {/* heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-green-700 mt-6"
        >
          Order Confirmed 🎉
        </motion.h1>

        {/* description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mt-4 text-sm md:text-base"
        >
          Your order has been placed successfully and is now being prepared. You
          can track it anytime from your{" "}
          <span className="font-semibold text-green-700">My Orders</span> page.
        </motion.p>

        {/* floating package */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-10 flex justify-center"
        >
          <Package className="w-16 h-16 md:w-20 md:h-20 text-green-500" />
        </motion.div>

        {/* button */}
        {/* button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Link href="/user/my-orders">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-base font-semibold px-10 py-4 rounded-full shadow-lg"
            >
              Go to My Orders <ArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* decorative particles */}
      <motion.div
        animate={{ opacity: [0.15, 0.6, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* top row */}
        <div className="absolute top-16 left-[5%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
        <div className="absolute top-24 left-[15%] w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        <div className="absolute top-20 left-[25%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
        <div className="absolute top-32 left-[35%] w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        <div className="absolute top-18 left-[45%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
        <div className="absolute top-26 left-[55%] w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        <div className="absolute top-22 left-[65%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
        <div className="absolute top-30 left-[75%] w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        <div className="absolute top-20 left-[85%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />

        {/* middle row */}
        <div className="absolute top-[45%] left-[8%] w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        <div className="absolute top-[48%] left-[18%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
        <div className="absolute top-[44%] left-[28%] w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        <div className="absolute top-[50%] left-[38%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
        <div className="absolute top-[46%] left-[48%] w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        <div className="absolute top-[49%] left-[58%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
        <div className="absolute top-[45%] left-[68%] w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        <div className="absolute top-[52%] left-[78%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
        <div className="absolute top-[47%] left-[88%] w-2 h-2 bg-green-300 rounded-full animate-pulse" />

        {/* bottom row */}
        <div className="absolute bottom-20 left-[10%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
        <div className="absolute bottom-28 left-[20%] w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        <div className="absolute bottom-22 left-[30%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
        <div className="absolute bottom-32 left-[40%] w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        <div className="absolute bottom-24 left-[50%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
        <div className="absolute bottom-30 left-[60%] w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        <div className="absolute bottom-22 left-[70%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
        <div className="absolute bottom-28 left-[80%] w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-[90%] w-2 h-2 bg-green-400 rounded-full animate-bounce" />
      </motion.div>
    </div>
  );
}

export default OrderSuccess;
