"use server";

import dbConnect from "../../lib/dbConnect";
import Expense from "../../lib/models/Expense";

export const getExpenses = async (
  startDate,
  endDate,
  spender,
  type,
  search
) => {
  try {
    await dbConnect();

    const searchTerm = search || "";
    let maxTotal = 1200;

    const queryObject = {
      dateSpent: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };

    if (spender) {
      queryObject.spender = spender;
      maxTotal = 600;
    }
    if (type) queryObject.type = type;

    let results = Expense.find({
      $and: [
        queryObject,
        {
          $or: [
            { location: { $regex: searchTerm, $options: "i" } },
            { type: { $regex: searchTerm, $options: "i" } },
            { spender: { $regex: searchTerm, $options: "i" } },
          ],
        },
      ],
    });

    const expenses = await results.sort({ dateSpent: "asc" });

    // Aggregation to calculate the sums
    const aggregates = await Expense.aggregate([
      {
        $match: {
          $and: [
            queryObject,
            {
              $or: [
                { location: { $regex: searchTerm, $options: "i" } },
                { type: { $regex: searchTerm, $options: "i" } },
                { spender: { $regex: searchTerm, $options: "i" } },
              ],
            },
          ],
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          groceryAmount: {
            $sum: { $cond: [{ $eq: ["$type", "Grocery"] }, "$amount", 0] },
          },
          diningAmount: {
            $sum: { $cond: [{ $eq: ["$type", "Dining"] }, "$amount", 0] },
          },
          demAmount: {
            $sum: { $cond: [{ $eq: ["$spender", "Dem"] }, "$amount", 0] },
          },
          mariceAmount: {
            $sum: { $cond: [{ $eq: ["$spender", "Marice"] }, "$amount", 0] },
          },
        },
      },
    ]);

    const stringExpenses = JSON.stringify(expenses);
    const totals = aggregates[0] || {
      totalAmount: 0,
      groceryAmount: 0,
      diningAmount: 0,
      demAmount: 0,
      mariceAmount: 0,
    }; // Fallback if no data is found

    if (type) maxTotal = totals.totalAmount;

    const amountRemaining = maxTotal - totals.totalAmount;

    return {
      success: true,
      stringExpenses,
      totals,
      maxTotal,
      amountRemaining,
    };
  } catch (error) {
    console.log("Error getting expenses: ", error);
    return { success: false };
  }
};

export const addExpense = async (expense) => {
  try {
    await dbConnect();

    const newExpense = await Expense.create(expense);

    const stringNewExpense = JSON.stringify(newExpense);

    return { success: true, stringNewExpense };
  } catch (error) {
    console.log("Error adding expense: ", error);
  }
};

export const editExpense = async (newExpense) => {
  try {
    await dbConnect();
    const editedExpense = await Expense.findByIdAndUpdate(
      { _id: newExpense._id },
      newExpense,
      { new: true, runValidators: true }
    );

    if (!editedExpense) return { success: false };
    const stringEditedExpense = JSON.stringify(editedExpense);
    console.log("edited expense: ", editedExpense);
    return { success: true, stringEditedExpense };
  } catch (error) {
    console.log("Error editing expense: ", error);
  }
};

export const deleteExpense = async (_id) => {
  try {
    await dbConnect();
    const deletedExpense = await Expense.findByIdAndDelete(_id);
    if (!deletedExpense) return { success: false };
    return { success: true };
  } catch (error) {
    console.log("Error deleting expense: ", error);
  }
};
