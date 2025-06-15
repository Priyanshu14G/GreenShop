import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  {
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=700&q=80",
    alt: "Shop eco products",
    headline: "Eco Products, For You",
    sub: "Shop with impact: AI-powered picks tailored for eco-conscious shoppers.",
  },
  {
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=700&q=80",
    alt: "Eco group buy",
    headline: "Join Group Buys",
    sub: "Save more, together. Unlock deals by joining eco group-buy campaigns.",
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=700&q=80",
    alt: "Reduce carbon footprint",
    headline: "Track Your Impact",
    sub: "See CO₂ saved, materials spared, badges earned. Make progress visible.",
  }
];

const HeroCarousel = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setIdx((c) => (c + 1) % items.length), 4500);
    return () => clearTimeout(t);
  }, [idx]);

  const prev = () => setIdx((idx - 1 + items.length) % items.length);
  const next = () => setIdx((idx + 1) % items.length);

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row bg-white dark:bg-neutral-900 min-h-[320px]">
      <img
        src={items[idx].image}
        alt={items[idx].alt}
        className="object-cover w-full md:w-2/5 h-60 md:h-auto"
      />
      <div className="flex-1 p-7 flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold text-green-700 mb-2">{items[idx].headline}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">{items[idx].sub}</p>
      </div>
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-100 dark:bg-neutral-800 p-2 rounded-full shadow hover-scale"
        onClick={prev}
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 dark:bg-neutral-800 p-2 rounded-full shadow hover-scale"
        onClick={next}
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default HeroCarousel;