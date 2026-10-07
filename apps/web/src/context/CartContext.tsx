'use client';

import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  color?: string;
  customName?: string;
  customNumber?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  selectedProductForDetail: any | null;
  setSelectedProductForDetail: (product: any | null) => void;
  totalPrice: number;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'item-1',
      name: 'Heritage Maroon Jersey',
      price: 340,
      size: 'L',
      quantity: 1,
      image: '/images/jersey-maroon.png',
      color: 'Maroon / Gold',
      customNumber: '7',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<any | null>(null);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.name === newItem.name && i.size === newItem.size && i.customName === newItem.customName && i.customNumber === newItem.customNumber
      );
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, { ...newItem, id: `item-${Date.now()}` }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        totalPrice,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
