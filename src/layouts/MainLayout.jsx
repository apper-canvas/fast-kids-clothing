import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import categoryService from "@/services/api/categoryService";
import recentlyViewedService from "@/services/api/recentlyViewedService";
import CartPanel from "@/components/organisms/CartPanel";
import Header from "@/components/organisms/Header";

export default function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  useEffect(() => {
    loadCategories();
    loadRecentlyViewed();
  }, []);

  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await categoryService.getAll();
      setCategories(data || []);
    } catch (error) {
      console.error('Failed to load categories:', error);
      setCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const loadRecentlyViewed = async () => {
    try {
      const data = await recentlyViewedService.getAll();
      setRecentlyViewed(data || []);
    } catch (error) {
      console.error('Failed to load recently viewed:', error);
      setRecentlyViewed([]);
    }
  };

  const trackProductView = async (productId) => {
    try {
      await recentlyViewedService.add(productId);
      await loadRecentlyViewed();
    } catch (error) {
      console.error('Failed to track product view:', error);
    }
  };

  const clearRecentlyViewed = async () => {
    try {
      await recentlyViewedService.clear();
      setRecentlyViewed([]);
    } catch (error) {
      console.error('Failed to clear recently viewed:', error);
    }
  };

  const outletContext = {
    categories,
    categoriesLoading,
    recentlyViewed,
    trackProductView,
    clearRecentlyViewed,
    searchQuery,
    setSearchQuery
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header 
          onSearch={setSearchQuery}
          onOpenCart={() => setIsCartOpen(true)}
        />
        
        <main className="flex-1">
          <Outlet context={outletContext} />
        </main>

        <CartPanel 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>
    </CartProvider>
  );
}