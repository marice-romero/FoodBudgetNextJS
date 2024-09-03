import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: [true, "Please provide a location."],
    },
    type: {
      type: String,
      required: [true, "Please provide an expense type."],
      enum: ["Grocery", "Dining", "Special Event"],
    },
    spender: {
      type: String,
      required: [true, "Please denote who paid for the expense."],
      enum: ["Marice", "Dem", "Joint"],
    },
    dateSpent: {
      type: Date,
    },
    amount: {
      type: Number,
    },
    user: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.Expense ||
  mongoose.model("Expense", ExpenseSchema);
