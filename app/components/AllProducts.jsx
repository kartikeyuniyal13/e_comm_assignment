"use client";
import Products from '@/app/data/products';
import ProductCard from './ProductCard';

const AllProducts = () => {
  return (
    <div className="bg-orange-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">Shopping Time</h1>
        {Products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Products.map((product) => (
              <ProductCard
                key={product.asin}
                product={{
                  id: product.asin,
                  name: product.product_title,
                  imageUrl: product.product_photo,
                  price: product.product_price
                }}
              />

            ))}

          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
