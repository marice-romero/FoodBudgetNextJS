"use client";

import { useSearchParams } from "next/navigation";

const ProgressCircle = ({ title, total, maxTotal }) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  console.log("total: ", total);
  console.log("max total: ", maxTotal);

  const radius = 115.2; // The radius used for the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Calculate the strokeDashoffset based on the total relative to maxTotal
  const progress = total / maxTotal;
  const strokeDashoffset = circumference * (1 - progress);

  console.log("strokeDA: ", strokeDashoffset);

  return (
    <div className="mx-auto relative w-72 h-72 flex items-center justify-center mb-4">
      <div className="absolute w-full h-full drop-shadow-xl">
        <svg className="w-full h-full transform rotate-90">
          {/* Outer Circle */}
          <circle
            className="text-emerald-100"
            cx="50%"
            cy="50%"
            r="48%"
            strokeWidth="12"
            stroke="currentColor"
            fill="none"
          />
          {/* Background Circle */}
          <circle
            className="text-emerald-200"
            cx="50%"
            cy="50%"
            r="40%"
            strokeWidth="40"
            stroke="currentColor"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            className="text-emerald-400"
            cx="50%"
            cy="50%"
            r="40%"
            strokeWidth="40"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
          />
        </svg>
      </div>
      <div className="text-center z-10 bg-gray-50 rounded-full px-6 py-12 shadow-lg w-44">
        <p className="text-gray-500">{title}</p>
        <p className="text-5xl font-bold">
          $
          {title !== "Amount Remaining"
            ? total.toFixed(2)
            : type
            ? "N/A"
            : total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProgressCircle;
