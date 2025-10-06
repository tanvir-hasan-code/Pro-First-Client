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
import Payment from "../Pages/Dashboard/Payment/Payment";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import PHistory from "../Pages/Dashboard/Payment/PaymentHistory/PHistory";
import TrackingParcel from "../Pages/Dashboard/TrackingParcel/TrackingParcel";
import BeARider from "../Pages/Components/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRider/ActiveRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";

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
      },
      {
        path: "/beARider",
        element: <PrivateRoute><BeARider/></PrivateRoute>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <h1>THis Is My Home</h1>
    },
      {
        path: "myParcels",
        Component: MyParcels
      },
      {
        path: "payment/:parcelId",
        Component: Payment
      },
      {
        path: "profile",
        Component: MyProfile
      },
      {
        path: "paymentHistory",
        Component: PHistory
      },
      {
        path: "tracking",
        Component: TrackingParcel
      },
      {
        path: "pending-riders",
        Component: PendingRiders
      },
      {
        path: "active-riders",
        Component: ActiveRiders
      },
      {
        path: "make-admin",
        Component: MakeAdmin
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
