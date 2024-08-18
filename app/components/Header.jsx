"use client"
import React from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import { useCart } from '@/app/contexts/CartContext';
import CartIcon from './CartIcon';

const Header = () => {
  const { getTotalQuantity } = useCart();
  return (
    <div>
      <div className='flex bg-slate-400'>
        <div className='flex justify-between bg-orange-500 items-center w-full p-4'>
           <Link href="/">
          <h1 className='text-4xl font-extrabold'>MyShop</h1>
          </Link>
          {/* Search bar */}
          <input
            className='w-1/2 p-2 rounded-lg border border-gray-300 bg-orange-100'
            placeholder='Search for products'
          />
          {/* Cart icon */}
          <Link href="/cart">
            <span className='text-lg font-medium text-blue-600 cursor-pointer hover:underline'><CartIcon/></span>
          </Link>
          {/* User button if logged in */}
          <div className='flex items-center gap-4'>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: 'h-10 w-10'
                  },
                  variables: {
                    colorPrimary: '#ff7000'
                  }
                }}
              />
            </SignedIn>
            
            {/* Log in and Sign up buttons if not logged in */}
            <SignedOut>
              <Link href="/sign-in">
                <Button className="small-medium btn-secondary min-h-[41px] rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
              
              <Link href="/sign-up">
              <Button className="small-medium btn-secondary min-h-[41px] rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Sign Up</span>
                </Button>
              </Link>
            </SignedOut>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
