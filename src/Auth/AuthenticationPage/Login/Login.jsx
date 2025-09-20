import React from "react";
import { Link } from "react-router";
import GoogleLogin from "../LoginWithGoogle/GoogleLogin";

const Login = () => {
  return (
    <section className=" lg:px-16 ">
      <div className="mx-auto">
        <h1 className="font-extrabold text-3xl text-center md:text-start lg:text-4xl">Welcome Back </h1>
        <p className="text-primary text-center md:text-start my-1 lg:my-3">Login With ProFast</p>
        <form action="" className=" bg-white  px-3 py-2 md:p-4 lg:p-10 rounded-4xl">
          <fieldset className="fieldset">
            <label className="label text-primary font-bold">Email</label>
            <input type="email" className="input w-full" placeholder="Email" />
            <label className="label text-primary font-bold">Password</label>
            <input type="password" className="input w-full" placeholder="Password" />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn  bg-[#CAEB66] mt-4 w-full">Login</button>
          </fieldset>
			  <p className="text-sm my-2">Don’t have any account? <Link className="text-[#7fa215] link" to={'/register'}>Register</Link></p>
				  <p className="text-center text-primary">Or</p>
				  <div className="flex justify-center mt-5 ">
					  <GoogleLogin/>
				  </div>
			  </form>
      </div>
    </section>
  );
};

export default Login;
