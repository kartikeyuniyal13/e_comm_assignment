"use client";
import React from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { getCart, createCart, updateCart } from '@/app/helper/actions/cart.action';
import { useCart } from '@/app/contexts/CartContext';

const ProductCard = ({ product }) => {
  const [isDisabled, setIsDisabled] = React.useState(false);
  const { userId } = useAuth();
  const { updateCartItems } = useCart();

  const handleAddToCart = async () => {
    setIsDisabled(true);

    
    if (!userId) {
      toast.error('Please sign in to add items to cart.');
      return;
    }
    try {
      const cart = await getCart(userId);
      const sanitizedCart = cart ? JSON.parse(JSON.stringify(cart)) : null;

      const newItem = {
        productID: product.id, 
        quantity: 1,
        ...product,
      };

      if (!sanitizedCart) {
        const newCart = {
          userId,
          items: [newItem], 
        };
        await createCart(newCart);
        // Update local cartContext
        updateCartItems(newCart.items); 
      } else {
        /*
        check if the item is already in the cart and increase the quantity if it is, otherwise add the item to the cart
         */
        const existingItem = sanitizedCart.items.find((item) => item.productID === product.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          sanitizedCart.items.push(newItem); 
        }
        await updateCart(userId, sanitizedCart.items);
        updateCartItems(sanitizedCart.items);
      }
      toast.success('Added to Cart!');
      setTimeout(() => {
        setIsDisabled(false); 
      }, 2000);

    } catch (error) {
      console.error("Error adding item to cart:", error);
      setIsDisabled(false);
    }
  };

  return (
    <div className="border rounded-lg bg-white shadow-md transition-shadow duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-slate-200">
      <div className="relative w-full h-48 border border-gray-300">
      <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 truncate text-black">{product.name}</h2>
        <p className="text-gray-700 text-lg mb-4">${product.price}</p>
        <div className="text-center">
          <button
            onClick={handleAddToCart}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              isDisabled
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
