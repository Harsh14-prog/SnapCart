"use client";
import { ArrowRight, Bike, ShoppingBasket } from "lucide-react";
import { motion } from "motion/react";

type propType = {
   nextStep : (s : number) => void
}

const Welcome = ({nextStep} : propType) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-linear-to-b from-green-100 to-white">

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, scale: [1, 1.05, 1] }}
        transition={{ duration: 0.6, scale: { repeat: Infinity, duration: 3 } }}
        className="flex items-center gap-3"
      >
        <ShoppingBasket className="w-10 h-10 text-green-600" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
          Snapcart
        </h1>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-4 text-gray-700 text-lg md:text-xl max-w-lg"
      >
        Your one-stop destination for fresh groceries, organic produce, and
        daily essentials delivered right to your doorstep.
      </motion.p>

      {/* Icons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex items-center justify-center gap-10 mt-10"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ShoppingBasket className="w-20 h-20 md:w-28 md:h-28 lg:w-24 lg:h-24 text-green-600 drop-shadow-md" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Bike className="w-20 h-20 md:w-28 md:h-28 lg:w-24 lg:h-24 text-orange-500 drop-shadow-md" />
        </motion.div>
      </motion.div>

      {/* Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-md transition-all duration-200 mt-10"
        onClick={() => nextStep(2)}
      >
        Next
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowRight />
        </motion.span>
      </motion.button>
    </div>
  );
};

export default Welcome;
