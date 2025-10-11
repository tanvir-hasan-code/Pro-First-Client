import React from "react";
import useUserRole from "../../Hooks/useUserRole";
import LoadingPage from "../../LoadingPage/LoadingPage";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";
import ForbiddenPage from "../../Pages/ForbiddenPage/ForbiddenPage";

const DashboardHome = () => {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  } else if (role === "rider") {
    return <RiderDashboard />;
  } else if (role === "user") {
    return <UserDashboard />;
  } else {
    return <ForbiddenPage />;
  }
};

export default DashboardHome;
