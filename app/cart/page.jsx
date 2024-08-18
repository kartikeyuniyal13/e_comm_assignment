import CartDetails from '@/app/components/CartDetails';

export default async function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Welcome to Your Cart
      </h1>
      <div className="bg-orange-100 rounded-lg shadow-md">
        <CartDetails />
      </div>
    </div>
  );
}
