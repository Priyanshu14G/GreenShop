import PackagingToggle from "../components/PackagingToggle";
import { useState } from "react";

const Checkout = () => {
  const [packaging, setPackaging] = useState(true);

  return (
    <div className="container mx-auto py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form className="bg-white dark:bg-neutral-950 rounded-lg p-8 shadow" aria-label="Checkout form">
        <div className="mb-5">
          <label htmlFor="name" className="block font-medium mb-2">
            Name
          </label>
          <input id="name" autoComplete="name" required className="border px-4 py-2 rounded w-full" />
        </div>
        <div className="mb-5">
          <label htmlFor="address" className="block font-medium mb-2">
            Address
          </label>
          <input id="address" autoComplete="street-address" required className="border px-4 py-2 rounded w-full" />
        </div>
        <div className="mb-5 flex items-center gap-4">
          <span>Eco Packaging:</span>
          <PackagingToggle value={packaging} onChange={setPackaging} />
        </div>
        <div className="mb-5">
          <h2 className="font-medium text-lg mb-1">Order Summary</h2>
          <div className="flex justify-between"><span>Subtotal</span><span>$23.99</span></div>
          <div className="flex justify-between"><span>Eco Discount</span><span className="text-green-700">- $2.00</span></div>
          <div className="flex justify-between font-bold"><span>Total</span><span>$21.99</span></div>
        </div>
        <div className="mb-5">
          <span className="block mb-2 font-medium">Estimated CO₂ saved:</span>
          <span className="text-green-700 font-bold">1.25 kg</span>
        </div>
        <button
          className="w-full py-3 bg-green-700 text-white rounded font-bold hover:bg-green-800 hover-scale transition"
          aria-label="Place order"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
