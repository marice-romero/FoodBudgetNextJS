"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PercentageCircle = ({ groceryAmount, diningAmount }) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const [gapSize, setGapSize] = useState(4);

  const radius = 115.2; // Radius used for the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  const total = groceryAmount + diningAmount;

  useEffect(() => {
    if (groceryAmount === 0 || diningAmount === 0) setGapSize(0);
  }, [groceryAmount, diningAmount]);

  const groceryProgress = (groceryAmount / total) * circumference - gapSize;
  const diningProgress = (diningAmount / total) * circumference - gapSize;

  let groceryColor = "text-emerald-300";
  let diningColor = "text-amber-300";

  return (
    <div className="mx-auto relative w-72 h-72 flex items-center justify-center mb-4">
      <div className="absolute w-full h-full drop-shadow-xl">
        <svg className="w-full h-full transform rotate-90">
          {/* Full Circle Background */}
          <circle
            className="text-emerald-100"
            cx="50%"
            cy="50%"
            r="48%"
            strokeWidth="12"
            stroke="currentColor"
            fill="none"
          />
          <circle
            className="text-emerald-50"
            cx="50%"
            cy="50%"
            r="40%"
            strokeWidth="40"
            stroke="currentColor"
            fill="none"
          />
          {/* Grocery Amount Circle */}
          <circle
            className="text-emerald-300"
            cx="50%"
            cy="50%"
            r="40%"
            strokeWidth="40"
            strokeDasharray={`${groceryProgress} ${circumference}`}
            strokeDashoffset="0"
            strokeLinecap="butt" // Keeps the ends sharp for a clearer gap
            stroke="currentColor"
            fill="none"
          />
          {/* Dining Amount Circle */}
          <circle
            className="text-amber-300"
            cx="50%"
            cy="50%"
            r="40%"
            strokeWidth="40"
            strokeDasharray={`${diningProgress} ${circumference}`}
            strokeDashoffset={`-${groceryProgress + gapSize}`}
            strokeLinecap="butt" // Keeps the ends sharp for a clearer gap
            stroke="currentColor"
            fill="none"
          />
        </svg>
      </div>
      <div className="text-center z-10 text-xl bg-gray-50 rounded-full px-8 py-12 shadow-lg">
        <p className="bg-emerald-300 rounded-lg px-2 py-1 shadow-lg">
          {type === "Dining"
            ? "Grocery: N/A"
            : `Grocery: ${
                total === 0 ? 0 : Math.round((groceryAmount / total) * 100)
              }%`}
        </p>
        <p className="bg-amber-300 rounded-lg px-2 py-1 shadow-lg mt-2">
          {type === "Grocery"
            ? "Dining: N/A"
            : `Dining: ${
                total === 0 ? 0 : Math.round((diningAmount / total) * 100)
              }%`}
        </p>
      </div>
    </div>
  );
};

export default PercentageCircle;
