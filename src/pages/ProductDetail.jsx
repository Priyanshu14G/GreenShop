import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import GroupBuyWidget from "../components/GroupBuyWidget";

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById, loading } = useProducts();
  const product = getProductById(id);

  if (loading || !product) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading…</div>;
  }

  return (
    <div className="container py-12 flex flex-col md:flex-row gap-12">
      <img
        src={product.image}
        alt={product.name}
        className="rounded-lg w-full max-w-md mx-auto md:mx-0"
        style={{ objectFit: "cover", maxHeight: 420 }}
      />
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="text-green-700 font-semibold flex items-center gap-2">
          Eco Grade: <span aria-label={"Eco Grade " + product.ecoGrade}>{product.ecoGrade}</span>
        </div>
        <div className="text-muted-foreground">{product.category}</div>
        <div className="text-xl font-bold mt-2">${product.price.toFixed(2)}</div>
        <p className="text-base">{product.description}</p>
        <GroupBuyWidget product={product} />
        <button className="mt-8 bg-green-600 hover:bg-green-700 text-white rounded py-2 px-6 font-bold transition hover-scale shadow"
          aria-label="Add to cart"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
