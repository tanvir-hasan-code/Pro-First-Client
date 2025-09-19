import React from "react";
import locationMerchant from "../../../assets/location-merchant.png";

const MerchantCard = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="card card-side flex flex-col-reverse md:flex-row bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] my-16 lg:px-12  p-5  shadow-sm">
        <div className="card-body flex-1">
          <h2 className="card-title font-bold text-white text-xl md:text-2xl lg:text-3xl">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-gray-300">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="card-actions justify-start">
            <button className="btn text-black  bg-[#CAEB66] rounded-full">
              Become a Merchant
            </button>
            <button className="btn text-[#CAEB66] rounded-full btn-outline">
              Earn with Profast Courier
            </button>
          </div>
        </div>
        <figure className="flex-1">
          <img
            src={locationMerchant}
            alt="Merchant-Image"
            className="w-10/12 md:w-96 md:h-80 object-contain lg:w-full"
          />
        </figure>
      </div>
    </div>
  );
};

export default MerchantCard;
