import React, { useContext, useState } from "react";
import { SavingGoalContext } from "../context/SavingGoalContext";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function SavingGoals() {
  const { goals, loading, addGoal, editGoal, removeGoal } =
    useContext(SavingGoalContext);

  const [form, setForm] = useState({
    goalName: "",
    targetAmount: "",
    savedAmount: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.goalName || !form.targetAmount)
      return alert("All fields are required");

    await addGoal({
      goalName: form.goalName,
      targetAmount: Number(form.targetAmount),
      savedAmount: Number(form.savedAmount || 0),
      deadline: new Date(),
    });

    setForm({ goalName: "", targetAmount: "", savedAmount: "" });
  };

  const updateSaved = async (goal) => {
    const amt = prompt("Enter updated saved amount", goal.savedAmount);
    if (!amt) return;

    await editGoal(goal._id, { savedAmount: Number(amt) });
  };

  if (loading) return <div>Loading goals...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Saving Goals
      </h2>

      {/* ADD GOAL FORM */}
      <div className="mb-8">
        <Card className="p-6 rounded-2xl shadow-lg bg-white/70 backdrop-blur-md">
          <h3 className="text-lg font-semibold mb-4">Add New Goal</h3>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700">Goal Name</label>
              <Input
                placeholder="e.g. Buy Laptop"
                value={form.goalName}
                onChange={(e) => setForm({ ...form, goalName: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Target Amount</label>
              <Input
                type="number"
                placeholder="10000"
                value={form.targetAmount}
                onChange={(e) =>
                  setForm({ ...form, targetAmount: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Saved Amount</label>
              <Input
                type="number"
                placeholder="0"
                value={form.savedAmount}
                onChange={(e) =>
                  setForm({ ...form, savedAmount: e.target.value })
                }
              />
            </div>

            <Button type="submit" className="w-full text-lg py-3">
              Add Goal
            </Button>
          </form>
        </Card>
      </div>

      {/* GOALS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g) => {
          const percentage = Math.min(
            (g.savedAmount / g.targetAmount) * 100,
            100
          );

          return (
            <Card
              key={g._id}
              className="p-5 rounded-2xl shadow-md bg-white/80 backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold">{g.goalName}</h3>

              <p className="text-sm text-gray-600 mt-1">
                ₹{g.savedAmount} / ₹{g.targetAmount}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-3 rounded mt-3">
                <div
                  className="h-3 rounded bg-green-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-3"
                  onClick={() => updateSaved(g)}
                >
                  Update
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 px-3"
                  onClick={() => removeGoal(g._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
