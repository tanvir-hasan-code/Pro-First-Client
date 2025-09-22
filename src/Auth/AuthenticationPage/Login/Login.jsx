import React from "react";
import { Link } from "react-router";
import GoogleLogin from "../LoginWithGoogle/GoogleLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser } = useAuth();

  const handleGoogleSingIn = (e) => {
    e.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    signInUser(email, password)
      .then((result) => {
        if (result) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        if (error) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Login Failed!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <section className=" lg:px-16 ">
      <div className="mx-auto">
        <h1 className="font-extrabold text-3xl text-center md:text-start lg:text-4xl">
          Welcome Back{" "}
        </h1>
        <p className="text-primary text-center md:text-start my-1 lg:my-3">
          Login With ProFast
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-white  px-3 py-2 md:p-4 lg:p-10 rounded-4xl"
        >
          <fieldset className="fieldset">
            {/* Email Field */}
            <label className="label text-primary font-bold">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600">Email Field is Required</p>
            )}

            {/* Password Field */}
            <label className="label text-primary font-bold">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="text-red-600">
                Password Required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p role="alert" className="text-red-600">
                Password is 6 Carecter is Longer
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn  bg-[#CAEB66] mt-4 w-full">Login</button>
          </fieldset>
          <p className="text-sm my-2">
            Don’t have any account?{" "}
            <Link className="text-[#7fa215] link" to={"/register"}>
              Register
            </Link>
          </p>
          <p className="text-center text-primary">Or</p>
          <div
            onClick={handleGoogleSingIn}
            className="flex justify-center mt-5 "
          >
            <GoogleLogin />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
