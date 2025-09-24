import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "aos/dist/aos.css";
import { RouterProvider } from "react-router";
import { router } from "./Router/Router";
import AOS from "aos";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

AOS.init();
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="max-w-7xl mx-auto font-urbanist ">
      <QueryClientProvider client={queryClient}>
         <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
     </QueryClientProvider>
    </div>
  </StrictMode>
);
