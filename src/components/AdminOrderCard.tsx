"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { IUser } from "../models/user.model";

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
    fullName: string;
    mobile: string;
    city: string;
    state: string;
    pincode: string;
    fullAddress: string;
    latitude: number;
    longitude: number;
  };
  assignedDeliveryBoy?: IUser;
  status: "pending" | "out of delivery" | "delivered";
  createdAt?: Date;
}

function AdminOrderCard({ order }: { order: IOrder }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (order.createdAt) {
      setFormattedDate(
        new Date(order.createdAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      );
    }
  }, [order.createdAt]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await axios.post(`/api/admin/update-order-status/${orderId}`, {
        status: newStatus,
      });
      setStatus(newStatus as any);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-all p-4 sm:p-6"
    >
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6">
        {/* LEFT */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-emerald-700 flex items-center gap-2">
            <Package size={18} />
            Order #{order._id?.slice(-6)}
          </h2>

          <p className="text-xs text-gray-500">{formattedDate}</p>

          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
              order.isPaid
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-rose-50 text-rose-700 border-rose-300"
            }`}
          >
            <CreditCard size={12} />
            {order.isPaid ? "Paid" : "Payment Pending"}
          </span>

          {/* CUSTOMER */}
          <div className="pt-2 space-y-2 text-sm text-gray-700">
            <div className="flex gap-2">
              <User size={14} className="text-emerald-600 mt-0.5" />
              <span className="font-medium">
                {order.address.fullName}
              </span>
            </div>
            <div className="flex gap-2">
              <Phone size={14} className="text-emerald-600 mt-0.5" />
              <span>{order.address.mobile}</span>
            </div>
            <div className="flex gap-2">
              <MapPin size={14} className="text-emerald-600 mt-0.5" />
              <span className="line-clamp-2">
                {order.address.fullAddress}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT – STATUS PANEL */}
        <div className="flex md:flex-col items-start md:items-end gap-3">
          <div
            className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize ${
              status === "delivered"
                ? "bg-emerald-100 text-emerald-700"
                : status === "pending"
                ? "bg-amber-100 text-amber-700"
                : "bg-sky-100 text-sky-700"
            }`}
          >
            {status}
          </div>

          {status !== "delivered" && (
            <select
              value={status}
              onChange={(e) =>
                updateStatus(order._id!, e.target.value)
              }
              className="
                text-xs px-3 py-2 rounded-xl border 
                bg-gray-50 hover:bg-white
                shadow-sm focus:ring-2 focus:ring-emerald-400
              "
            >
              <option value="pending">PENDING</option>
              <option value="out of delivery">
                OUT FOR DELIVERY
              </option>
            </select>
          )}
        </div>
      </div>

      {/* DELIVERY BOY */}
      {order.assignedDeliveryBoy && (
        <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <UserCheck size={16} className="text-blue-600" />
            <div>
              <p className="text-sm font-semibold">
                {order.assignedDeliveryBoy.name}
              </p>
              <p className="text-xs text-gray-600">
                +91 {order.assignedDeliveryBoy.mobile}
              </p>
            </div>
          </div>

          <a
            href={`tel:${order.assignedDeliveryBoy.mobile}`}
            className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg"
          >
            Call
          </a>
        </div>
      )}

      {/* ITEMS TOGGLE */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-5 w-full flex justify-between items-center text-sm font-semibold text-gray-700"
      >
        <span className="flex items-center gap-2">
          <Package size={16} />
          {expanded ? "Hide Items" : `View ${order.items.length} Items`}
        </span>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* ITEMS */}
      <motion.div
        initial={false}
        animate={{
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <div className="mt-4 space-y-3">
          {order.items.map((item) => (
            <div
              key={item.grocery}
              className="rounded-xl bg-gray-50 p-3 flex justify-between items-center"
            >
              <div className="flex gap-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={44}
                  height={44}
                  className="rounded-lg border"
                />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × {item.unit}
                  </p>
                </div>
              </div>

              <p className="text-sm font-bold">
                ₹{Number(item.price) * item.quantity}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* SUMMARY FOOTER */}
      <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 flex justify-between items-center">
        <span className="flex items-center gap-2 text-xs font-medium text-gray-700">
          <Truck size={14} className="text-emerald-600" />
          {status}
        </span>

        <span className="text-lg font-extrabold text-emerald-700">
          ₹{order.totalAmount}
        </span>
      </div>
    </motion.div>
  );
}

export default AdminOrderCard;
