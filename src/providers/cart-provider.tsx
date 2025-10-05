'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode, useEffect } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { useToast } from "@/hooks/use-toast"

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, selectedSize: string, selectedColor: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);


    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window === 'undefined') {
            return [];
        }
        try {
            const localData = window.localStorage.getItem('saru-cart');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Error reading from local storage", error);
            return [];
        }
    });
    
    const { toast } = useToast()

    useEffect(() => {
        try {
            window.localStorage.setItem('saru-cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Error writing to local storage", error);
        }
    }, [cartItems]);

  const addToCart = (product: Product, quantity: number, selectedSize: string, selectedColor: string) => {
    setCartItems(prevItems => {
      const itemKey = `${product.id}-${selectedSize}-${selectedColor}`;
      const existingItem = prevItems.find(item => `${item.id}-${item.selectedSize}-${item.selectedColor}` === itemKey);

      if (existingItem) {
        return prevItems.map(item =>
          `${item.id}-${item.selectedSize}-${item.selectedColor}` === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity, selectedSize, selectedColor }];
    });
    toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
    })
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => `${item.id}-${item.selectedSize}-${item.selectedColor}` !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        `${item.id}-${item.selectedSize}-${item.selectedColor}` === itemId
          ? { ...item, quantity: quantity > 0 ? quantity : 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(() => {
    if (!isClient) return 0;
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems, isClient]);
  
  const cartTotal = useMemo(() => {
    if (!isClient) return 0;
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems, isClient]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
