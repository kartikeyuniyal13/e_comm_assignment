import ToastProviders from "@/app/components/ToastProviders";
import "./globals.css";
import Header from "@/app/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/app/contexts/CartContext";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
        <CartProvider>
        <ToastProviders>
          <Header/>
          <main>
            {children}
          </main>
        </ToastProviders>
        </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
