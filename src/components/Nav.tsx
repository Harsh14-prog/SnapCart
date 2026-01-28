"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  LogOut,
  Package,
  Search,
  ShoppingCartIcon,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { signOut } from "next-auth/react";

export interface IUser {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
}

const Nav = ({ user }: { user: IUser }) => {
  const [open, setOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const profileDropDown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileDropDown.current &&
        !profileDropDown.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="
        w-[95%] fixed top-4 left-1/2 -translate-x-1/2
        bg-linear-to-r from-green-600 to-green-700
        backdrop-blur-xl
        border border-white/20
        rounded-3xl shadow-2xl
        flex justify-between items-center
        h-20 px-4 md:px-8
        z-9999
      "
    >
      {/* LOGO */}
      <motion.div whileHover={{ scale: 1.08 }}>
        <Link
          href="/"
          className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide"
        >
          Snapcart
        </Link>
      </motion.div>

      {/* SEARCH DESKTOP */}
      <form
        className="
          hidden md:flex items-center
          bg-white/90 rounded-full px-4 py-2
          w-1/2 max-w-lg shadow-inner
        "
      >
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search groceries..."
          className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-500"
        />
      </form>

      <div className="flex items-center gap-4 relative">
        {/* MOBILE SEARCH */}
        <div
          onClick={() => setSearchBarOpen((p) => !p)}
          className="
            bg-white/90 rounded-full w-11 h-11 flex items-center justify-center
            shadow-md hover:scale-105 transition-all md:hidden
          "
        >
          <Search className="text-green-700 w-6 h-6" />
        </div>

        {/* CART */}
        <Link
          href=""
          className="
            relative bg-white/90 rounded-full w-11 h-11 flex items-center justify-center
            shadow-md hover:scale-105 transition-all
          "
        >
          <ShoppingCartIcon className="text-green-700 w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            0
          </span>
        </Link>

        {/* PROFILE */}
        <div className="relative" ref={profileDropDown}>
          <div
            onClick={() => setOpen((p) => !p)}
            className="
              bg-white/90 rounded-full w-11 h-11 flex items-center justify-center
              overflow-hidden shadow-md hover:scale-105 transition-all
            "
          >
            {user.image ? (
              <Image src={user.image} alt="User" fill className="object-cover" />
            ) : (
              <User className="text-green-700" />
            )}
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl p-3"
              >
                <div className="flex items-center gap-3 px-3 py-2 border-b">
                  <div className="w-10 h-10 relative rounded-full overflow-hidden">
                    {user.image ? (
                      <Image src={user.image} alt="user" fill />
                    ) : (
                      <User />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{user.name}</div>
                    <div className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </div>
                  </div>
                </div>

                {user.role === "user" && (
                  <Link
                    href=""
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 hover:bg-green-50 rounded-lg"
                  >
                    <Package className="w-5 h-5 text-green-600" />
                    My Orders
                  </Link>
                )}

                <button
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="flex items-center gap-2 w-full px-3 py-3 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-5 h-5 text-red-600" />
                  Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      <AnimatePresence>
        {searchBarOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              fixed top-28 left-1/2 -translate-x-1/2
              w-[90%] bg-white rounded-full shadow-lg
              flex items-center px-4 py-2 z-9999
            "
          >
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input
              className="grow outline-none text-gray-800"
              placeholder="Search groceries..."
            />
            <X
              onClick={() => setSearchBarOpen(false)}
              className="w-5 h-5 text-gray-500 cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
