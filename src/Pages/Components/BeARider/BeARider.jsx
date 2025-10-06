import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import RiderLogo from "../../../assets/agent-pending.png";
import warehouses from "../../../assets/warehouses.json";
import Swal from "sweetalert2";

const BeRider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🧭 Region & District States
  const [selectedRegion, setSelectedRegion] = useState("");
  const regionData = warehouses; // তোমার warehouses.json থেকে region data

  // Selected Region অনুযায়ী Districts filter
  const districts = regionData
    .filter((item) => item.region === selectedRegion) // একই Region এর সব item
    .map((item) => item.district); // শুধু district নামগুলো

  // 🧾 React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🚀 useMutation (FormData সহ)
  const mutation = useMutation({
    mutationFn: async (data) => {
      const riderData = new FormData();
      for (const key in data) {
        riderData.append(key, data[key]);
      }
      riderData.append("email", user?.email);
      riderData.append("name", user?.displayName);
      riderData.append("create_at", new Date().toISOString())
      riderData.append("status", "pending")

      const res = await axiosSecure.post("/riders", riderData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["riders"]);
      reset();
      Swal.fire(
        "✅ Success!",
        "Your rider application has been submitted.",
        "success"
      );
    },
    onError: () => {
      Swal.fire("❌ Error!", "Something went wrong. Try again later.", "error");
    },
  });

	const onSubmit = (data) => {
	  console.log(data)
    mutation.mutate(data);
  };

  return (
    <div className="bg-base-200 min-h-screen flex justify-center items-center py-10 px-4">
      <div className="max-w-6xl w-7xl bg-white rounded-2xl shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section (Form) */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Be a Rider</h2>
          <p className="text-gray-500 mb-6">
            Fill up the form below carefully to become a verified rider.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            {/* Age & Region */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  placeholder="Your Age"
                  {...register("age", { required: "Age is required" })}
                  className="input input-bordered w-full"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("region", { required: "Region is required" })}
                  className="select select-bordered w-full"
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="">Select Region</option>
                  {[...new Set(regionData.map((r) => r.region))].map(
                    (region, i) => (
                      <option key={i} value={region}>
                        {region}
                      </option>
                    )
                  )}
                </select>

                {errors.region && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.region.message}
                  </p>
                )}
              </div>
            </div>

            {/* District & Bike Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <select
                  {...register("district", {
                    required: "District is required",
                  })}
                  className="select select-bordered w-full"
                  disabled={!selectedRegion}
                >
                  <option value="">Select District</option>
                  {districts.map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.district.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Bike Name"
                  {...register("bikeName", {
                    required: "Bike name is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.bikeName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bikeName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Bike Reg & NID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Bike Registration Number"
                  {...register("bikeReg", {
                    required: "Bike registration number is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.bikeReg && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bikeReg.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="NID Number"
                  {...register("nid", { required: "NID number is required" })}
                  className="input input-bordered w-full"
                />
                {errors.nid && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nid.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone & Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^01[3-9]\d{8}$/,
                      message: "Enter a valid Bangladeshi phone number",
                    },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Additional Info"
                  {...register("info", {
                    required: "Additional info is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.info && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.info.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="btn btn-success w-full mt-4"
            >
              {mutation.isPending
                ? "Submitting..."
                : "Submit Rider Application"}
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex justify-center items-center">
          <img
            src={RiderLogo}
            alt="Rider Illustration"
            className="max-w-sm w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BeRider;
