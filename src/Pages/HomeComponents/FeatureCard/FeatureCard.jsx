import React from "react";
import percelTraking from "../../../assets/features/traking-percel.png";
import safeDelivery from "../../../assets/features/fast-delivery.png";
import callService from "../../../assets/features/call-service.png";

const featuresData = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: percelTraking,
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: safeDelivery,
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: callService,
  },
];

const FeatureCards = () => {
  return (
    <div className="border-t-2 border-b-2 border-dashed">
      <section className="py-16 max-w-7xl mx-auto px-4 transition-colors duration-300">
        <div className="grid grid-cols-1  gap-6">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col sm:flex-row items-center   bg-base-300 rounded-xl shadow-md p-6 transition hover:shadow-lg"
            >
              {/* Left side: Image */}
              <div className="w-24 h-24 min-w-[140px] min-h-[136px] bg-gray-300 rounded-lg flex items-center justify-center mr-0 sm:mr-6 mb-4 sm:mb-0">
                {feature.image ? (
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Image</span>
                )}
              </div>
              <div className="  h-full border-l-2 border-dashed border-primary mr-5"></div>

              {/* Right side: Title & Description */}
              <div className="text-center sm:text-left">
                <h3 className="text-xl text-primary font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeatureCards;
