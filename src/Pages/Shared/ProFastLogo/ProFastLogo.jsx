import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";

const ProFastLogo = () => {
  return (
    <Link to={'/'}>
      <div className="flex items-end">
        <img src={logo} alt="Logo" className="mb-1 " />
        <p className="text-2xl font-extrabold -ml-4">ProFast</p>
      </div>
    </Link>
  );
};

export default ProFastLogo;
