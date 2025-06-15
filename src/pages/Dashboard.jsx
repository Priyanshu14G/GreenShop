import { useDashboard } from "../hooks/useDashboard";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const tabs = [
  { label: "Eco Products", key: "eco" },
  { label: "Group Buys", key: "group" },
  { label: "Recommendations", key: "rec" },
  { label: "Order History", key: "order" },
];

const Dashboard = () => {
  const [tab, setTab] = useState("eco");
  const { dashboard, loading } = useDashboard();

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading Dashboard…</div>;

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex gap-4 mb-8 border-b pb-2">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`px-3 py-1.5 font-medium rounded-t transition border-b-2 ${tab === t.key ? "border-green-700 text-green-700 bg-green-100 dark:bg-neutral-800" : "border-transparent text-gray-600 dark:text-gray-300"}`}
            onClick={() => setTab(t.key)}
            aria-current={tab === t.key ? "page" : undefined}
          >
            {t.label}
          </button>
        ))}
      </div>

      <section role="tabpanel" className="">
        {tab === "eco" && (
          <div>
            <h2 className="font-semibold text-lg mb-3">Your Eco Products</h2>
            <ul className="grid grid-cols-2 gap-4 mb-8">
              {dashboard.products.map(p => (
                <li key={p.id} className="border rounded p-3 bg-white dark:bg-neutral-900">{p.name}</li>
              ))}
            </ul>
          </div>
        )}

        {tab === "group" && (
          <div>
            <h2 className="font-semibold text-lg mb-3">Your Group Buys</h2>
            <ul className="grid grid-cols-2 gap-4 mb-8">
              {dashboard.groupBuys.map(g => <li key={g.id} className="border rounded p-3 bg-white dark:bg-neutral-900">{g.name}</li>)}
            </ul>
          </div>
        )}

        {tab === "rec" && (
          <div>
            <h2 className="font-semibold text-lg mb-3">Recommendations</h2>
            <ul className="grid grid-cols-2 gap-4 mb-8">
              {dashboard.recommendations.map(r => <li key={r.id} className="border rounded p-3 bg-white dark:bg-neutral-900">{r.name}</li>)}
            </ul>
          </div>
        )}

        {tab === "order" && (
          <div>
            <h2 className="font-semibold text-lg mb-3">Order History</h2>
            <ul className="grid grid-cols-2 gap-4 mb-8">
              {dashboard.orders.map(o => <li key={o.id} className="border rounded p-3 bg-white dark:bg-neutral-900">{o.name}</li>)}
            </ul>
          </div>
        )}

        <div className="mt-10">
          <h2 className="font-semibold text-lg mb-4">Your Eco Impact</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dashboard.impact}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="CO2Saved" fill="#15803d" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-7 mt-5">
            <div>
              <span className="font-bold text-green-700 text-2xl">{dashboard.totalCO2}</span>
              <span className="ml-1 text-gray-600 dark:text-gray-300">kg CO₂ saved</span>
            </div>
            <div>
              <span className="font-bold text-green-700 text-2xl">{dashboard.materials}</span>
              <span className="ml-1 text-gray-600 dark:text-gray-300">Materials saved</span>
            </div>
            <div>
              <span className="font-bold text-green-700 text-2xl">{dashboard.badges}</span>
              <span className="ml-1 text-gray-600 dark:text-gray-300">Badges earned</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;