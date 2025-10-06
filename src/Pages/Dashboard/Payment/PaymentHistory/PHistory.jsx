import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const PHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-extrabold text-center my-6 text-[#4B5563]">
        💳 Payment History
      </h1>

      <div className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-200">
        <table className="table w-full text-center">
          {/* Table Head */}
          <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm uppercase">
            <tr>
              <th className="py-3">#</th>
              <th>Parcel ID</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200 bg-white">
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-100 transition duration-300"
                >
                  <td className="py-3 font-semibold text-gray-700">
                    {index + 1}
                  </td>
                  <td className="text-blue-600 font-medium">
                    {payment.parcelId}
                  </td>
                  <td className="text-green-600 font-bold">
                    ${payment.amount}
                  </td>
                  <td className="text-gray-600">{payment.transactionId}</td>
                  <td className="text-gray-500 text-sm">
                    {new Date(payment.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-5 text-center text-gray-500 italic"
                >
                  No Payment History Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PHistory;
