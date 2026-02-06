"use client";

import axios from "axios";
import { ArrowLeft, PackageSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import UserOrderCard from "../../../components/UserOrderCard";
import { IUser } from "../../../models/user.model";

interface IOrder {
  _id?: string;
  user: string;
  items: {
    grocery: string;
    name: string;
    price: string;
    unit: string;
    image: string;
    quantity: number;
  }[];
  isPaid: boolean;
  totalAmount: number;
  paymentMethod: "cod" | "online";
  address: {
    fullAddress: string;
  };
  assignedDeliveryBoy?: IUser;
  status: "pending" | "out of delivery" | "delivered";
  createdAt?: Date;
}

function OrderSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 animate-pulse">
      <div className="h-4 w-40 bg-gray-200 rounded" />
      <div className="h-3 w-full bg-gray-200 rounded" />
      <div className="h-3 w-5/6 bg-gray-200 rounded" />
      <div className="h-8 w-28 bg-gray-200 rounded-full" />
    </div>
  );
}

export default function MyOrder() {
  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/user/my-orders");
        setOrders(res.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100">
      {/* HEADER */}
      <div className="fixed top-0 w-full bg-white/80 backdrop-blur border-b z-50">
        <div className="max-w-3xl mx-auto flex items-center gap-4 px-4 py-3">
          <button
            onClick={() => router.push("/")}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition active:scale-95"
          >
            <ArrowLeft className="text-green-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">My Orders</h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-12 space-y-6">
        {loading &&
          [1, 2, 3].map((i) => <OrderSkeleton key={i} />)}

        {!loading && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center pt-20"
          >
            <PackageSearch size={80} className="text-green-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              No Orders Yet
            </h2>
            <p className="text-gray-500 text-sm">
              Your grocery orders will appear here
            </p>
          </motion.div>
        )}

        {!loading &&
          orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <UserOrderCard order={order} />
            </motion.div>
          ))}
      </div>
    </div>
  );
}
