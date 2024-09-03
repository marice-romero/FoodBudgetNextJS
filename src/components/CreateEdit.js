import { toast } from "react-hot-toast";
import { editExpense } from "../app/actions/Expense";

const CreateEdit = ({
  newExpense,
  setNewExpense,
  isEdit,
  setEditingIndex,
  expenseList,
  setExpenseList,
  totals,
  setTotals,
}) => {
  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      const response = await editExpense(newExpense);
      if (response.success) {
        const updatedExpense = JSON.parse(response.stringEditedExpense);
        setTotals((prevTotals) => {
          const originalExpense = expenseList.find(
            (expense) => expense._id === updatedExpense._id
          );
          const updatedTotals = { ...prevTotals };

          if (originalExpense) {
            // Adjust totals based on the original expense
            updatedTotals.totalAmount -= originalExpense.amount;
            if (originalExpense.type === "Grocery")
              updatedTotals.groceryAmount -= originalExpense.amount;
            if (originalExpense.type === "Dining")
              updatedTotals.diningAmount -= originalExpense.amount;
            if (originalExpense.spender === "Dem")
              updatedTotals.demAmount -= originalExpense.amount;
            if (originalExpense.spender === "Marice")
              updatedTotals.mariceAmount -= originalExpense.amount;

            // Add the updated expense values to totals
            updatedTotals.totalAmount += updatedExpense.amount;
            if (updatedExpense.type === "Grocery")
              updatedTotals.groceryAmount += updatedExpense.amount;
            if (updatedExpense.type === "Dining")
              updatedTotals.diningAmount += updatedExpense.amount;
            if (updatedExpense.spender === "Dem")
              updatedTotals.demAmount += updatedExpense.amount;
            if (updatedExpense.spender === "Marice")
              updatedTotals.mariceAmount += updatedExpense.amount;
          }

          return updatedTotals;
        });

        const newExpenses = expenseList.map((expense) =>
          expense._id === updatedExpense._id ? updatedExpense : expense
        );
        setExpenseList(newExpenses);

        toast.success("Expense updated!");
      } else {
        toast.error("There was an error editing, please try again.");
      }
      setNewExpense({
        dateSpent: "",
        location: "",
        spender: "",
        type: "",
        amount: 0,
      });
      setEditingIndex(null);
    } catch (error) {
      console.error("Error editing expense: ", error);
      toast.error("There was an error editing, please try again.");
      setNewExpense({
        dateSpent: "",
        location: "",
        spender: "",
        type: "",
        amount: 0,
      });
      setEditingIndex(null);
    }
  };

  return (
    <div className="grid grid-cols-6 rounded-lg p-2 mb-2 odd:bg-emerald-100 even:bg-emerald-200 place-content-center">
      <div>
        <input
          type="date"
          name="dateSpent"
          onChange={handleInputChange}
          value={newExpense.dateSpent}
          className="p-1 bg-emerald-50 rounded-lg"
        />
      </div>
      <div>
        <input
          type="text"
          name="location"
          placeholder="Enter location"
          onChange={handleInputChange}
          value={newExpense.location}
          className="py-1 pl-2 pr-1 bg-emerald-50 rounded-lg"
        />
      </div>

      <div>
        <select
          name="type"
          value={newExpense.type}
          onChange={handleInputChange}
          className="px-1 py-2 bg-emerald-50 rounded-lg"
        >
          <option>Select an expense type</option>
          <option value="Grocery">Grocery</option>
          <option value="Dining">Dining</option>
          <option value="Special Event">Special Event</option>
        </select>
      </div>
      <div>
        <select
          name="spender"
          value={newExpense.spender}
          onChange={handleInputChange}
          className="px-1 py-2 bg-emerald-50 rounded-lg"
        >
          <option>Select a person</option>
          <option value="Dem">Dem</option>
          <option value="Marice">Marice</option>
        </select>
      </div>
      <div>
        <input
          type="number"
          name="amount"
          value={newExpense.amount}
          onChange={handleInputChange}
          placeholder="Enter amount"
          className="py-1 pl-2 pr-1 bg-emerald-50 rounded-lg"
        />
      </div>
      {isEdit && (
        <div>
          <button
            className="bg-amber-300 rounded-lg shadow-lg py-1 px-2 mr-1 hover:bg-amber-500"
            onClick={handleEditSave}
          >
            Save
          </button>
          <button
            className="bg-amber-300 rounded-lg shadow-lg py-1 px-2 hover:bg-amber-500"
            onClick={() => setEditingIndex(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
export default CreateEdit;
