"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Checkout = () => {
  const router = useRouter();
  //redirects to home page after 3 seconds of component mounting 
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/'); 
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [router]);

  return (
  
      <h1 className="text-2xl font-extrabold text-red-800">Redirecting to Home Page...</h1>
    
  );
};

export default Checkout;
