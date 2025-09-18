import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import ProFastLogo from "../ProFastLogo/ProFastLogo";

const Navbar = () => {
const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme); 
  localStorage.setItem("theme", theme);
}, [theme]);

  const navItem = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItem}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <ProFastLogo />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItem}</ul>
      </div>
      <div className="navbar-end">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
            checked={theme === "dark"}
          />
          {/* Dark Icon */}
          <svg
            className="swap-on fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64 13a9 9 0 11-9-9 7 7 0 009 9z"></path>
          </svg>
          {/* Light Icon */}
          <svg
            className="swap-off fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64 17.64a1 1 0 01-.7-1.7l2-2a1 1 0 011.41 1.41l-2 2a1 1 0 01-.71.29zm0-11.28a1 1 0 01.7-1.7l2 2a1 1 0 11-1.41 1.41l-2-2zm12.72 0l-2 2a1 1 0 01-1.41-1.41l2-2a1 1 0 011.41 1.41zm0 11.28a1 1 0 01-.7 1.7l-2-2a1 1 0 011.41-1.41l2 2a1 1 0 01.71.71z"></path>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
