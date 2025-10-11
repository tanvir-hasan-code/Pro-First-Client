import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [loadingAssign, setLoadingAssign] = useState(false);

  // Fetch paid parcels
  const { data: parcels = [], isLoading: parcelLoading } = useQuery({
    queryKey: ["parcels-paid"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data.filter((p) => p.paid_status);
    },
  });

  // Fetch active riders
  const { data: riders = [], isLoading: riderLoading } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/active");
      return res.data;
    },
  });

  // Assign Rider Mutation
  const assignMutation = useMutation({
	  mutationFn: async ({ parcelId, rider }) => {
      return await axiosSecure.patch(`/parcels/${parcelId}/assign`, {
        riderInfo: {
          name: rider.name,
          email: rider.email,
          phone: rider.phone,
          region: rider.region,
        }
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: "✅ Rider Assigned!",
        text: "Rider successfully assigned to this parcel.",
        icon: "success",
        confirmButtonColor: "#caeb66",
      });
      queryClient.invalidateQueries(["parcels-paid"]);
      setSelectedParcel(null);
    },
  });

  // Remove Rider Mutation
  const removeMutation = useMutation({
    mutationFn: async (parcelId) => {
      return await axiosSecure.patch(`/parcels/${parcelId}/remove-rider`, {
        riderInfo: null,
        currentStatus: "Pending",
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: "❌ Rider Removed!",
        text: "Rider has been removed from this parcel.",
        icon: "info",
        confirmButtonColor: "#caeb66",
      });
      queryClient.invalidateQueries(["parcels-paid"]);
    },
  });

  // Handle Assign with confirmation
  const handleAssign = (parcel, rider) => {
    Swal.fire({
      title: "Assign this Rider?",
      text: `Are you sure you want to assign ${rider.name} to parcel ${parcel.trackingId}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#caeb66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Assign",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingAssign(true);
        await assignMutation.mutateAsync({ parcelId: parcel._id, rider });
        setLoadingAssign(false);
      }
    });
  };

  // Handle Remove with confirmation
  const handleRemove = (parcelId) => {
    Swal.fire({
      title: "Remove Rider?",
      text: "This will unassign the rider from this parcel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#caeb66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        removeMutation.mutate(parcelId);
      }
    });
  };

  if (parcelLoading || riderLoading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner text-success w-14 h-14"></span>
      </div>
    );

  return (
    <div className="p-6 bg-gradient-to-br from-[#f9ffe7] to-[#e7ffb0] min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-[#2e3b0b] drop-shadow-sm">
        🏍 Assign Rider to Paid Parcels
      </h2>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-600 text-lg font-medium">
          No paid parcels found 😕
        </p>
      ) : (
        <div className="overflow-x-auto shadow-2xl rounded-2xl border border-[#caeb66]/50">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-[#caeb66] to-[#b0d954] text-[#2e3b0b] text-lg">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Receiver</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Rider</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-[#f6ffe0] transition duration-200 border-b border-[#caeb66]/30"
                >
                  <td className="font-semibold text-[#4b5d12]">{index + 1}</td>
                  <td className="text-[#2e3b0b] font-medium">
                    {parcel.trackingId}
                  </td>
                  <td className="text-[#2e3b0b]">{parcel.receiverName}</td>
                  <td className="">
                    <span className="badge bg-[#caeb66]/80 text-[#2e3b0b] border-none">
                      {parcel.senderRegion === parcel.receiverRegion? `Enter City ${parcel.senderRegion}`: `${parcel.senderRegion} - ${parcel?.receiverRegion}`}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge border-none ${
                        parcel?.riderInfo?.riderStatus === "Accepted" 
                          ? "bg-green-500 text-white"
                          : "bg-yellow-400 text-[#2e3b0b]"
                      }`}
                    >
                      { parcel?.riderInfo?.riderStatus || parcel?.currentStatus}
                    </span>
                  </td>
                  <td className="text-sm text-gray-700">
                    {parcel?.riderInfo?.name ? parcel.riderInfo.name : "-"}
                  </td>
                  <td>
                    {parcel.riderInfo ? (
                      <button
                        onClick={() => handleRemove(parcel._id)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                      >
                        <FaUserMinus /> Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedParcel(parcel)}
                        className="btn btn-sm bg-[#caeb66] hover:bg-[#b0d954] text-[#2e3b0b] flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                      >
                        <FaUserPlus /> Assign
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rider selection modal */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] md:w-[600px] shadow-2xl border-t-8 border-[#caeb66] animate-fadeIn">
            <h3 className="text-2xl font-bold mb-3 text-[#2e3b0b] text-center">
              Select Rider for:{" "}
              <span className="text-[#8fae33]">{selectedParcel.trackingId}</span>
            </h3>
            <p className="text-sm mb-4 text-gray-600 text-center">
              Showing riders from region:{" "}
              <span className="font-semibold text-[#2e3b0b]">
                {selectedParcel.receiverRegion}
              </span>
            </p>

            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {riders
                .filter(
                  (r) =>
                    r.region?.toLowerCase() ===
                    selectedParcel.receiverRegion?.toLowerCase()
                )
                .map((rider) => (
                  <div
                    key={rider._id}
                    className="border border-[#caeb66]/40 rounded-lg p-3 flex justify-between items-center bg-[#f9ffe7] hover:bg-[#ecffc9] transition"
                  >
                    <div>
                      <h4 className="font-semibold text-[#2e3b0b]">
                        {rider.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {rider.email} | {rider.phone}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAssign(selectedParcel, rider)}
                      disabled={loadingAssign}
                      className="btn btn-xs bg-[#caeb66] text-[#2e3b0b] hover:bg-[#b0d954] shadow-md"
                    >
                      {loadingAssign ? "Assigning..." : "Assign"}
                    </button>
                  </div>
                ))}
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={() => setSelectedParcel(null)}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white px-6"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
