"use client"
import React, { useEffect, useState } from 'react';
import { getCartItems } from '@/app/helper/actions/cart.action'; 
import { useAuth } from '@clerk/nextjs';
import CartCard from './CartCard';
import TotalCostCartCard from './TotalCostCartCard';

const CartDetails = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();
 
  //gets cart items from the database and sets the state
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (userId) {
          const data = await getCartItems(userId);
          setCartItems(data.items || []);
        }
      } catch (error) {
        console.error("Error fetching cart details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartData();
  }, [userId]);
  
  /*removes item from cart when remove button is clicked in cart card */
  const handleRemoveItem = (productID) => {
    setCartItems((prevItems) => prevItems.filter(item => item.productID !== productID));
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (cartItems.length === 0) return <p className="text-center text-gray-600">Your cart is empty.</p>;

  return (
    <div className="container mx-auto px-4 py-6 md:flex md:space-x-8">
      <div className="md:w-2/3 space-y-4">
        {cartItems.map((item) => (
          <CartCard
            key={item.productID}
            productID={item.productID}
            initialQuantity={item.quantity}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.price}
            onRemove={handleRemoveItem} /*passing the function to remove item from cart*/
            userId={userId} 
          />
        ))}
      </div>
      <div className="md:w-1/3 mt-6 md:mt-0">
        <TotalCostCartCard  userId={userId}/>
      </div>
    </div>
  );
};

export default CartDetails;
