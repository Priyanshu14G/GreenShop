import { Link } from "react-router-dom";
import { Package, Check, ArrowUp } from "lucide-react";

const ProductCard = ({ product }) => (
  <div className="border rounded-lg bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition hover-scale flex flex-col relative">
    <Link to={`/products/${product.id}`} aria-label={"View details for " + product.name}>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-44 object-cover rounded-t"
        loading="lazy"
      />
      <div className="px-4 py-3 flex flex-col gap-1">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <div className="flex gap-2 items-center text-green-700 font-medium">
          <Check size={16} className="inline" aria-hidden /> Eco Grade {product.ecoGrade}
        </div>
        <div className="text-gray-600 dark:text-gray-300">{product.category}</div>
        <div className="font-bold text-xl mt-2">${product.price.toFixed(2)}</div>
        {product.groupBuyEligible && (
          <span className="absolute top-4 right-4 inline-flex items-center bg-green-200 rounded px-2 py-0.5 text-xs font-bold text-green-900">
            <ArrowUp size={14} className="mr-1" /> Group Buy
          </span>
        )}
      </div>
    </Link>
  </div>
);

export default ProductCard;