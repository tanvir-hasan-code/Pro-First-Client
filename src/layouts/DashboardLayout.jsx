import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../Pages/Shared/ProFastLogo/ProFastLogo";

const DashboardLayout = () => {
  return (
    <section>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 font-bold text-xl md:text-2xl text-[#849f33] mx-2">
              Dashboard
            </div>
          </div>
          {/* Page content */}
          <div className="p-2 md:p-0">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <div className="bg-base-200 w-full px-2 pt-2">
            <ProFastLogo />
          </div>
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 h-screen overflow-hidden  w-60 p-4">
            <li>
              <NavLink to="/dashboard">Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/profile">My-Profile</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myParcels">My-Parcels</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/tracking">Tracking-Parcel</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/paymentHistory">Payment-History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
