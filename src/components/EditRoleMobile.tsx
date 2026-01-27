"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Bike, User, UserCog, Phone } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";



function EditRoleMobile() {

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const [roles, setRoles] = useState([
    { id: "admin", label: "Admin", icon: UserCog },
    { id: "user", label: "User", icon: User },
    { id: "deliveryBoy", label: "Delivery Boy", icon: Bike },
  ]);

  const [mobile, setMobile] = useState("");

  const router = useRouter();


  const handleEdit = async () => {
   try {
    const result = await axios.post("/api/user/edit-role-mobile" , {
         role : selectedRole, 
         mobile 
     })
    //console.log(result.data)
    router.push("/")
   } 
   catch (error) {
     console.log(error)
   }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start p-6 bg-linear-to-br from-green-50 via-white to-green-100 overflow-hidden">
 
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-105 h-105 bg-green-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-105 h-105 bg-emerald-400/30 rounded-full blur-3xl" />
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold text-green-700 text-center mt-8"
      >
        Choose Your Role
      </motion.h1>

      <p className="text-gray-500 mt-2 text-center">
        Select your role to continue
      </p>

      {/* Roles */}
      <div className="flex flex-col md:flex-row gap-6 mt-10">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <motion.div
              key={role.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedRole(role.id)}
              className={`w-48 h-44 rounded-2xl flex flex-col items-center justify-center cursor-pointer border-2 transition-all
                ${
                  isSelected
                    ? "border-green-500 shadow-xl bg-green-50"
                    : "border-gray-200 bg-white hover:border-green-400"
                }`}
            >
              <div
                className={`p-3 rounded-full mb-3 ${
                  isSelected
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-600"
                }`}
              >
                <Icon className="w-7 h-7" />
              </div>

              <span
                className={`font-semibold ${
                  isSelected ? "text-green-700" : "text-gray-700"
                }`}
              >
                {role.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center mt-12"
      >
        <label className="text-gray-700 font-medium mb-2">
          Enter your mobile number
        </label>

        <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-green-500">
          <Phone className="w-5 h-5 text-green-600 mr-2" />
          <input
            type="tel"
            className="outline-none text-gray-800 w-56 md:w-72"
            placeholder="0000000000"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>
      </motion.div>

      {/* Button */}
      <motion.button
        whileHover={selectedRole && mobile.length === 10 ? { scale: 1.05 } : {}}
        whileTap={selectedRole && mobile.length === 10 ? { scale: 0.95 } : {}}
        disabled={!(selectedRole && mobile.length === 10)}
        className={`mt-16 w-55 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold transition-all
       ${
         selectedRole && mobile.length === 10
         ? "bg-linear-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl"
         : "bg-gray-300 text-gray-500 cursor-not-allowed"
       }`}

       onClick={handleEdit}
      >
        Continue
        <ArrowRight />
      </motion.button>
    </div>
  );
}

export default EditRoleMobile;
