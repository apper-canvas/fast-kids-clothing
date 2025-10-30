import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CartPanel from "@/components/organisms/CartPanel";

export default function MainLayout() {
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.Id === product.Id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.Id === product.Id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.Id !== productId));
  };

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.Id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartValue = {
    items: cartItems,
    addToCart,
    removeFromCart,
    updateQuantity: updateCartItemQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
  };

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
      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Outlet context={cartValue} />
    </>
  );
}