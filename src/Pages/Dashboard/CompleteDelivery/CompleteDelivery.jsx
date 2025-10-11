import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const CompleteDelivery = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🧭 Load Completed Deliveries
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completeDelivery", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/complete-delivery?email=${user?.email}`
      );
      return res.data;
    },
  });

  // 💸 Cash Out Request
  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/rider/cashout/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire("Success", data.message, "success");
      queryClient.invalidateQueries(["completeDelivery", user?.email]);
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong", "error");
    },
  });

	const handleCashOut = (id, cost) => {
	  console.log(cost)
    Swal.fire({
      title: "Cash Out Request?",
      text: "Are you sure to request cash out for this delivery?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Request",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
      }
    });
  };

  if (isLoading)
    return <p className="text-center p-6 font-semibold">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        ✅ Complete Deliveries
      </h2>

      {parcels.length === 0 ? (
        <p>No completed deliveries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl shadow-md">
            <thead className="bg-green-200">
              <tr className="text-left">
                <th className="p-3">Receiver</th>
                <th className="p-3">Address</th>
                <th className="p-3">Current Status</th>
                <th className="p-3">Cost</th>
                <th className="p-3">Your Earning</th>
                <th className="p-3 text-center">Cash Out</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => {
                const isHub =
                  parcel.currentStatus?.includes("Sent") ||
                  parcel.currentStatus?.includes("From");
                const earning = isHub
                  ? (parcel.cost * 0.3).toFixed(2)
                  : (parcel.cost * 0.8).toFixed(2);

                return (
                  <tr
                    key={parcel._id}
                    className="border-b hover:bg-green-50 transition"
                  >
                    <td className="p-3">{parcel.receiverName}</td>
                    <td className="p-3">{parcel.receiverAddress}</td>
                    <td className="p-3">{parcel.currentStatus}</td>
                    <td className="p-3 font-semibold">৳ {parcel.cost}</td>
                    <td className="p-3 text-green-700 font-bold">
                      ৳ {earning}
                    </td>
                    <td className="p-3 text-center">
                      {parcel.cashOutStatus === "Cashed Out" ? (
                        <button className="px-3 py-1 bg-green-600 text-white rounded">
                          Cashed Out
                        </button>
                      ) : parcel.cashOutStatus === "Pending" ? (
                        <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                          Pending
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleCashOut(
                              parcel._id,
                              isHub ? parcel.cost * 0.3 : parcel.cost * 0.8 ,
                            )
                          }
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          Cash Out
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompleteDelivery;
