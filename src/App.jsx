import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import React, { useContext, useEffect, useState, createContext } from "react";
import recentlyViewedService from "@/services/api/recentlyViewedService";
import Callback from "@/components/pages/Callback";
import Signup from "@/components/pages/Signup";
import Login from "@/components/pages/Login";
import Error from "@/components/ui/Error";
// Create contexts
export const CartContext = createContext({});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartContext.Provider');
  }
  return context;
};
function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Get authentication status with proper error handling
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    loadRecentlyViewed();
  }, []);


  const loadRecentlyViewed = async () => {
    const products = await recentlyViewedService.getAll();
    setRecentlyViewed(products);
  };

  const trackProductView = (productId) => {
    recentlyViewedService.trackView(productId);
    loadRecentlyViewed();
  };

  const clearRecentlyViewed = () => {
    recentlyViewedService.clear();
    setRecentlyViewed([]);
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Authentication methods to share via context

  const cartValue = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    recentlyViewed,
    trackProductView,
    clearRecentlyViewed
};

  return (
    <CartContext.Provider value={cartValue}>
      <RouterProvider router={router} />
    </CartContext.Provider>
  );
}

export default App;