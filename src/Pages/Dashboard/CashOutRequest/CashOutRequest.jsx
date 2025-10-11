import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CashOutRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: cashOuts = [], isLoading } = useQuery({
    queryKey: ["adminCashouts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/cashouts");
      return res.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, action }) => {
      return await axiosSecure.patch(`/admin/cashouts/${id}`, { action });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminCashouts"]);
    },
  });

  const handleAction = (id, action) => {
    Swal.fire({
      title: `Are you sure you want to ${action} this request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        updateMutation.mutate({ id, action });
      }
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">💰 Pending CashOut Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>Rider</th>
              <th>Receiver</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cashOuts.map((parcel) => {
              const isHub =
                parcel.currentStatus?.includes("Sent") ||
                parcel.currentStatus?.includes("From");
              const earning = isHub
                ? (parcel.cost * 0.3).toFixed(2)
                : (parcel.cost * 0.8).toFixed(2);
              return (
                <tr key={parcel._id}>
                  <td>{parcel.riderInfo?.name}</td>
                  <td>{parcel.receiverName}</td>
                  <td>৳{earning}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        parcel.cashOutStatus === "pending"
                          ? "bg-yellow-500"
                          : parcel.cashOutStatus === "cashed out"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    >
                      {parcel.cashOutStatus}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleAction(parcel._id, "accept")}
                      className="btn btn-xs bg-green-600 text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(parcel._id, "reject")}
                      className="btn btn-xs bg-red-600 text-white"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {cashOuts.length === 0 && (
          <p className="text-center mt-5 text-gray-500">
            No pending cashOut requests.
          </p>
        )}
      </div>
    </div>
  );
};

export default CashOutRequest;
