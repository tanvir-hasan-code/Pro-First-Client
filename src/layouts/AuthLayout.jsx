import React from "react";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import ProFastLogo from "../Pages/Shared/ProFastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <section className="bg-[#FAFDF0] my-3 lg:my-5 rounded-3xl px-5 md:px-10 py-5">
      <ProFastLogo />
      <div className="flex flex-col-reverse  items-center  md:flex-row w-full">
        {/* Outlet Section Login Register verify Email etc Section */}
        <section className="flex-1 my-5  w-full md:mx-auto">
          <Outlet />
        </section>
        {/* Auth Image Section */}
        <section className="flex-1 mx-auto ">
          <img src={authImage} alt="Auth-Image" className="m-auto " />
        </section>
      </div>
    </section>
  );
};

export default AuthLayout;
