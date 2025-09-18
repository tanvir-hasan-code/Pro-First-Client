import React from "react";

const ServiceCard = ({ icon, title, desc }) => {
  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-lg hover:bg-[#CAEB66] transition-all duration-300 cursor-pointer text-center flex flex-col items-center">
      <div className="text-4xl mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-base-content">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
    </div>
  );
};

export default ServiceCard;
