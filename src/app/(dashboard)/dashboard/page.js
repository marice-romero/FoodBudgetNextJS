"use client";

import { getExpenses } from "@/app/actions/Expense";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Dashboard from "../../../components/Dashboard";

const DashboardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const spender = searchParams.get("spender");
  const type = searchParams.get("type");
  const search = searchParams.get("query");

  const [expenseList, setExpenseList] = useState([]);
  const [totals, setTotals] = useState({});
  const [timeRemaining, setTimeRemaining] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maxTotal, setMaxTotal] = useState(1200);
  const [amountRemaining, setAmountRemaining] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const startDate = "2024-08-11";
  const endDate = "2024-09-11";

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const result = await checkIsAuthenticated();
      if (!result) {
        router.push("/auth");
      } else {
        setIsAuthenticated(true);
      }
    };

    fetchAuthStatus();
  }, [router]);

  // Effect to calculate time remaining
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const currentDate = new Date();
      const end = new Date(endDate);

      // Calculate the difference in milliseconds
      const differenceInMilliseconds = end - currentDate;

      // Convert milliseconds to days
      const differenceInDays = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60 * 24)
      );

      // Calculate weeks and days
      const weeks = Math.floor(differenceInDays / 7);
      const days = differenceInDays % 7;

      setTimeRemaining({ weeks, days });
    };

    calculateTimeRemaining();
  }, [endDate]);

  // Effect to fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        const response = await getExpenses(
          startDate,
          endDate,
          spender,
          type,
          search
        );
        if (response.success) {
          const expenses = JSON.parse(response.stringExpenses);
          setExpenseList(expenses);
          setTotals(response.totals);
          setMaxTotal(response.maxTotal);
          setAmountRemaining(response.amountRemaining);
        } else {
          toast.error(
            "There was an error loading, please reload and try again."
          );
          console.error("error loading");
        }
      } catch (error) {
        console.error("Error fetching expenses: ", error);
        toast.error("There was an error loading, please reload and try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, [searchParams]);

  return (
    <div className="text-center">
      {isLoading || !maxTotal || !totals.totalAmount ? (
        <div>Loading...</div>
      ) : (
        <Dashboard
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          setTotals={setTotals}
          totals={totals}
          timeRemaining={timeRemaining}
          maxTotal={maxTotal}
          amountRemaining={amountRemaining}
          setAmountRemaining={setAmountRemaining}
        />
      )}
    </div>
  );
};

export default DashboardPage;
