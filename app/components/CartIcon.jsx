"use client"
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; 
import { useCart } from '@/app/contexts/CartContext'; 
const CartIcon = () => {
  const { getTotalQuantity } = useCart(); 
  const totalItems = getTotalQuantity(); 

  return (
    <div className="relative">
      <FaShoppingCart className="text-4xl text-gray-800" /> 
      
      {/*displays the total number of items in the cart*/}
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full text-xl w-6 h-6 flex items-center justify-center">
          {totalItems}
        </span> 
      )}
    </div>
  );
};

export default CartIcon;
