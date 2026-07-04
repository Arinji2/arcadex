"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

export type GameItem = {
  id: string;
  title: string;
  price: number;
  date: string;
  time: string;
  image: string;
};

interface CartContextType {
  items: GameItem[];
  addToCart: (item: GameItem) => void;
  removeFromCart: (id: string) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  total: number;
  clearCart: () => void;
  jiggle: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<GameItem[]>([]);
  const [jiggle, setJiggle] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const addToCart = (item: GameItem) => {
    if (!items.find((i) => i.id === item.id)) {
      setItems((prev) => [...prev, item]);

      setJiggle(true);
      setTimeout(() => setJiggle(false), 500);
    }
  };

  const removeFromCart = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        isSidebarOpen,
        setSidebarOpen,
        total,
        clearCart,
        jiggle,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
