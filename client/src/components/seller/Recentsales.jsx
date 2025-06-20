import React, { useState, useEffect } from 'react';

/**
 * RecentSales component displays the 5 most recent orders
 * @param {Object} props - Component props
 * @param {Array} [props.sales] - Optional pre-fetched sales data to avoid extra API call
 * @param {Function} [props.fetchSales] - Optional function to fetch sales data (defaults to SellerDatabaseService.getRecentSales)
 */
const RecentSales = ({ 
  sales, 
  fetchSales = async () => {
    // Mock data if SellerDatabaseService is not available
    return [
      { id: 1, customer_name: "John Doe", total: 125.50, status: "completed" },
      { id: 2, customer_name: "Jane Smith", total: 89.99, status: "pending" },
      { id: 3, customer_name: "Robert Johnson", total: 234.00, status: "completed" },
      { id: 4, customer_name: "Emily Davis", total: 156.75, status: "completed" },
      { id: 5, customer_name: "Michael Wilson", total: 199.99, status: "shipped" }
    ];
  }
}) => {
  const [data, setData] = useState(sales || null);
  const [loading, setLoading] = useState(!sales);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sales) {
      const fetchRecentSales = async () => {
        try {
          setLoading(true);
          const recentSales = await fetchSales();
          setData(recentSales);
        } catch (err) {
          setError(err);
          console.error("Failed to fetch recent sales:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchRecentSales();
    }
  }, [sales, fetchSales]);

  if (loading) {
    return (
      <div className="recent-sales col-span-3 p-4 border rounded-lg">
        <div className="border-b pb-2 mb-4">
          <h3 className="font-semibold">Recent Sales</h3>
        </div>
        <div className="text-center py-4">Loading sales data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-sales col-span-3 p-4 border rounded-lg">
        <div className="border-b pb-2 mb-4">
          <h3 className="font-semibold">Recent Sales</h3>
        </div>
        <div className="text-center py-4 text-red-500">
          Error loading sales data
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="recent-sales col-span-3 p-4 border rounded-lg">
        <div className="border-b pb-2 mb-4">
          <h3 className="font-semibold">Recent Sales</h3>
        </div>
        <div className="text-center py-4">No recent sales found</div>
      </div>
    );
  }

  return (
    <div className="recent-sales col-span-3 p-4 border rounded-lg">
      <div className="border-b pb-2 mb-4">
        <h3 className="font-semibold">Recent Sales</h3>
      </div>
      <div className="space-y-4">
        {data.map((sale) => (
          <div key={sale.id} className="flex items-center justify-between">
            <div className="text-sm">
              <p className="font-medium">{sale.customer_name}</p>
              <p className="text-gray-500">${sale.total.toFixed(2)}</p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              sale.status === "completed" 
                ? "bg-green-100 text-green-800" 
                : "bg-gray-100 text-gray-800"
            }`}>
              {sale.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSales;