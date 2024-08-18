"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/contexts/CartContext';
import calcDiscountFunction from '@/app/helper/discountFunction';
import toast from 'react-hot-toast';
import { clearCart } from '../helper/actions/cart.action';

const TotalCostCartCard = ({ userId }) => {
  const { cartItems, clearLocalCart } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');
  const router = useRouter();

  // Calculate total bill without discount
  const totalBill = useMemo(() => {
    return cartItems?.reduce((total, item) => {
      const price = parseFloat(item.price) || 15;
      const quantity = item.quantity || 0;

      if (isNaN(price)) {
        console.error(`Invalid price detected for item: ${item}`);
        return total;
      }

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  // Calculate discount and final total
  const { finalTotal, appliedDiscount } = useMemo(() => {
    const { error, discount: discountAmount } = calcDiscountFunction(discountCode, totalBill);

    if (error) {
      setDiscountError(error);
      return {
        finalTotal: totalBill.toFixed(2),
        appliedDiscount: 0
      };
    } else {
      setDiscountError('');
      const newFinalTotal = (totalBill - discountAmount).toFixed(2);
      return {
        finalTotal: newFinalTotal,
        appliedDiscount: discountAmount
      };
    }
  }, [discountCode, totalBill]);

  const handleCheckout = async () => {
    try {
      // Clear the cart in MongoDB and locally
      await clearCart(userId);
      clearLocalCart();

      // Show success toast and redirect to checkout page
      toast.success('Order Placed!!');
      setTimeout(() => {
        router.push('/checkout');
      }, 1000);
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Error placing order. Please try again later.');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-extrabold text-center">PRICE DETAILS</h2>
      <div className="flex justify-between">
        <p>Price ({cartItems.length} items)</p>
        <p>₹{totalBill.toFixed(2)}</p>
      </div>
      {appliedDiscount > 0 && (
        <div className="flex justify-between text-green-600">
          <p>Discount</p>
          <p>-₹{appliedDiscount.toFixed(2)}</p>
        </div>
      )}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Enter discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {discountError && (
          <p className="text-red-500 text-sm">{discountError}</p>
        )}
      </div>
      <div className="flex justify-between border-t pt-2">
        <p>Total Amount</p>
        <p>₹{finalTotal}</p>
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Checkout
      </button>
    </div>
  );
};

export default TotalCostCartCard;
