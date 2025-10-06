import React, { useState } from "react";
import { Eye, XCircle, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ActiveRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch active riders
  const { isPending, data: riders = [] } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/active");
      return res.data;
    },
  });

  // Update rider status (deactivate)
  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const res = await axiosSecure.patch(`/users/${id}`, { status: newStatus });
      return res.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(["active-riders"]);
      setOpen(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: `Rider has been ${variables.newStatus}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      console.error("Error updating status:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update rider status",
        text: error.message || "Please try again",
        showConfirmButton: true,
      });
    },
  });

  const handleDeactivate = (id) => {
    Swal.fire({
      title: "Are you sure you want to deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus({ id, newStatus: "deactivate" });
      }
    });
  };

  if (isPending) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-6">
        🟢 Active Riders
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="p-3 text-center">#</th>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Region</th>
              <th className="p-3 text-center">District</th>
              <th className="p-3 text-center">Bike Name</th>
              <th className="p-3 text-center">Phone</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {riders?.length ? (
              riders.map((rider, index) => (
                <tr key={rider._id} className="hover:bg-gray-50 text-sm transition">
                  <td className="p-3 text-center">{index + 1}</td>
                  <td className="p-3 text-center font-medium">{rider.name}</td>
                  <td className="p-3 text-center">{rider.region}</td>
                  <td className="p-3 text-center">{rider.district}</td>
                  <td className="p-3 text-center">{rider.bikeName}</td>
                  <td className="p-3 text-center">{rider.phone}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-1 rounded text-white text-xs bg-green-500 capitalize">
                      {rider.status}
                    </span>
                  </td>
                  <td className="p-3 text-center flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedRider(rider);
                        setOpen(true);
                      }}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs"
                    >
                      <Eye size={14} /> View
                    </button>
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    >
                      <XCircle size={14} /> Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-3">
                  No active riders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && selectedRider && (
        <div className="fixed inset-0 flex justify-center items-start z-50 pt-20">
          <div className="absolute inset-0 bg-black opacity-25"></div>
          <div className="relative bg-white rounded-lg w-11/12 md:w-7/12 lg:w-4/12 p-6 shadow-lg z-50 overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-indigo-700 mb-4">
              Rider Details
            </h3>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedRider.name}</p>
              <p><strong>Age:</strong> {selectedRider.age}</p>
              <p><strong>Email:</strong> {selectedRider.email}</p>
              <p><strong>Region:</strong> {selectedRider.region}</p>
              <p><strong>District:</strong> {selectedRider.district}</p>
              <p><strong>Bike Name:</strong> {selectedRider.bikeName}</p>
              <p><strong>Bike Reg:</strong> {selectedRider.bikeReg}</p>
              <p><strong>NID:</strong> {selectedRider.nid}</p>
              <p><strong>Phone:</strong> {selectedRider.phone}</p>
              <p><strong>Info:</strong> {selectedRider.info}</p>
              <p><strong>Status:</strong> {selectedRider.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;
