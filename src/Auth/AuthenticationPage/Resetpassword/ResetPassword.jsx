import React from "react";

const ResetPassword = () => {
  return (
    <section className=" lg:px-16 ">
      <div className="mx-auto">
        <h1 className="font-extrabold text-3xl text-center md:text-start lg:text-4xl">
          Reset Password{" "}
        </h1>
        <p className="text-primary text-center md:text-start my-1 lg:my-3">
          Reset Your Password
        </p>
        <form
          //   onSubmit={handleSubmit(onSubmit)}
          className=" bg-white  px-3 py-2 md:p-4 lg:p-10 rounded-4xl"
        >
          <fieldset className="fieldset">
            <label className="label text-primary font-bold">New Password</label>
            <input
              type="password"
              //   {...register("email")}
              className="input w-full"
              placeholder="New Password"
            />
            <label className="label text-primary font-bold">Confirm Password</label>
            <input
              type="password"
              //   {...register("email")}
              className="input w-full"
              placeholder="Confirm Password"
            />
            <button className="btn  bg-[#CAEB66] mt-4 w-full">Reset Password</button>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
