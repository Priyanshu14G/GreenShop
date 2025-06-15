import { useProducts } from "../hooks/useProducts";
import PackagingToggle from "../components/PackagingToggle";
import { useState } from "react";

const Cart = () => {
  // For demo: single hardcoded cart item.
  const { products } = useProducts();
  // Let’s put one mock item in the cart for demonstration:
  const cartItems = [products[0]];
  const [ecoPackaging, setEcoPackaging] = useState(true);

  if (!cartItems[0]) return <div className="p-20 text-center">Cart is empty.</div>;

  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div>
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center gap-6 mb-4 border p-4 rounded">
            <div className="flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <span className="font-medium">{item.name}</span>
            </div>
            <span className="font-bold text-lg">${item.price}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-8 gap-4">
        <span>Packaging:</span>
        <PackagingToggle value={ecoPackaging} onChange={setEcoPackaging} />
      </div>
      <button
        className="mt-8 bg-green-700 text-white rounded px-8 py-3 text-lg font-semibold hover:bg-green-800 hover-scale"
        aria-label="Proceed to checkout"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;