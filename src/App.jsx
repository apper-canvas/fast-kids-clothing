import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import React, { useContext } from "react";
import recentlyViewedService from "@/services/api/recentlyViewedService";
import { CartContext } from "@/contexts/CartContext";
import PromptPassword from "@/components/pages/PromptPassword";
import Callback from "@/components/pages/Callback";
import ShopPage from "@/components/pages/ShopPage";
import ErrorPage from "@/components/pages/ErrorPage";
import CheckoutPage from "@/components/pages/CheckoutPage";
import Signup from "@/components/pages/Signup";
import Login from "@/components/pages/Login";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import ResetPassword from "@/components/pages/ResetPassword";
import Error from "@/components/ui/Error";
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartContext.Provider');
  }
  return context;
};
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;