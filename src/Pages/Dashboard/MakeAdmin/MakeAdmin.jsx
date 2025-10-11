import React, { useState } from "react";
import { UserCog, ShieldCheck, ShieldX, Search } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  // 🔹 Fetch users (live search)
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
    enabled: !!search,
  });

  // 🔹 Make Admin Mutation
  const makeAdminMutation = useMutation({
    mutationFn: async ({ id, previousRole }) => {
      await axiosSecure.patch(`/users/make-admin/${id}`, { previousRole });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users", search]);
      Swal.fire("✅ Success!", "User promoted to Admin", "success");
    },
  });

  // 🔹 Remove Admin Mutation
  const removeAdminMutation = useMutation({
    mutationFn: async ({ id }) => {
      await axiosSecure.patch(`/users/remove-admin/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users", search]);
      Swal.fire("🗑 Removed!", "Admin role removed", "info");
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Make ${user.email} an Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#caeb66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate({ id: user._id, previousRole: user.role });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Remove Admin?",
      text: "This will remove admin privileges!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeAdminMutation.mutate({ id: user._id });
      }
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-center mb-6 gap-2">
        <UserCog className="text-[#69890b] w-8 h-8" />
        <h2 className="text-3xl font-bold text-[#4b5563]">Manage Admins</h2>
      </div>

      {/* Search Field */}
      <div className="relative mb-6 max-w-md mx-auto">
        {/* Icon properly visible */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none z-10">
          <Search size={18} />
        </div>

        <input
          type="text"
          placeholder="Search by email..."
          className="input input-bordered w-full pl-10 bg-white border-[#caeb66] focus:outline-none focus:ring-2 focus:ring-[#caeb66] relative z-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Only show when search not empty */}
      {search && (
        <>
          {isLoading && (
            <p className="text-center text-lg text-[#caeb66]">Loading...</p>
          )}

          {!isLoading && users.length === 0 && (
            <p className="text-center text-gray-500">No users found.</p>
          )}

          {users.length > 0 && (
            <div className="overflow-x-auto shadow-lg rounded-lg border border-[#caeb66]/40">
              <table className="table w-full">
                <thead className="bg-[#caeb66] text-gray-800 uppercase text-sm">
                  <tr>
                    <th className="p-3 text-center">#</th>
                    <th className="p-3 text-center">Email</th>
                    <th className="p-3 text-center">Role</th>
                    <th className="p-3 text-center">Created At</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-[#f7ffe5] transition text-sm text-gray-700"
                    >
                      <td className="p-3 text-center font-semibold text-[#718355]">
                        {index + 1}
                      </td>
                      <td className="p-3 text-center">{user.email}</td>
                      <td className="p-3 text-center capitalize">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === "admin"
                              ? "text-white bg-green-700"
                              : user.role === "rider"
                              ? "bg-blue-700 text-white"
                              : "bg-white text-gray-700 border border-gray-300"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-center flex justify-center">
                        {user.role === "admin" ? (
                          <button
                            onClick={() => handleRemoveAdmin(user)}
                            className="btn   btn-xs bg-red-500 hover:bg-red-600 text-white border-none flex items-center  gap-1"
                          >
                            <ShieldX size={14} /> Remove Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className="btn btn-xs bg-[#caeb66] hover:bg-[#b4d85a] text-gray-800 border-none flex items-center gap-1"
                          >
                            <ShieldCheck size={14} /> Make Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MakeAdmin;
