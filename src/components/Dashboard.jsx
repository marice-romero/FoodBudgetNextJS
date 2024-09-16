"use client";

import { useContext, useEffect, useState } from "react";
import FilterToggle from "./FilterToggle";
import FilterByType from "./FilterByType";
import ProgressCircle from "./ProgressCircle";
import Table from "./Table";
import PercentageCircle from "./PercentageCircle";
import { StoreContext } from "@/store";

const Dashboard = ({
  expenseList,
  setExpenseList,
  setTotals,
  totals,
  timeRemaining,
  maxTotal,
  amountRemaining,
  setAmountRemaining,
}) => {
  // first box
  // amount remaining
  // amount spent
  // grocery/dining out breakdown

  const globalState = useContext(StoreContext);

  useEffect(() => {
    setAmountRemaining(maxTotal - totals.totalAmount);
  }, [totals.totalAmount]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 py-8 bg-gradient-to-b from-emerald-50 to-emerald-500 rounded-xl shadow-xl">
        <div className=" p-2 w-3/4 rounded-full bg-emerald-50 shadow-xl mx-auto">
          <FilterToggle options={["Dem", "Joint", "Marice"]} />
          {maxTotal !== undefined && maxTotal !== null && (
            <ProgressCircle
              title={"Amount Spent"}
              total={totals.totalAmount}
              maxTotal={maxTotal}
            />
          )}
        </div>
        <div className=" p-2 w-3/4 rounded-full bg-emerald-50 shadow-xl mx-auto">
          {timeRemaining.weeks >= 0 && timeRemaining.days >= 0 ? (
            <h2 className="text-2xl text-center italic bg-amber-300 w-11/12 shadow-lg p-4 rounded-full mx-auto my-4">
              {timeRemaining.weeks}{" "}
              {timeRemaining.weeks === 1 ? "week" : "weeks"} and{" "}
              {timeRemaining.days} {timeRemaining.days === 1 ? "day" : "days"}{" "}
              remaining
            </h2>
          ) : (
            <h2 className="text-2xl text-center italic bg-amber-300 w-11/12 shadow-lg p-4 rounded-full mx-auto my-4">
              {globalState.state.selectedDateRange}
            </h2>
          )}

          {maxTotal !== undefined && maxTotal !== null && (
            <ProgressCircle
              title={"Amount Remaining"}
              total={amountRemaining}
              maxTotal={maxTotal}
            />
          )}
        </div>

        <div className=" p-2 w-3/4 rounded-full bg-emerald-50 shadow-xl mx-auto">
          <FilterToggle options={["Grocery", "All", "Dining"]} />
          <PercentageCircle
            groceryAmount={totals.groceryAmount}
            diningAmount={totals.diningAmount}
          />
        </div>
      </div>
      <div className="bg-gray-50 pt-2 rounded-lg shadow-xl">
        <Table
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          totals={totals}
          setTotals={setTotals}
          amountRemaining={amountRemaining}
          setAmountRemaining={setAmountRemaining}
        />
      </div>
    </div>
  );
};
export default Dashboard;
