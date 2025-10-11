import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  FaBoxOpen,
  FaMoneyBillWave,
  FaUndo,
  FaHourglassHalf,
  FaCheckCircle,
  FaWarehouse,
  FaClock,
} from "react-icons/fa";

const COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#eab308", "#a855f7", "#fb923c"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: statusData = [], isLoading } = useQuery({
    queryKey: ["parcelStatusCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/status-count");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  // ✅ Group all "Sent From ..." as Hub Deposited
  let hubCount = 0;
  const statusMap = {};

  statusData.forEach((item) => {
    if (item._id?.startsWith("Sent From")) {
      hubCount += item.count;
    } else {
      statusMap[item._id] = item.count;
    }
  });

  // ✅ Prepare data for chart
  const chartData = [
    { name: "Delivered", value: statusMap["Delivered"] || 0 },
    { name: "Hub Deposited", value: hubCount },
    { name: "Returned", value: statusMap["Returned"] || 0 },
    { name: "Not Collected", value: statusMap["not_collected"] || 0 },
    { name: "Unpaid", value: statusMap["Unpaid"] || 0 },
    { name: "Pending", value: statusMap["Pending"] || 0 },
  ].filter((d) => d.value > 0);

  // ✅ For cards
  const visibleCards = [
    {
      title: "Delivered Parcels",
      count: statusMap["Delivered"],
      icon: <FaCheckCircle className="text-green-600 text-4xl" />,
      color: "bg-green-100 border-green-400",
    },
    {
      title: "Hub Deposited",
      count: hubCount,
      icon: <FaWarehouse className="text-blue-600 text-4xl" />,
      color: "bg-blue-100 border-blue-400",
    },
    {
      title: "Returned Parcels",
      count: statusMap["Returned"],
      icon: <FaUndo className="text-red-600 text-4xl" />,
      color: "bg-red-100 border-red-400",
    },
    {
      title: "Not Collected",
      count: statusMap["not_collected"],
      icon: <FaHourglassHalf className="text-yellow-600 text-4xl" />,
      color: "bg-yellow-100 border-yellow-400",
    },
    {
      title: "Unpaid Parcels",
      count: statusMap["Unpaid"],
      icon: <FaMoneyBillWave className="text-purple-600 text-4xl" />,
      color: "bg-purple-100 border-purple-400",
    },
    {
      title: "Pending Parcels",
      count: statusMap["Pending"],
      icon: <FaClock className="text-orange-600 text-4xl" />,
      color: "bg-orange-100 border-orange-400",
    },
  ].filter((card) => card.count > 0);

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 via-white to-pink-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 drop-shadow">
        📊 Parcel Status Overview
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {visibleCards.map((card, idx) => (
          <div
            key={idx}
            className={`card border-2 ${card.color} shadow-md transition-transform hover:scale-105`}
          >
            <div className="card-body items-center text-center">
              {card.icon}
              <h3 className="text-lg font-semibold mt-2 text-gray-700">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{card.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          📈 Delivery Status Chart
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
