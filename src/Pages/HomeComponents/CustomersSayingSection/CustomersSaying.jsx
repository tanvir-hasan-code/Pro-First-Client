import React from "react";
import "swiper/css";
import "./overFlow.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import customerTop from "../../../assets/customer-top.png";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Tanvir Hasan",
    role: "Regular User",
    text: "ProFast Delivery always delivers my packages on time. Highly reliable service!",
  },
  {
    name: "Shamim Khan",
    role: "Small Business Owner",
    text: "ProFast helps me ship products quickly and reliably.",
  },
  {
    name: "Tanvir Hasan",
    role: "Frequent Shopper",
    text: "I love the fast delivery from ProFast. Never disappointed!",
  },
  {
    name: "Farzana Akter",
    role: "Online Shopper",
    text: "Tracking notifications are clear and accurate every time.",
  },
  {
    name: "Tanvir Hasan",
    role: "Customer",
    text: "Friendly staff and smooth delivery process. Very satisfied!",
  },
  {
    name: "Rana Biswas",
    role: "Frequent User",
    text: "Packages always arrive safely and on time.",
  },
  {
    name: "Tanvir Hasan",
    role: "Shopper",
    text: "Affordable prices and fast service make ProFast my favorite courier.",
  },
  {
    name: "Lina Roy",
    role: "E-commerce Seller",
    text: "Excellent delivery service! My customers are always satisfied.",
  },
  {
    name: "Tanvir Hasan",
    role: "Online Buyer",
    text: "I can trust ProFast with fragile items. Always careful and on time.",
  },
  {
    name: "Imran Hossain",
    role: "Regular User",
    text: "Smooth delivery process and professional service. Very reliable!",
  },
  {
    name: "Ayesha Siddique",
    role: "Frequent Shopper",
    text: "I love the speed and care ProFast provides for every delivery.",
  },
  {
    name: "Tanvir Hasan",
    role: "Business Owner",
    text: "Professional service and reliable deliveries every time.",
  },
  {
    name: "Arif Chowdhury",
    role: "Customer",
    text: "Packages arrive faster than expected. Great service!",
  },
  {
    name: "Tanvir Hasan",
    role: "Online Shopper",
    text: "The tracking system is very clear and keeps me updated about my parcels.",
  },
  {
    name: "Nusrat Jahan",
    role: "Shopper",
    text: "I can trust ProFast with all my parcels. Always careful and fast.",
  },
  {
    name: "Tanvir Hasan",
    role: "Frequent User",
    text: "Packages arrive safely every time. Excellent customer service.",
  },
  {
    name: "Sabbir Rahman",
    role: "Small Business Owner",
    text: "ProFast Delivery’s customer support is amazing. Issues resolved fast.",
  },
  {
    name: "Tanvir Hasan",
    role: "Online Buyer",
    text: "Great app and live tracking. Makes deliveries stress-free.",
  },
  {
    name: "Mousumi Akter",
    role: "Regular Shopper",
    text: "The live tracking updates make shipping stress-free and convenient.",
  },
  {
    name: "Tanvir Hasan",
    role: "E-commerce Seller",
    text: "I recommend ProFast to all my friends. Reliable and fast!",
  },
];
const CustomersSaying = () => {
  return (
    <div>
      <img src={customerTop} alt="customer-top" className="mx-auto md:mb-8" />
      <h1 className="text-primary text-2xl md:text-3xl lg:text-4xl font-bold text-center my-3 md:mb-5">
        What our customers are sayings
      </h1>
      <p className="text-center text-xs max-w-10/12 md:text-sm lg:text-base text-gray-600 md:max-w-xl lg:max-w-2xl mx-auto">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>

      <section className="my-10 overflow-x-hidden">
        <div className="max-w-6xl mx-auto relative">
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{
              el: ".custom-pagination",
              clickable: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            spaceBetween={30}
            breakpoints={{
              340: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
            }}
            centeredSlides={true}
            loop={true}
            className="mySwiper "
          >
            {testimonials.map((t, index) => (
              <SwiperSlide className="overflow-visible" key={index}>
                {({ isActive }) => (
                  <div
                    className={`p-6 rounded-xl my-10 shadow-lg text-center transition-all duration-300 ${
                      isActive
                        ? "bg-white scale-105 transition-transform duration-300 -translate-y-8 shadow-2xl"
                        : "bg-gray-100 translate-y-5 opacity-40"
                    }`}
                  >
                    <p className="text-gray-600 mb-4 text-xs md:text-base">“{t.text}”</p>
                    <div className="border-t-2 border-dashed my-4"></div>
                    <h4 className="font-bold md:text-lg text-teal-800 text-sm">
                      {t.name}
                    </h4>
                    <p className="md:text-sm text-gray-500 text-xs">{t.role}</p>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination dots centered */}
          <div className="flex justify-center gap-5 max-w-8/12 md:max-w-6/12 lg:max-w-4/12 mx-auto  mt-10">
            <button className="p-2 rounded-full bg-white text-black swiper-button-prev-custom">
              <FaArrowLeft />
            </button>
            <div className="custom-pagination flex justify-center items-center space-x-2"></div>
            <button className="p-2 rounded-full bg-[#CAEB66] text-black swiper-button-next-custom">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomersSaying;
