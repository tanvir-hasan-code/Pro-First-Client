import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import locations from "../../../assets/warehouses.json";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

// Validation Schema
const schema = yup.object().shape({
  senderName: yup.string().required("Sender name is required"),
  senderPhone: yup
    .string()
    .required("Sender phone is required")
    .matches(/^[0-9]{11}$/, "Phone must be 11 digits"),
  senderAddress: yup.string().required("Sender address is required"),
  receiverName: yup.string().required("Receiver name is required"),
  receiverPhone: yup
    .string()
    .required("Receiver phone is required")
    .matches(/^[0-9]{11}$/, "Phone must be 11 digits"),
  receiverAddress: yup.string().required("Receiver address is required"),
  senderRegion: yup.string().required("Sender region is required"),
  senderCenter: yup.string().required("Sender service center is required"),
  receiverRegion: yup.string().required("Receiver region is required"),
  receiverCenter: yup.string().required("Receiver service center is required"),
  parcelType: yup.string().required("Parcel type is required"),
  title: yup.string().required("Parcel title is required"),
  weight: yup.string().when("parcelType", {
    is: "non-document",
    then: (schema) => schema.required("Weight is required for non-document"),
    otherwise: (schema) => schema.notRequired(),
  }),
  pickupInstruction: yup.string().max(200, "Max 200 characters"),
  deliveryInstruction: yup.string().max(200, "Max 200 characters"),
});

const SendParcel = () => {
  const [senderRegion, setSenderRegion] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");
  const [parcelType, setParcelType] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const senderCenters = locations
    .filter((loc) => loc.region === senderRegion)
    .map((loc) => loc.city);

  const receiverCenters = locations
    .filter((loc) => loc.region === receiverRegion)
    .map((loc) => loc.city);

  // Pricing Logic
  const calculateCost = (data) => {
    const { parcelType, weight, senderRegion, receiverRegion } = data;
    const isWithinCity = senderRegion === receiverRegion;
    const w = parseFloat(weight) || 0;

    let cost = 0;
    let breakdown = "";

    if (parcelType === "document") {
      cost = isWithinCity ? 60 : 80;
      breakdown = `📄 <strong>Parcel Type:</strong> Document<br/>
                   <strong>Within City:</strong> ৳60<br/>
                   <strong>Outside City:</strong> ৳80`;
    } else {
      if (w <= 3) {
        cost = isWithinCity ? 110 : 150;
        breakdown = `📦 <strong>Parcel Type:</strong> Non-Document<br/>
                     <strong>Weight:</strong> ${w}kg (≤3kg)<br/>
                     <strong>Within City:</strong> ৳110<br/>
                     <strong>Outside City:</strong> ৳150`;
      } else {
        let extra = (w - 3) * 40;
        cost = isWithinCity ? 110 + extra : 150 + extra + 40;
        breakdown = `📦 <strong>Parcel Type:</strong> Non-Document<br/>
                     <strong>Weight:</strong> ${w}kg (>3kg)<br/>
                     <strong>Extra Charge:</strong> +৳40/kg<br/>
                     <strong>Within City:</strong> ${
                       isWithinCity ? "৳" + (110 + extra) : "-"
                     }<br/>
                     <strong>Outside City:</strong> ${
                       !isWithinCity ? "৳" + (150 + extra + 40) : "-"
                     }`;
      }
    }

    return { cost, breakdown };
  };

  const onSubmit = (data) => {
    const trackingId =
      "TRK" +
      Date.now().toString().slice(-6) +
      Math.floor(100 + Math.random() * 900);
    const { cost, breakdown } = calculateCost(data);

    Swal.fire({
      title: `<span style="font-size:22px; font-weight:bold;">Delivery Summary</span>`,
      html: `
        <div style="text-align:left; line-height:1.6; font-size:16px;">
          ${breakdown}
          <hr style="margin:10px 0;"/>
          <p>🏠 <strong>Sender:</strong> ${data.senderName}, ${data.senderAddress}</p>
          <p>📍 <strong>Service Center:</strong> ${data.senderCenter}, ${data.senderRegion}</p>
          <p>📞 <strong>Phone:</strong> ${data.senderPhone}</p>
          <br/>
          <p>🏠 <strong>Receiver:</strong> ${data.receiverName}, ${data.receiverAddress}</p>
          <p>📍 <strong>Service Center:</strong> ${data.receiverCenter}, ${data.receiverRegion}</p>
          <p>📞 <strong>Phone:</strong> ${data.receiverPhone}</p>
          <hr style="margin:10px 0;"/>
          <p style="font-weight:bold; color:green; font-size:20px; text-align:center;">Total Cost: ৳${cost}</p>
          <p style="font-size:14px; text-align:center; color:#555;">Tracking ID: ${trackingId}</p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Proceed to Payment",
      denyButtonText: "Continue Editing",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-xl p-6",
        title: "text-xl font-bold",
        htmlContainer: "text-gray-700",
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white py-2 px-3 md:px-4 rounded text-sm md:text-base mx-1",
        denyButton:
          "bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 md:px-4 rounded text-sm md:text-base mx-1",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-black py-2 px-3 md:px-4 rounded text-sm md:text-base mx-1",
      },
      buttonsStyling: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirm({ ...data, trackingId }, cost, "payment");
      } else if (result.isDenied) {
        Swal.fire({
          icon: "info",
          title: "Edit your information",
          text: "You can continue editing your parcel details.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleConfirm = (data, cost, action) => {
    const parcelInfo = {
      ...data,
      cost,
      booking_date: new Date().toISOString(),
      status: false,
      createdBy: user.email,
      createdByUid: user.uid,
      trackingHistory: [],
      currentStatus: "Unpaid"
    };

    //  Send to server
    axiosSecure
      .post("/sendParcel", parcelInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Redirecting...",
            text:
              action === "payment"
                ? "Please wait, redirecting to payment page..."
                : "Booking successful.",
            timer: 2000,
            showConfirmButton: false,
          });
			setTimeout(() => {
			  window.location.href = "/dashboard/myParcels";
		  },2000)
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Parcel Send Failed!",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });

    reset();
    setSenderRegion("");
    setReceiverRegion("");
    setParcelType("");
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-base-300 my-5 rounded-2xl max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Send Parcel</h2>
      <p className="text-center text-gray-500 mb-6">
        Fill in the details to book your parcel for Door-to-Door delivery
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  value="document"
                  {...register("parcelType")}
                  onChange={(e) => setParcelType(e.target.value)}
                />
                Document
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  value="non-document"
                  {...register("parcelType")}
                  onChange={(e) => setParcelType(e.target.value)}
                />
                Non-Document
              </label>
            </div>
            {errors.parcelType && (
              <p className="text-red-500">{errors.parcelType.message}</p>
            )}

            <input
              {...register("title")}
              placeholder="Parcel Title"
              className="w-full border p-2 rounded"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}

            {parcelType === "non-document" && (
              <input
                {...register("weight")}
                placeholder="Weight (Kg)"
                className="w-full border p-2 rounded"
              />
            )}
            {errors.weight && (
              <p className="text-red-500">{errors.weight.message}</p>
            )}
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sender */}
          <div className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Sender Info</h3>
            <input
              {...register("senderName")}
              placeholder="Sender Name"
              className="w-full border p-2 rounded mb-2"
            />
            {errors.senderName && (
              <p className="text-red-500">{errors.senderName.message}</p>
            )}

            <input
              {...register("senderPhone")}
              placeholder="Sender Phone"
              className="w-full border p-2 rounded mb-2"
            />
            {errors.senderPhone && (
              <p className="text-red-500">{errors.senderPhone.message}</p>
            )}

            <select
              {...register("senderRegion")}
              onChange={(e) => setSenderRegion(e.target.value)}
              className="w-full border p-2 rounded mb-2 bg-base-300"
            >
              <option value="">Select Region</option>
              {[...new Set(locations.map((loc) => loc.region))].map(
                (region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                )
              )}
            </select>
            {errors.senderRegion && (
              <p className="text-red-500">{errors.senderRegion.message}</p>
            )}

            <select
              {...register("senderCenter")}
              className="w-full border p-2 rounded mb-2 bg-base-300"
            >
              <option value="">Select Service Center</option>
              {senderCenters.map((center, i) => (
                <option key={i} value={center}>
                  {center}
                </option>
              ))}
            </select>
            {errors.senderCenter && (
              <p className="text-red-500">{errors.senderCenter.message}</p>
            )}
            <input
              {...register("senderAddress")}
              placeholder="Sender Address"
              className="w-full border p-2 rounded mb-2"
            />
            {errors.senderAddress && (
              <p className="text-red-500">{errors.senderAddress.message}</p>
            )}

            <textarea
              {...register("pickupInstruction")}
              placeholder="Pickup Instruction"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Receiver */}
          <div className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Receiver Info</h3>
            <input
              {...register("receiverName")}
              placeholder="Receiver Name"
              className="w-full border p-2 rounded mb-2"
            />
            {errors.receiverName && (
              <p className="text-red-500">{errors.receiverName.message}</p>
            )}

            <input
              {...register("receiverPhone")}
              placeholder="Receiver Phone"
              className="w-full border p-2 rounded mb-2"
            />
            {errors.receiverPhone && (
              <p className="text-red-500">{errors.receiverPhone.message}</p>
            )}

            <select
              {...register("receiverRegion")}
              onChange={(e) => setReceiverRegion(e.target.value)}
              className="w-full border p-2 rounded mb-2 bg-base-300"
            >
              <option value="">Select Region</option>
              {[...new Set(locations.map((loc) => loc.region))].map(
                (region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                )
              )}
            </select>
            {errors.receiverRegion && (
              <p className="text-red-500">{errors.receiverRegion.message}</p>
            )}

            <select
              {...register("receiverCenter")}
              className="w-full border p-2 rounded mb-2 bg-base-300"
            >
              <option value="">Select Service Center</option>
              {receiverCenters.map((center, i) => (
                <option key={i} value={center}>
                  {center}
                </option>
              ))}
            </select>
            {errors.receiverCenter && (
              <p className="text-red-500">{errors.receiverCenter.message}</p>
            )}
            <input
              {...register("receiverAddress")}
              placeholder="Receiver Address"
              className="w-full border p-2 rounded mb-2"
            />
            {errors.receiverAddress && (
              <p className="text-red-500">{errors.receiverAddress.message}</p>
            )}

            <textarea
              {...register("deliveryInstruction")}
              placeholder="Delivery Instruction"
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
