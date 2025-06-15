import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

const categories = ["All", "Home", "Beauty", "Outdoors", "Food"];
const ecoGrades = ["All", "A", "B", "C"];

const ProductListing = ({ limit, showFilters = true }) => {
  const [cat, setCat] = useState("All");
  const [eco, setEco] = useState("All");
  const [group, setGroup] = useState("All");
  const [sort, setSort] = useState("price");
  const { products, loading } = useProducts({ category: cat, ecoGrade: eco, groupBuy: group, sort });

  if (loading) {
    return <div className="flex justify-center items-center p-20">Loading products…</div>;
  }

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <select
            className="border bg-white dark:bg-neutral-900 px-3 py-2 rounded"
            aria-label="Filter category"
            value={cat}
            onChange={e => setCat(e.target.value)}
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select
            className="border bg-white dark:bg-neutral-900 px-3 py-2 rounded"
            aria-label="Eco Grade"
            value={eco}
            onChange={e => setEco(e.target.value)}
          >
            {ecoGrades.map(e => <option key={e}>{e}</option>)}
          </select>
          <select
            className="border bg-white dark:bg-neutral-900 px-3 py-2 rounded"
            aria-label="Group Buy"
            value={group}
            onChange={e => setGroup(e.target.value)}
          >
            <option>All</option>
            <option>Eligible</option>
            <option>Not Eligible</option>
          </select>
          <select
            className="border bg-white dark:bg-neutral-900 px-3 py-2 rounded"
            aria-label="Sort"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="price">Sort by Price</option>
            <option value="ecoScore">Sort by Eco Score</option>
          </select>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {(limit ? products.slice(0, limit) : products).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;