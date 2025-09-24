import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home/Home";
import RootLayout from "../layouts/RootLayout";
import Login from "../Auth/AuthenticationPage/Login/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Auth/AuthenticationPage/Register/Register";
import ForgetPassword from "../Auth/AuthenticationPage/ForgetPassword/ForgetPassword";
import ResetPassword from "../Auth/AuthenticationPage/Resetpassword/ResetPassword";
import CoverageMap from "../Pages/Components/Coverage/CoverageMap";
import PrivateRoute from "../Route/PrivateRoute";
import SendParcel from "../Pages/Components/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/sendParcel",
        element: <PrivateRoute><SendParcel/></PrivateRoute>
      },
      {
        path: "/coverage",
        Component: CoverageMap
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "myParcels",
        Component: MyParcels
      }
    ]
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
