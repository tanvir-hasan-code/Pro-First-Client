import React from "react";
import { Link } from "react-router";

const ForgetPassword = () => {
  return (
    <section className=" lg:px-16 ">
      <div className="mx-auto">
        <h1 className="font-extrabold text-3xl text-center md:text-start lg:text-4xl">
          Forgot Password{" "}
        </h1>
        <p className="text-primary text-center md:text-start my-1 lg:my-3">
         Enter your email address and we’ll send you a reset link.
        </p>
        <form
        //   onSubmit={handleSubmit(onSubmit)}
          className=" bg-white  px-3 py-2 md:p-4 lg:p-10 rounded-4xl"
        >
          <fieldset className="fieldset">
            <label className="label text-primary font-bold">Email</label>
            <input
              type="email"
            //   {...register("email")}
              className="input w-full"
              placeholder="Email"
            />
            <button className="btn  bg-[#CAEB66] mt-4 w-full">Send</button>
          </fieldset>
          <p className="text-sm my-2">
           Remember your password?{" "}
            <Link className="text-[#7fa215] link" to={"/login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
