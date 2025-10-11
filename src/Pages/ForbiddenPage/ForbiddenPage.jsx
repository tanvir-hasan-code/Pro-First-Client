import React from "react";
import { XCircle } from "lucide-react";

const ForbiddenPage = () => {
  return (
    <div className=" h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#f0f9e8] via-[#d4f7b8] to-[#caeb66] px-4 text-center">
      {/* Icon */}
      <XCircle className="text-red-600 w-20 h-20 md:w-28 md:h-28 animate-bounce mb-6" />

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-[#4b5320] drop-shadow-lg mb-4 animate-pulse">
        403
      </h1>

      {/* Subheading */}
      <h2 className="text-2xl md:text-4xl font-semibold text-[#3a4a1f] mb-4">
        Forbidden Access
      </h2>

      {/* Description */}
      <p className="text-md md:text-lg text-[#2c3e15] max-w-md mb-6">
        You do not have permission to view this page. Please contact your administrator if you believe this is an error.
      </p>

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="px-6 py-3 bg-[#9fcb3a] hover:bg-[#8cb72f] text-white rounded-full font-semibold shadow-lg transform transition-all duration-300 hover:scale-105"
      >
        Go Back
      </button>
    </div>
  );
};

export default ForbiddenPage;
