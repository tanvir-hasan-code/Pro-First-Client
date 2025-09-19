import React from "react";

const ServiceCard = ({service}) => {
	const { icon, title, desc } =service;
  return (
    <div  className="bg-base-100 p-6 rounded-xl shadow-lg hover:bg-[#CAEB66]  transition-all duration-300 cursor-pointer text-center flex flex-col items-center">
      <div className="text-4xl mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
      <p className="text-gray-600 dark:text-white dark:hover:text-black text-sm">{desc}</p>
    </div>
  );
};

export default ServiceCard;
