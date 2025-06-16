import React from "react";

export default function EcoGradeBadge({ grade }) {
  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "A":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "B+":
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      case "B":
        return "bg-orange-500 hover:bg-orange-600 text-white";
      case "C":
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${getGradeColor(
        grade
      )}`}
    >
      Eco {grade}
    </span>
  );
}
