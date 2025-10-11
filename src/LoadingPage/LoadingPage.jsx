import React from "react";

const LoadingPage = () => {
  return (
    <div className=" h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#ff9a9e] via-[#fad0c4] to-[#a18cd1]">
      {/* Spinner / Bouncing Dots */}
      <div className="flex space-x-2 mb-6">
        <span className="w-4 h-4 bg-red-500 rounded-full animate-bounce"></span>
        <span className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-150"></span>
        <span className="w-4 h-4 bg-green-400 rounded-full animate-bounce delay-300"></span>
        <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-450"></span>
      </div>

      {/* Loading Text */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-pulse">
        Loading...
      </h1>
      <p className="mt-4 text-white text-center text-lg md:text-xl drop-shadow-md max-w-md">
        Please wait a moment while we prepare everything for you!
      </p>
    </div>
  );
};

export default LoadingPage;
