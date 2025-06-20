import React from 'react';
import { Leaf, Factory, Truck, Package, Award } from "lucide-react";

/**
 * EcoScoreVisualization component displays sustainability metrics breakdown
 * @param {Object} props - Component props
 * @param {Object} props.breakdown - Score breakdown object
 * @param {number} props.breakdown.materials - Materials impact score
 * @param {number} props.breakdown.manufacturing - Manufacturing energy score
 * @param {number} props.breakdown.shipping - Shipping distance score
 * @param {number} props.breakdown.packaging - Packaging type score
 * @param {number} props.breakdown.certifications - Certification strength score
 */
const EcoScoreVisualization = ({ breakdown }) => {
  const metrics = [
    {
      name: "Materials Impact",
      score: breakdown.materials,
      icon: Leaf,
      color: "text-green-600 dark:text-green-400",
      description: "Sustainability of raw materials used",
    },
    {
      name: "Manufacturing Energy",
      score: breakdown.manufacturing,
      icon: Factory,
      color: "text-blue-600 dark:text-blue-400",
      description: "Energy efficiency in production process",
    },
    {
      name: "Shipping Distance",
      score: breakdown.shipping,
      icon: Truck,
      color: "text-orange-600 dark:text-orange-400",
      description: "Carbon footprint from transportation",
    },
    {
      name: "Packaging Type",
      score: breakdown.packaging,
      icon: Package,
      color: "text-purple-600 dark:text-purple-400",
      description: "Environmental impact of packaging materials",
    },
    {
      name: "Certification Strength",
      score: breakdown.certifications,
      icon: Award,
      color: "text-yellow-600 dark:text-yellow-400",
      description: "Third-party sustainability certifications",
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-lime-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B+";
    if (score >= 60) return "B";
    if (score >= 50) return "C+";
    if (score >= 40) return "C";
    return "D";
  };

  // Custom Progress Bar component
  const Progress = ({ value, className }) => {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className}`}>
        <div
          className={`h-full rounded-full ${getScoreColor(value)}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  };

  // Custom Badge component
  const Badge = ({ children, className }) => {
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${className}`}>
        {children}
      </span>
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="border-b p-6 border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sustainability Metrics Breakdown</h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  <span className="font-medium text-gray-900 dark:text-gray-100">{metric.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`text-white ${getScoreColor(metric.score)}`}>
                    {getScoreGrade(metric.score)}
                  </Badge>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{metric.score}/100</span>
                </div>
              </div>
              <Progress value={metric.score} className="h-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Overall Score Summary */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Score Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Strongest Area:</span>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {metrics.reduce((prev, current) => (prev.score > current.score ? prev : current)).name}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Improvement Area:</span>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {metrics.reduce((prev, current) => (prev.score < current.score ? prev : current)).name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoScoreVisualization;