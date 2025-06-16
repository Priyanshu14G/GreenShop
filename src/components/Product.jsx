import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [filters, setFilters] = useState({
  //   category: "",
  //   ecoGrade: "",
  //   priceRange: "",
  // });

  // useEffect(() => {
  //   fetchProducts();
  // }, [filters]);

  // const fetchProducts = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await getFilteredProducts(filters); 
  //     setProducts(data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {products.map((p) => (
    <ProductCard key={p.code || p.id || p.barcode} product={p} />
  ))}
</div>

  );
}
