import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home/Home";
import RootLayout from "../layouts/RootLayout";
import Login from "../Auth/AuthenticationPage/Login/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Auth/AuthenticationPage/Register/Register";
import ForgetPassword from "../Auth/AuthenticationPage/ForgetPassword/ForgetPassword";
import ResetPassword from "../Auth/AuthenticationPage/Resetpassword/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/register",
        Component: Register
      },
      {
        path: "/forgetPassword",
        Component: ForgetPassword
      },
      {
        path: "/resetPassword",
        Component: ResetPassword
      }
    ]
  }
]);
