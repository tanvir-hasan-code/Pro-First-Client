import React, { useState } from "react";
import { Clipboard, Check, Eye, Pencil, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdOutlinePayments } from "react-icons/md";
import { useNavigate } from "react-router";

// const parcels = [
//   {
//     _id: "68d42e4e00b95480397566db",
//     parcelType: "non-document",
//     title: "Banana",
//     receiverName: "Tanvir Hasan",
//     receiverPhone: "01796255214",
//     receiverAddress: "PANCHPAIKA, DOKKHINPARA, GABTOLI, BOGURA",
//     receiverRegion: "Mymensingh",
//     receiverCenter: "Sherpur",
//     trackingId: "TRK898543534",
//     cost: 270,
//     booking_date: "2025-09-24T17:45:50.003Z",
//   },
//   {
//     _id: "68d42eb100b95480397566dc",
//     parcelType: "document",
//     title: "NID Card",
//     receiverName: "Tanvir Hasan",
//     receiverPhone: "01796255213",
//     receiverAddress: "PANCHPAIKA, DOKKHINPARA, GABTOLI, BOGURA",
//     receiverRegion: "Barisal",
//     receiverCenter: "Pirojpur",
//     trackingId: "TRK046825313",
//     cost: 80,
//     booking_date: "2025-09-24T17:47:29.853Z",
//   },
// ];

const MyParcels = () => {
  const [copiedId, setCopiedId] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true)
  const { user } = useAuth();
	const navigate = useNavigate();
  const { data: parcels=[], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      setLoading(false);
      return res.data;
    },
  });

  const handleCopy = (trackingId) => {
    navigator.clipboard.writeText(trackingId);
    setCopiedId(trackingId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleView = (id) => alert(`View parcel: ${id}`);
	const handleEdit = (id) => alert(`Edit parcel: ${id}`);
	
	const handlePayment = (id) => {
		navigate(`/dashboard/payment/${id}`)
  }



  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/parcels/${id}`)
          .then((res) => {
            if (res) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Parcel Has Been Deleted!",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          })
          .catch((err) => {
            if (err) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Delete Failed!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  if (loading) {
    return "Loading......"
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">My Parcels</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="p-3 text-center">#</th>
              <th className="p-3 text-center">Title</th>
              <th className="p-3 text-center">Receiver</th>
              <th className="p-3 text-center">Type</th>
              <th className="p-3 text-center">Tracking ID</th>
              <th className="p-3 text-center">Cost</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>


          {/* Table Body */}
          <tbody>
            {parcels?.length ? (
              parcels?.map((parcel, index) => {
                return (
                  <tr
                    key={parcel._id}
                    className="hover:bg-gray-50 text-sm transition"
                  >
                    <td className="p-3 text-center">{index + 1}</td>
                    <td className="p-3 text-center font-semibold">
                      {parcel.title}
                    </td>

                    {/* Receiver Info */}
                    <td className="p-3 text-center">
                      <p className="font-medium">{parcel.receiverName}</p>
                      <p className="text-xs text-gray-500">
                        {parcel.receiverPhone}
                      </p>
                    </td>

                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          parcel.parcelType === "document"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {parcel.parcelType}
                      </span>
                    </td>

                    {/* Tracking ID */}
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-700 font-mono">
                          {parcel.trackingId}
                        </span>
                        <button
                          onClick={() => handleCopy(parcel.trackingId)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all duration-200 ${
                            copiedId === parcel.trackingId
                              ? "bg-green-500 text-white"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                          title={
                            copiedId === parcel.trackingId
                              ? "Copied!"
                              : "Copy Tracking ID"
                          }
                        >
                          {copiedId === parcel.trackingId ? (
                            <>
                              <Check size={14} /> Copied
                            </>
                          ) : (
                            <>
                              <Clipboard size={14} /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="p-3 text-center font-bold text-blue-600">
                      ৳{parcel.cost}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          parcel.status ? "bg-green-600" : "bg-red-500"
                        }`}
                      >
                        {parcel?.status ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {new Date(parcel.booking_date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true, 
                      })}
                    </td>

                    {/* Action Buttons */}
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleView(parcel._id)}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs"
                        >
                          <Eye size={14} /> View
                        </button>
                        {parcel?.status? <button
                          onClick={() => handleEdit(parcel._id)}
                          className="flex items-center gap-1 px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs"
                        >
                          <Pencil size={14} /> Edit
								</button> : <button onClick={() => handlePayment(parcel._id)} className="flex items-center gap-1 bg-[#caeb67] py-1  text-white rounded hover:bg-[#344F1F] text-xs px-2">
								<MdOutlinePayments size={14}/> Pay
								</button>}
                        <button
                          onClick={() => handleDelete(parcel._id)}
                          className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="text-center p-3">
                  No parcels found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
