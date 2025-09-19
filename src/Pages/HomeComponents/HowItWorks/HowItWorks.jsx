import React from "react";
import {
  FaTruckPickup,
  FaMoneyCheckAlt,
  FaStore,
  FaBuilding,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const details = [
  {
    id: 1,
    icon: <FaTruckPickup className="text-4xl text-blue-500" />,
    title: "Booking Pick & Drop",
    desc: "Easily book your package for pickup and delivery with just a few clicks.",
  },
  {
    id: 2,
    icon: <FaMoneyCheckAlt className="text-4xl text-blue-500" />,
    title: "Cash on Delivery",
    desc: "Pay for your parcel only after it reaches your doorstep safely.",
  },
  {
    id: 3,
    icon: <FaStore className="text-4xl text-blue-500" />,
    title: "Delivery HUB",
    desc: "Your packages are processed efficiently at our centralized hub.",
  },
  {
    id: 4,
    icon: <FaBuilding className="text-4xl text-blue-500" />,
    title: "Booking SME & Corporate",
    desc: "Tailored booking solutions for small businesses and corporate needs.",
  },
];

const HowItWorks = () => {



  return (
    <section className="py-12 bg-base-200">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-primary mb-6">How It Works</h2>
        <p className="max-w-2xl mx-auto mb-10 text-gray-600">
          Follow these simple steps to enjoy seamless delivery with ProFast.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((item, index) => (
            <div
              key={item.id}
              data-aos="zoom-out"
              data-aos-delay={index * 300} 
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                {item.icon}
                <h3 className="card-title text-blue-500 mt-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
