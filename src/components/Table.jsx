"use client";
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { addExpense, deleteExpense } from "../app/actions/Expense";
import { formatDate, formatDateToYYYYMMDD } from "../utils/formatDate";
import CreateEdit from "./CreateEdit";
import Modal from "./Modal";

const Table = ({ expenseList, setExpenseList, totals, setTotals }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newExpense, setNewExpense] = useState({
    dateSpent: "",
    location: "",
    spender: "",
    type: "",
    amount: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showDeleteMsg, setShowDeleteMsg] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleAddClick = async () => {
    if (!showAdd) setShowAdd(true);
    if (showAdd) {
      const expenseToAdd = {
        ...newExpense,
        dateSpent: new Date(newExpense.dateSpent),
      };
      try {
        const response = await addExpense(expenseToAdd);
        if (response.success && response.stringNewExpense) {
          const addedExpense = JSON.parse(response.stringNewExpense);
          const newExpenseList = [...expenseList];
          newExpenseList.push(addedExpense);
          setExpenseList(newExpenseList);
          setTotals((prevTotals) => ({
            ...prevTotals,
            groceryAmount:
              addedExpense.type === "Grocery"
                ? prevTotals.groceryAmount + addedExpense.amount
                : prevTotals.groceryAmount,
            diningAmount:
              addedExpense.type === "Dining"
                ? prevTotals.diningAmount + addedExpense.amount
                : prevTotals.diningAmount,
            demAmount:
              addedExpense.spender === "Dem"
                ? prevTotals.demAmount + addedExpense.amount
                : prevTotals.demAmount,
            mariceAmount:
              addedExpense.spender === "Marice"
                ? prevTotals.mariceAmount + addedExpense.amount
                : prevTotals.mariceAmount,
            totalAmount: prevTotals.totalAmount + addedExpense.amount,
          }));

          toast.success("Expense added!");
          setShowAdd(false);
        } else {
          console.error("Error adding expense!");
          toast.error("Something went wrong, reload and try again.");
        }
        setShowAdd(false);
        setNewExpense({
          dateSpent: "",
          location: "",
          spender: "",
          type: "",
          amount: "",
        });
      } catch (error) {
        console.error("Error adding expense: ", error);
        toast.error("Something went wrong, reload and try again.");
        setShowAdd(false);
        setNewExpense({
          dateSpent: "",
          location: "",
          spender: "",
          type: "",
          amount: "",
        });
      }
    }
  };

  const handleEditClick = (index, expense) => {
    const formattedDate = formatDate(expense.dateSpent);
    console.log("formatted date: ", formattedDate);
    setEditingIndex(index);

    // Format the date and set the new expense
    const formattedExpense = {
      ...expense,
      dateSpent: formatDateToYYYYMMDD(formattedDate),
    };

    setNewExpense(formattedExpense);
  };

  const handleCancelClick = () => {
    setShowAdd(false);
    setNewExpense({
      dateSpent: "",
      location: "",
      spender: "",
      type: "",
      amount: "",
    });
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteMsg(true);
  };

  const handleCancelDeleteClick = () => {
    setDeleteId(null);
    setShowDeleteMsg(false);
  };

  const handleDelete = async () => {
    console.log("block hit");
    try {
      const response = await deleteExpense(deleteId);
      console.log("delete response: ", response);
      if (response.success) {
        const deletedExpense = expenseList.find(
          (expense) => expense._id === deleteId
        );
        const newExpenseList = expenseList.filter(
          (expense) => expense._id !== deleteId
        );
        setExpenseList(newExpenseList);
        setTotals((prevTotals) => {
          const updatedTotals = { ...prevTotals };

          // Adjust totals based on the original expense
          updatedTotals.totalAmount -= deletedExpense.amount;
          if (deletedExpense.type === "Grocery")
            updatedTotals.groceryAmount -= deletedExpense.amount;
          if (deletedExpense.type === "Dining")
            updatedTotals.diningAmount -= deletedExpense.amount;
          if (deletedExpense.spender === "Dem")
            updatedTotals.demAmount -= deletedExpense.amount;
          if (deletedExpense.spender === "Marice")
            updatedTotals.mariceAmount -= deletedExpense.amount;

          return updatedTotals;
        });

        toast.success("Expense deleted!");
      } else {
        toast.error(
          "There was an error deleting the expense, please try again."
        );
      }
      setDeleteId(null);
      setShowDeleteMsg(false);
    } catch (error) {
      console.error("Error deleting expense: ", error);
      toast.error("There was an error deleting the expense, please try again.");
      setShowDeleteMsg(false);
      setDeleteId(null);
    }
  };

  //  bg-emerald-100 rounded-lg w-11/12 mx-auto mb-2 shadow-lg p-1
  return (
    <div className="my-4 text-lg">
      <div className="grid grid-cols-6 w-11/12 mx-auto">
        <div className="bg-amber-300 rounded-lg mx-auto mb-2 py-1 px-2 w-11/12 shadow-lg">
          Date
        </div>
        <div className="bg-amber-300 rounded-lg mx-auto mb-2 py-1 px-2 w-11/12 shadow-lg">
          Location
        </div>
        <div className="bg-amber-300 rounded-lg mx-auto mb-2 py-1 px-2 w-11/12 shadow-lg">
          Type
        </div>
        <div className="bg-amber-300 rounded-lg mx-auto mb-2 py-1 px-2 w-11/12 shadow-lg">
          Spender
        </div>
        <div className="bg-amber-300 rounded-lg mx-auto mb-2 py-1 px-2 w-11/12 shadow-lg">
          Amount
        </div>
        <div className="bg-amber-300 rounded-lg mx-auto mb-2 py-1 px-2 w-11/12 shadow-lg">
          Actions
        </div>
      </div>

      <div className="bg-emerald-50 w-11/12 mx-auto">
        {expenseList.length === 0 && (
          <div className="bg-emerald-100 p-1 rounded-lg">
            No expenses for this time period...
          </div>
        )}
        {expenseList.length > 0 &&
          expenseList.map((expense, index) =>
            editingIndex === index ? (
              <CreateEdit
                key={expense._id}
                newExpense={newExpense}
                setNewExpense={setNewExpense}
                isEdit={true}
                setEditingIndex={setEditingIndex}
                expenseList={expenseList}
                setExpenseList={setExpenseList}
                totals={totals}
                setTotals={setTotals}
                setShowAdd={setShowAdd}
              />
            ) : (
              <div
                key={expense._id}
                className="grid grid-cols-6 text-xl odd:bg-emerald-100 even:bg-emerald-200 rounded-lg w-full shadow-inner p-1 mb-2"
              >
                <div className="mt-1">{formatDate(expense.dateSpent)}</div>
                <div className="mt-1">{expense.location}</div>
                <div className="mt-1">{expense.type}</div>
                <div className="mt-1">{expense.spender}</div>
                <div className="mt-1">${expense.amount.toFixed(2)}</div>
                <div className="items-center">
                  <button
                    className="p-1 mt-1"
                    onClick={() => handleEditClick(index, expense)}
                  >
                    <FaPenToSquare className="h-4 w-4 hover:text-amber-500" />
                  </button>
                  <button
                    className="p-1 mt-1"
                    onClick={() => handleDeleteClick(expense._id)}
                  >
                    <FaTrashCan className="h-4 w-4 hover:text-amber-500" />
                  </button>
                </div>
              </div>
            )
          )}
        {showAdd && (
          <CreateEdit
            newExpense={newExpense}
            setNewExpense={setNewExpense}
            isEdit={false}
          />
        )}
      </div>
      <button
        onClick={handleAddClick}
        className="bg-amber-300 rounded-lg shadow-lg py-1 px-2 mt-4 mb-6 hover:bg-amber-500"
      >
        {showAdd ? "Save" : "+ Add Expense"}
      </button>
      {showAdd && (
        <button
          className="bg-amber-300 rounded-lg shadow-lg py-1 px-2 mt-4 mb-6 ml-2 hover:bg-amber-500"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      )}
      {showDeleteMsg && (
        <Modal setShowModal={setShowDeleteMsg}>
          <div className="text-2xl">
            Are you sure you want to delete the expense?
          </div>
          <button
            className="bg-amber-300 rounded-lg shadow-lg py-1 px-2 mt-4 mb-6 ml-2 hover:bg-amber-500 text-xl"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="bg-amber-300 rounded-lg shadow-lg py-1 px-2 mt-4 mb-6 ml-2 hover:bg-amber-500 text-xl"
            onClick={handleCancelDeleteClick}
          >
            Cancel
          </button>
        </Modal>
      )}
    </div>
  );
};
export default Table;
