/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { BudgetContext } from "../context/BudgetContext";

export default function BudgetManagement() {
  const { budget, loading, create, edit } = useContext(BudgetContext);

  const [form, setForm] = useState({
    amount: "",
    recurrence: "Monthly",
  });

  useEffect(() => {
    if (budget) {
      setForm({
        amount: budget.budgetAmount || "",
        recurrence: budget.month || "Monthly",
      });
    }
  }, [budget]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount) return alert("Budget amount is required");

    try {
      await (budget ? edit(form) : create(form));
      alert(budget ? "Budget updated!" : "Budget set successfully!");
    } catch {
      alert("Failed to save budget");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
  <div className="flex justify-center mt-8">
    <div className="w-full max-w-lg">
      <Card>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {budget ? "Update Your Budget" : "Set Your Budget"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-gray-800">Amount</label>
          <Input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="Enter your budget amount"
          />

          <label className="block text-sm text-gray-800 mt-3">Recurrence</label>
          <select
            className="w-full px-3 py-2 border rounded-lg mt-1 bg-white/70"
            value={form.recurrence}
            onChange={(e) => setForm({ ...form, recurrence: e.target.value })}
          >
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Yearly</option>
          </select>

          <Button type="submit" className="w-full mt-5">
            {budget ? "Update Budget" : "Set Budget"}
          </Button>
        </form>
      </Card>
    </div>
  </div>
);

}
