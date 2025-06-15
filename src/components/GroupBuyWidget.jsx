import { useEffect, useState } from "react";
import { Bar } from "recharts";
import { Package } from "lucide-react";

const GroupBuyWidget = ({ product }) => {
  const [current, setCurrent] = useState(product.groupCount || 3);
  const [isJoining, setIsJoining] = useState(false);

  // Simulate real-time join
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => prev + Math.round(Math.random() * 0.5)); // slow increase
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const percent = Math.min(100, (current / product.groupThreshold) * 100);

  const handleJoin = async () => {
    setIsJoining(true);
    setTimeout(() => {
      setCurrent(c => c + 1);
      setIsJoining(false);
    }, 900);
    // Here would POST to /api/group-buy/join
  };

  return (
    <div
      className="border bg-green-100 dark:bg-neutral-800 rounded-lg p-4 mt-2 flex flex-col gap-2 w-full max-w-md"
      role="region"
      aria-label="Group Buy Progress"
    >
      <div className="flex items-center gap-2 font-semibold text-green-800">
        <Package size={20} aria-hidden />
        Join Group Buy
      </div>
      <div className="flex gap-1 text-neutral-900 font-medium">
        {current}
        <span className="mx-1">/</span>
        {product.groupThreshold} participants
      </div>
      <div className="relative h-3 bg-green-200 rounded-full my-1" aria-valuenow={percent} aria-valuemax={100}>
        <div className="absolute left-0 top-0 h-3 bg-green-600 rounded-full transition-all" style={{ width: `${percent}%` }}></div>
      </div>
      <button
        className={`mt-2 py-2 px-4 rounded font-bold text-white bg-green-700 hover:bg-green-800 transition
          ${isJoining ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleJoin}
        disabled={isJoining}
        aria-label="Join this group buy"
      >
        {isJoining ? "Joining..." : "Join Group Buy"}
      </button>
    </div>
  );
};

export default GroupBuyWidget;