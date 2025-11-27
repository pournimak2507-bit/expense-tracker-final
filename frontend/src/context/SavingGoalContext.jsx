/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useEffect } from "react";
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../services/SavingGoalsServices";

export const SavingGoalContext = createContext();

export function SavingGoalProvider({ children }) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGoals();
  }, []);

  async function loadGoals() {
    try {
      const res = await getGoals();
      setGoals(res.data.data || []); // 🔥 Correct backend format
    } catch (err) {
      console.error("Failed to load goals", err);
      setGoals([]);
    } finally {
      setLoading(false);
    }
  }

  const addGoal = async (data) => {
    const res = await createGoal(data);
    setGoals((prev) => [...prev, res.data.data]); // 🔥 backend → {data: goal}
  };

  const editGoal = async (id, data) => {
    const res = await updateGoal(id, data);
    setGoals((prev) => prev.map((g) => (g._id === id ? res.data.data : g)));
  };

  const removeGoal = async (id) => {
    await deleteGoal(id);
    setGoals((prev) => prev.filter((g) => g._id !== id));
  };

  return (
    <SavingGoalContext.Provider
      value={{ goals, loading, addGoal, editGoal, removeGoal }}
    >
      {children}
    </SavingGoalContext.Provider>
  );
}
