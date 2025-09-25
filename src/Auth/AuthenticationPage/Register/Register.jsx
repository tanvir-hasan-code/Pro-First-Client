import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../LoginWithGoogle/GoogleLogin";
import { MdDriveFolderUpload } from "react-icons/md";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Register = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";


  // React Hooks Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useAuth();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Registration Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from)
          })
          .catch((err) => {
            if (err) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Registration Failed",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Registration failed!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleGoogleSingIn = (e) => {
    e.preventDefault();
  };

  return (
    <section className=" lg:px-16 ">
      <div className="mx-auto">
        <h1 className="font-extrabold text-3xl text-center md:text-start lg:text-4xl">
          Create an Account{" "}
        </h1>
        <p className="text-primary text-center md:text-start my-1 lg:my-3">
          Register with Profast
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-white  px-3 py-2 md:p-4 lg:p-10 rounded-4xl"
        >
          <fieldset className="fieldset">
            <label className="p-2 rounded-full bg-base-300 w-fit">
              <MdDriveFolderUpload size={32} />
            </label>

            {/* Name Field */}
            <label className="label text-primary font-bold">Name</label>
            <input
              type="name"
              {...register("name", { required: true, minLength: 6 })}
              className="input w-full"
              placeholder="Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-600">Name Required</p>
            )}
            {errors.name?.type === "minLength" && (
              <p className="text-red-600">Name Must Be 6 Character</p>
            )}

            {/* Email Field */}
            <label className="label text-primary font-bold">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600">Email Required</p>
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
              <p className="text-red-600">Password Required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password Must Be 6 Character</p>
            )}
            <button className="btn  bg-[#CAEB66] mt-4 w-full">Register</button>
          </fieldset>
          <p className="text-sm my-2">
            Already have an account?{" "}
            <Link className="text-[#7fa215] link" to={"/login"}>
              Login
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

export default Register;
