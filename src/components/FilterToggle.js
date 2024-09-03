"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const FilterToggle = ({ options }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const spender = searchParams.get("spender");
  const type = searchParams.get("type");

  const handleFilterClick = (option) => {
    if (option === "Joint" || option === "All") {
      const dateParams = new URLSearchParams();
      dateParams.set("startDate", startDate);
      dateParams.set("endDate", endDate);
      router.push(`${pathname}?${dateParams}`);
    } else {
      const queryParams = new URLSearchParams(searchParams.toString());
      option === "Marice" || option === "Dem"
        ? queryParams.set("spender", option)
        : queryParams.set("type", option);
      router.push(`${pathname}?${queryParams.toString()}`);
    }
  };

  const getButtonClassName = (option) => {
    const isActive = option === spender || option === type;
    const isDefault =
      !type && !spender && (option === "Joint" || option === "All");

    return isActive || isDefault
      ? "rounded-lg px-4 py-2 bg-emerald-100"
      : "rounded-lg px-4 py-2 hover:bg-emerald-200";
  };
  return (
    <div className="rounded-full flex gap-1 border border-gray-200 w-3/4 place-content-evenly p-2 my-4 mx-auto shadow-inner bg-gray-50 text-xl">
      {options.map((option) => {
        return (
          <button
            key={option}
            onClick={() => handleFilterClick(option)}
            className={getButtonClassName(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
export default FilterToggle;
