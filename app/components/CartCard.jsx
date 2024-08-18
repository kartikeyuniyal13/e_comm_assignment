"use client";
import React, { useState } from 'react';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '@/app/helper/actions/cart.action';
import { useCart } from '@/app/contexts/CartContext';
import toast from 'react-hot-toast';
import Image from 'next/image';

const CartCard = ({ productID, initialQuantity, name, price, imageUrl, userId, onRemove }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateCartItems } = useCart();
  

  //increases quantity of product on clicking the + button
  const handleIncrease = async () => {
    setIsUpdating(true);
    try {
      const result = await increaseQuantity(userId, productID);
      if (result && result.items) {
        updateCartItems(result.items);
        setQuantity(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error increasing quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  //decreases quantity of product on clicking the - button
  const handleDecrease = async () => {

    //decreases quantity only if quantity is greater than 1
    if (quantity > 1) {
      setIsUpdating(true);
      try {
        const result = await decreaseQuantity(userId, productID);
        if (result && result.items) {
          updateCartItems(result.items);
          setQuantity(prev => prev - 1);
        }
      } catch (error) {
        console.error('Error decreasing quantity:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };


  //removes product from cart entirely
  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      const result = await removeFromCart(userId, productID);
      if (result && result.items) {
        updateCartItems(result.items);
      }
      toast.success('Item removed from cart');
      onRemove(productID);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-white p-4 border rounded-lg shadow-md mb-4">
      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center">
        <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md">
          <Image
            src={imageUrl}
            alt={name}
            style={{ objectFit: 'contain' }}
            className="w-full h-full object-cover rounded-md"
            width={96}
            height={96}
          />
        </div>
        <div className="flex-1 md:ml-4">
          <p className="text-lg font-semibold mb-2">{name}</p>
          <p className="text-gray-700 mb-2">{`Price: $${price}`}</p>
        </div>
      </div>
      <div className="flex items-center mt-4 md:mt-0">
        <button
          onClick={handleDecrease}
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded-l-md hover:bg-red-400"
          disabled={isUpdating}
        >
          -
        </button>
        <span className="px-4 py-1 border-t border-b">{quantity}</span>
        <button
          onClick={handleIncrease}
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded-r-md hover:bg-green-400"
          disabled={isUpdating}
        >
          +
        </button>
      </div>
      <button
        onClick={handleRemove}
        className="bg-red-500 text-white px-4 py-2 rounded-lg ml-0 md:ml-4 mt-4 md:mt-0 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        disabled={isUpdating}
      >
        Remove
      </button>
    </div>
  );
};

export default CartCard;
