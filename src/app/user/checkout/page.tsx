"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { motion } from "motion/react";
import {
  ArrowLeft,
  LocateFixed,
  MapPin,
  Truck,
  CreditCard,
} from "lucide-react";
import axios from "axios";

const CheckOutMap = dynamic(() => import("@/components/CheckoutMap"), {
  ssr: false,
});

export default function Checkout() {

  const router = useRouter();
  const { userData } = useSelector((state: RootState) => state.user);
  const { subTotal, deliveryFee, finalTotal ,cartData} = useSelector(
    (state: RootState) => state.cart,
  );

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [searchQuery, setSearchQuery] = useState("");

  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    fullAddress: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  useEffect(() => {
    if (!userData) return;
    setAddress((p) => ({
      ...p,
      fullName: userData.name || "",
      mobile: userData.mobile || "",
    }));
  }, [userData]);

  const handleSearch = async () => {
    const { OpenStreetMapProvider } = await import("leaflet-geosearch");
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: searchQuery });
    if (results.length) {
      setPosition([results[0].y, results[0].x]);
    }
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
  };

  const handleCod = async () => {
    if (!position) return null
    try {
      await axios.post("/api/user/order", {
        userId: userData?._id,
        items: cartData.map(item => ({
          grocery: item._id,
          name: item.name,
          price: item.price,
          unit: item.unit,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: finalTotal,
        address: {
          ...address,
          latitude: position[0],
          longitude: position[1]
        },
        paymentMethod
      })
      router.push("/user/order-success")
    } catch (error) {
      console.log(error)
    }
  }

    const handleOnlinePayment = async () => {
    if (!position) return null
    try {
      const result = await axios.post("/api/user/payment", {
        userId: userData?._id,
        items: cartData.map(item => ({
          grocery: item._id,
          name: item.name,
          price: item.price,
          unit: item.unit,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: finalTotal,
        address: {
          ...address,
          latitude: position[0],
          longitude: position[1]
        },
        paymentMethod
      })
      window.location.href = result.data.url
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 py-12">
      <div className="w-[92%] md:w-[80%] mx-auto">
        {/* Back */}
        <button
          onClick={() => router.push("/user/cart")}
          className="flex items-center gap-2 text-green-600 mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft size={18} /> Back to cart
        </button>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-12 bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
          Secure Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-5"
          >
            <h2 className="font-semibold text-xl flex gap-2 items-center">
              <MapPin className="text-green-600" /> Delivery Address
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                value={address.fullName}
                onChange={(e) =>
                  setAddress((p) => ({ ...p, fullName: e.target.value }))
                }
                placeholder="Full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                value={address.mobile}
                onChange={(e) =>
                  setAddress((p) => ({ ...p, mobile: e.target.value }))
                }
                placeholder="Mobile"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <input
              value={address.fullAddress}
              onChange={(e) =>
                setAddress((p) => ({ ...p, fullAddress: e.target.value }))
              }
              placeholder="Full address"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <div className="grid grid-cols-3 gap-4">
              <input
                value={address.city}
                onChange={(e) =>
                  setAddress((p) => ({ ...p, city: e.target.value }))
                }
                placeholder="City"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                value={address.state}
                onChange={(e) =>
                  setAddress((p) => ({ ...p, state: e.target.value }))
                }
                placeholder="State"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                value={address.pincode}
                onChange={(e) =>
                  setAddress((p) => ({ ...p, pincode: e.target.value }))
                }
                placeholder="Pincode"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div className="flex gap-3">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city or area..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl font-medium shadow-lg"
              >
                Search
              </button>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden border border-gray-200">
              {position && (
                <CheckOutMap position={position} setPosition={setPosition} />
              )}

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleCurrentLocation}
                className="absolute bottom-4 right-4
      z-1000 pointer-events-auto
      bg-white/90 backdrop-blur
      text-green-600 p-3 rounded-full shadow-lg
      border border-green-100
      hover:bg-green-600 hover:text-white
      transition-all"
                title="Recenter to current location"
              >
                <LocateFixed size={22} />
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6"
          >
            <h2 className="font-semibold text-xl">Payment Method</h2>

            <button
              onClick={() => setPaymentMethod("online")}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all ${
                paymentMethod === "online"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:shadow-md"
              }`}
            >
              <CreditCard className="text-green-600" />
              <span className="font-medium">Pay Online (Stripe)</span>
            </button>

            <button
              onClick={() => setPaymentMethod("cod")}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all ${
                paymentMethod === "cod"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:shadow-md"
              }`}
            >
              <Truck className="text-green-600" />
              <span className="font-medium">Cash on Delivery</span>
            </button>

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-green-600">₹{finalTotal}</span>
              </div>
            </div>

            <motion.button
              onClick={() => {
                if(paymentMethod == "cod"){
                  handleCod()
                }
                else{
                  handleOnlinePayment()
                }
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-linear-to-r from-green-600 to-emerald-500 text-white py-4 rounded-full font-bold text-lg shadow-xl hover:opacity-90"
            >
              {paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
