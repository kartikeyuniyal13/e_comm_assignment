"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCartItems } from '@/app/helper/actions/cart.action';
import { useAuth } from '@clerk/nextjs';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (userId) {
          const data = await getCartItems(userId);
          const items = data.items || []; // Extract items array
          setCartItems(items);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setCartItems([]);
      }
    };

    fetchCartItems();
  }, [userId]);

  const updateCartItems = (items) => {
    setCartItems(items);
  };

  const clearLocalCart = () => {
    setCartItems([]); 
  };

  const getTotalQuantity = () => {
    if (!Array.isArray(cartItems)) {
      return 0;
    }
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCartItems,clearLocalCart,getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);