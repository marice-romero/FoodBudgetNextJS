"use client";

import Search from "./Search";
import { useContext } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatDateToYYYYMMDD } from "../utils/formatDate";
import { dateRanges } from "@/utils/dateRanges";
import { StoreContext } from "@/store";

const Navbar = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { selectedDateRange } = state;

  const router = useRouter();
  const pathname = usePathname();

  const handleMenuChange = (e) => {
    dispatch({
      type: "SELECTED_DATE_RANGE",
      payload: e.target.value,
    });
  };

  return (
    <div className="flex justify-between drop-shadow-xl p-2 rounded-lg bg-emerald-200 items-center">
      <div className="w-56">
        <img
          src="/bb.jpeg"
          className="h-10 w-10 rounded-full inline-block mr-2 border-amber-300 border-4"
        />
        <span className="text-lg bg-gray-50 p-2 rounded-lg shadow-inner">
          b&b save money
        </span>
      </div>
      <div className="flex-1 flex justify-center text-lg">
        <select
          className="p-2 rounded-lg w-52 text-center shadow-inner"
          value={selectedDateRange}
          onChange={handleMenuChange}
        >
          {dateRanges.map((range, index) => (
            <option key={index} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>
      <Search />
    </div>
  );
};

export default Navbar;

// useEffect(() => {
//   const today = new Date();
//   const formattedToday = `${
//     today.getMonth() + 1
//   }/${today.getDate()}/${today.getFullYear()}`;
//   const currentRange = dateRanges.find((range) => {
//     const [start, end] = range.split(" - ");
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     return today >= startDate && today <= endDate;
//   });

//   if (currentRange) {
//     setSelectedDateRange(currentRange);
//   } else {
//     const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
//     const newRange = `${formattedToday} - ${
//       nextMonth.getMonth() + 1
//     }/${nextMonth.getDate()}/${nextMonth.getFullYear()}`;
//     setDateRanges([...dateRanges, newRange]);
//     setSelectedDateRange(newRange);
//   }
// }, [dateRanges]);

// useEffect(() => {
//   if (selectedDateRange) {
//     const [startDate, endDate] = selectedDateRange.split(" - ");
//     const params = new URLSearchParams();
//     params.set("startDate", formatDateToYYYYMMDD(startDate));
//     params.set("endDate", formatDateToYYYYMMDD(endDate));
//     router.push(`${pathname}?${params.toString()}`, undefined, {
//       shallow: true,
//     });
//   }
// }, [selectedDateRange, router]);
