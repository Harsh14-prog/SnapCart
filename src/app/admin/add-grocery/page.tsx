"use client";
import { ArrowLeft, Loader, Plus, PlusCircle, Upload } from "lucide-react";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import axios from "axios";

const categories = [
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Rice, Atta & Grains",
  "Snacks & Biscuits",
  "Spices & Masalas",
  "Beverages & Drinks",
  "Personal Care",
  "Household Essentials",
  "Instant & Packaged Food",
  "Baby & Pet Care",
];

const units = ["kg", "g", "liter", "ml", "piece", "pack"];

function AddGrocery() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // improved image logic
  const [preview, setPreview] = useState<string | null>(null);
  const [backendImage, setBackendImage] = useState<File | null>(null);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBackendImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("unit", unit);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post("/api/admin/add-grocery", formData);
      console.log(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white py-16 px-4 relative">
      <Link
        href={"/"}
        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 font-semibold bg-white px-4 py-2 rounded-full shadow-md hover:bg-green-100 hover:shadow-lg transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden md:flex">Back to home</span>
      </Link>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-2xl shadow-2xl rounded-3xl border border-green-100 p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3">
            <PlusCircle className="text-green-600 w-8 h-8" />
            <h1>Add Your Grocery</h1>
          </div>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Fill out the details below to add a new grocery item.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          {/* name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Grocery Name <span className="text-red-500">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="eg: sweets, Milk..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* category + unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category<span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 bg-white"
              >
                <option value="">Select Category</option>
                {categories.map((cat, i) => (
                  <option key={i}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Unit<span className="text-red-500">*</span>
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 bg-white"
              >
                <option value="">Select Unit</option>
                {units.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="eg: 120"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* upgraded image upload only */}
          <div className="flex flex-col gap-4">
            <label
              htmlFor="image"
              className="cursor-pointer flex flex-col items-center justify-center gap-2 bg-green-50 text-green-700 font-semibold border-2 border-dashed border-green-300 rounded-xl px-6 py-6 hover:bg-green-100 transition-all"
            >
              <Upload className="w-6 h-6" />
              <span>Click or drag image here</span>
            </label>

            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={handleImage}
            />

            {preview && (
              <Image
                src={preview}
                width={120}
                height={120}
                alt="preview"
                className="rounded-xl shadow-md border border-gray-200 object-cover mx-auto"
              />
            )}
          </div>

          {/* submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="mt-4 w-full bg-linear-to-r from-green-500 to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-60 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              "Add Grocery"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default AddGrocery;
