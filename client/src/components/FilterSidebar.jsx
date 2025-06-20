import React from "react";
import { FiFilter, FiX, FiChevronDown, FiSearch, FiDollarSign } from "react-icons/fi";

export default function FilterSidebar({ products, setFilteredProducts, onClose, isMobile }) {
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setFilteredProducts(
      selected === "all"
        ? products
        : products.filter((p) => p.category?.toLowerCase() === selected.toLowerCase())
    );
  };

  const handlePriceChange = (e) => {
    const price = parseFloat(e.target.value);
    setFilteredProducts(
      products.filter((p) => parseFloat(parseInt(p.code) % 50 + 5.99) < price)
    );
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value.toLowerCase();
    setFilteredProducts(
      products.filter((p) => p.brand?.toLowerCase().includes(brand))
    );
  };

  const handleClearFilters = () => {
    setFilteredProducts(products);
    // You might want to reset the input fields here as well
  };

  return (
    <aside className={`bg-white/90 dark:bg-gray-900/95 backdrop-blur-2xl rounded-2xl border border-white/30 dark:border-gray-800/70 p-6 h-fit shadow-2xl ${isMobile ? 'fixed inset-0 z-50 overflow-y-auto' : 'sticky top-24'}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FiFilter className="text-indigo-600 dark:text-indigo-400 text-xl" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Filters</h2>
        </div>
        {isMobile && (
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiX className="text-gray-500 dark:text-gray-400 text-xl" />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <div className="relative">
            <select
              onChange={handleCategoryChange}
              className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-600 transition-all"
            >
              <option value="all">All Categories</option>
              <option value="Beauty">Beauty</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Food">Food</option>
              <option value="Home">Home</option>
            </select>
            <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Maximum Price
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-gray-400" />
            </div>
            <input
              type="number"
              placeholder="1000"
              onChange={handlePriceChange}
              className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-600 transition-all"
            />
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Brand
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search brand..."
              onChange={handleBrandChange}
              className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-600 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Clear all
        </button>
        <button
          onClick={isMobile ? onClose : null}
          className="px-6 py-2 bg-green-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}