import Checkout from '@/app/components/Checkout';

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-100 p-6">
      <h1 className="text-3xl font-extrabold text-green-800 mb-6">
        Order Placed
      </h1>
      <Checkout />
    </div>
  );
}
