import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const PendingDelivery = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🧭 Load Assigned Parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/parcels?email=${user?.email}`);
      return res.data;
    },
  });
	
  // 🧩 Accept / Reject Handler
  const mutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const res = await axiosSecure.patch(`/rider/parcel/${id}/action`, {
        action,
	  });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire("Success", data.message, "success");
      queryClient.invalidateQueries(["riderParcels", user?.email]);
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong", "error");
    },
  });

  // 📦 Update Tracking Status
  const updateTrackingMutation = useMutation({
    mutationFn: async ({ id, trackingInfo }) => {
      const res = await axiosSecure.patch(
        `/rider/parcel/${id}/tracking`,
        trackingInfo
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Parcel tracking updated successfully!", "success");
      queryClient.invalidateQueries(["riderParcels", user?.email]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update tracking info", "error");
    },
  });

  // 🧠 Confirm Dialog
	const handleAction = (id, action) => {
    Swal.fire({
      title: `Are you sure to ${action === "accept" ? "accept" : "reject"}?`,
      text:
        action === "accept"
          ? "You are confirming to receive this parcel."
          : "You are rejecting this parcel. It will be reassigned to another rider.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action === "accept" ? "Accept" : "Reject"}`,
      cancelButtonText: "Cancel",
      confirmButtonColor: action === "accept" ? "#16a34a" : "#dc2626",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, action });
      }
    });
  };

  // 🧾 Tracking Form Submit
  const handleTrackingUpdate = (id, e) => {
    e.preventDefault();
    const trackingInfo = {
      status: e.target.status.value,
    };
    updateTrackingMutation.mutate({ id, trackingInfo });
  };

  if (isLoading) return <p className="p-6">Loading assigned parcels...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📦 Assigned Parcels</h2>
      {parcels.length === 0 ? (
        <p>No parcels assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
          {parcels.map((parcel) => (
            <div
              key={parcel._id}
              className="border rounded-lg p-4 shadow-md bg-white transition hover:shadow-lg"
            >
              <h3 className="font-semibold text-lg mb-2">
                {parcel.receiverName}
              </h3>
              <p>
                <strong>District:</strong> {parcel?.receiverCenter}
              </p>
              <p>
                <strong>Address:</strong> {parcel?.receiverAddress}
              </p>
              <p>
                <strong>Phone:</strong> {parcel.receiverPhone}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {parcel.riderInfo?.riderStatus || "Pending"}
              </p>

				  {/* ✅ যদি Accept করা থাকে */}
              {parcel.riderInfo.riderStatus === "Accepted" ? (
                <form
                  onSubmit={(e) => handleTrackingUpdate(parcel._id, e)}
                  className="mt-4 space-y-3 bg-green-50 p-3 rounded"
                >
                  <h4 className="font-semibold text-green-700">
                    🚚 Update Tracking Info
                  </h4>
                  <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                      name="status"
                      className="select select-bordered w-full"
                      defaultValue={parcel?.currentStatus || ""}
                      required
                    >
                      <option value="Collected">Collected</option>
                      <option value="In Transit">In Transit</option>
                      <option value={`Sent From ${parcel?.senderRegion}`}>
                        Sent From {parcel?.senderRegion}
                      </option>
                      <option value={`Sent From ${parcel?.senderCenter}`}>
                        Sent From {parcel?.senderCenter}
                      </option>
                      <option value="Ready To Delivery">
                        Ready To Delivery
                      </option>
                      <option value="Delivered">Delivered</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-success w-full mt-2">
                    Update Tracking
                  </button>
                </form>
              ) : (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleAction(parcel._id, "accept")}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    ✅ Accept
                  </button>
                  <button
                    onClick={() => handleAction(parcel._id, "reject")}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingDelivery;
