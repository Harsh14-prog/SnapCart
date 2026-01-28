import React from "react";
import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";

function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-white to-green-50 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        
        {/* Icon */}
        <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-red-100">
          <Lock className="w-8 h-8 text-red-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-800">
          Access Denied
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-gray-600">
          You don’t have permission to view this page.  
          Please go back or contact the administrator.
        </p>

        {/* Action */}
        <Link
          href="/"
          className="
            inline-flex items-center gap-2 mt-8
            bg-green-600 text-white px-6 py-3 rounded-full
            font-semibold shadow-lg
            hover:bg-green-700 hover:scale-105
            transition-all
          "
        >
          <ArrowLeft size={18} />
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
