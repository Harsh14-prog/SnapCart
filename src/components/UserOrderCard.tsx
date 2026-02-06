"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  MapPin,
  Package,
  Truck,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IUser } from "../models/user.model";

interface IOrder {
  _id?: string;
  items: {
    name: string;
    price: string;
    unit: string;
    image: string;
    quantity: number;
  }[];
  isPaid: boolean;
  totalAmount: number;
  paymentMethod: "cod" | "online";
  address: { fullAddress: string };
  assignedDeliveryBoy?: IUser;
  status: "pending" | "out of delivery" | "delivered";
  createdAt?: Date;
}

export default function UserOrderCard({ order }: { order: IOrder }) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const statusStyle = {
    pending: "bg-yellow-100 text-yellow-700",
    "out of delivery": "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* LEFT ACCENT */}
      <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-green-400 to-green-600" />

      {/* HEADER */}
      <div className="px-6 py-5 bg-linear-to-r from-green-50 via-white to-white border-b">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-gray-500">Order ID</p>
            <p className="text-lg font-bold text-green-700 tracking-wide">
              #{order._id?.slice(-6)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(order.createdAt!).toLocaleString()}
            </p>
          </div>

          <div className="flex gap-2 bg-gray-50 px-3 py-2 rounded-full">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                order.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.isPaid ? "Paid" : "Unpaid"}
            </span>

            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyle[order.status]}`}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>

      {/* BODY */}
      {order.status !== "delivered" && (
        <div className="p-6 space-y-5">
          {/* PAYMENT */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            {order.paymentMethod === "cod" ? (
              <Truck className="text-green-600" />
            ) : (
              <CreditCard className="text-green-600" />
            )}
            <span className="text-sm font-medium">
              {order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Online Payment"}
            </span>
          </div>

          {/* DELIVERY BOY */}
          {order.assignedDeliveryBoy && (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex justify-between items-center">
                <div className="flex gap-3">
                  <UserCheck className="text-blue-600" />
                  <div>
                    <p className="font-semibold">
                      {order.assignedDeliveryBoy.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      📞 +91 {order.assignedDeliveryBoy.mobile}
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${order.assignedDeliveryBoy.mobile}`}
                  className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg"
                >
                  Call
                </a>
              </div>

              <button
                onClick={() =>
                  router.push(`/user/track-order/${order._id}`)
                }
                className="w-full bg-green-600 text-white py-2.5 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                <Truck size={18} className="inline mr-2" />
                Track Order
              </button>
            </>
          )}

          {/* ADDRESS */}
          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
            <MapPin className="text-green-600 mt-0.5" />
            <span className="text-sm">{order.address.fullAddress}</span>
          </div>

          {/* ITEMS */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex justify-between items-center text-sm font-medium"
          >
            <span className="flex items-center gap-2">
              <Package className="text-green-600" size={16} />
              {expanded
                ? "Hide Items"
                : `View ${order.items.length} Items`}
            </span>
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </button>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: expanded ? "auto" : 0,
              opacity: expanded ? 1 : 0,
            }}
            className="overflow-hidden"
          >
            <div className="space-y-3 mt-3">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gray-50 rounded-xl p-3"
                >
                  <div className="flex gap-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="rounded-lg border"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × {item.unit}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ₹{Number(item.price) * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* TOTAL */}
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-gray-500">Grand Total</span>
            <span className="text-xl font-bold text-green-700">
              ₹{order.totalAmount}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
