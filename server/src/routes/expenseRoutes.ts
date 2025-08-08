import { Router } from "express";
import Expense from "../models/Expense";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/", async (_, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

router.delete("/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// **ADD THIS PUT ROUTE TO HANDLE EDIT/UPDATE**

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount, category } = req.body;

  if (!title || !amount || !category) {
    return res.status(400).json({ error: "Please provide all fields" });
  }

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { title, amount, category },
      { new: true } // Return updated doc
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
