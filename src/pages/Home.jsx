import HeroCarousel from "../components/HeroCarousel";
import ProductListing from "./ProductListing";

const Home = () => (
  <section className="bg-background">
    <div className="py-10 px-4 container mx-auto">
      <HeroCarousel />
      <h2 className="text-3xl font-semibold mt-10 mb-6 text-green-700">For You</h2>
      <ProductListing limit={8} showFilters={false} />
    </div>
  </section>
);

export default Home;