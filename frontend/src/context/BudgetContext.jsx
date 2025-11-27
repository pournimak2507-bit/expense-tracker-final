/* eslint-disable no-unused-vars */
// src/context/BudgetContext.js
import { createContext, useState, useEffect } from "react";
import api from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [budget, setBudgetState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBudget();
  }, []);

  // Load budget from backend
  const loadBudget = async () => {
    try {
      setLoading(true);
      const res = await api.get("/budgets");
      // backend returns array of budgets, take latest month (or first)
      setBudgetState(res.data.length > 0 ? res.data[0] : null);
    } catch (err) {
      console.log("Budget not set yet");
      setBudgetState(null);
    } finally {
      setLoading(false);
    }
  };

  // Create or Update budget
  const saveBudget = async (data) => {
    try {
      const payload = {
        month: data.recurrence, // "Monthly", "Weekly", "Yearly"
        budgetAmount: Number(data.amount),
      };
      const res = await api.post("/budgets/set", payload);
      setBudgetState(res.data.budget);
      return res.data.budget;
    } catch (err) {
      console.error("Failed to save budget:", err);
      throw err;
    }
  };

  return (
    <BudgetContext.Provider
      value={{ budget, loading, create: saveBudget, edit: saveBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
}
