import React from "react";
import ServiceCard from "../ServiceCard/ServiceCard";
import { FaMapMarkedAlt, FaWarehouse, FaMoneyCheckAlt, FaBuilding, FaUndo } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

const servicesData = [
  {
    id: 1,
    icon: <FaTruckFast />,
    title: "Express & Standard Delivery",
    desc: "Fast and reliable delivery solutions tailored to meet both urgent and routine shipment needs.",
  },
  {
    id: 2,
    icon: <FaMapMarkedAlt />,
    title: "Nationwide Delivery",
    desc: "Seamless delivery across the country ensuring coverage for every city and town.",
  },
  {
    id: 3,
    icon: <FaWarehouse />,
    title: "Fulfillment Solution",
    desc: "Comprehensive warehousing and order fulfillment services for businesses of all sizes.",
  },
  {
    id: 4,
    icon: <FaMoneyCheckAlt />,
    title: "Cash on Home Delivery",
    desc: "Convenient cash-on-delivery option for customers who prefer to pay upon receiving their orders.",
  },
  {
    id: 5,
    icon: <FaBuilding />,
    title: "Corporate Service / Contract Logistics",
    desc: "Customized logistics and supply chain solutions for SMEs and corporate clients.",
  },
  {
    id: 6,
    icon: <FaUndo />,
    title: "Parcel Return",
    desc: "Hassle-free and efficient parcel return services for businesses and customers.",
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-[#03373D] dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Our Services</h2>
        <p className="max-w-2xl mx-auto mb-12 text-gray-300 dark:text-gray-400">
          Discover our wide range of logistics solutions designed to make your delivery experience fast, secure, and reliable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              desc={service.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
