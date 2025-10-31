import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import CartPanel from "@/components/organisms/CartPanel";
import recentlyViewedService from "@/services/api/recentlyViewedService";
import categoryService from "@/services/api/categoryService";

export default function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Cart state
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    loadRecentlyViewed();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

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

  // Context value to pass to child routes
  const outletContext = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    recentlyViewed,
    trackProductView,
    clearRecentlyViewed,
    categories,
    categoriesLoading,
    searchQuery,
    setSearchQuery,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        onSearch={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <CartPanel 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      <Outlet context={outletContext} />
    </div>
  );
}