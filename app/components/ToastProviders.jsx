"use client"
import React from 'react'
import { Toaster } from 'react-hot-toast'

// This component is used to provide animated notifications to the entire app on actions like adding to cart, removing from cart, etc.
const ToastProviders = ({ children }) => {
  return (
    <>
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#d1fae5', 
            color: '#16a34a', 
            padding: '16px 24px',
            fontSize: '18px', 
            borderRadius: '10px', 
          },
        }}
      />
      {children}
    </>
  )
}

export default ToastProviders
