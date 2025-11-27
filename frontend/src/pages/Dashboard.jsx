import React, { useEffect, useState } from "react";
import api from "../services/api";
import Card from "../components/ui/Card";
import LineChartBox from "../components/charts/LineChartBox";
import PieChartBox from "../components/charts/PieChartBox";
import GoalsProgress from "../components/dashboard/GoalsProgress";
import BudgetWarning from "../components/dashboard/BudgetWarning";
import SummaryCards from "../components/dashboard/SummaryCards";

export default function Dashboard() {
  const [income, setIncome] = useState({ amount: 0 });
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [incRes, expRes, catRes, budRes, goalsRes] =
        await Promise.allSettled([
          api.get("/income"),
          api.get("/expenses"),
          api.get("/categories"),
          api.get("/budgets"),
          api.get("/saving-goals").catch(() => api.get("/savings")),
        ]);

      if (incRes.status === "fulfilled")
        setIncome(incRes.value.data || { amount: 0 });

      if (expRes.status === "fulfilled")
        setExpenses(Array.isArray(expRes.value.data) ? expRes.value.data : []);

      if (catRes.status === "fulfilled") setCategories(catRes.value.data || []);

      if (budRes.status === "fulfilled") setBudgets(budRes.value.data || []);

      if (goalsRes.status === "fulfilled")
        setGoals(Array.isArray(goalsRes.value.data) ? goalsRes.value.data : []);
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------
  // CALCULATIONS
  // ---------------------------

  const totalExpenses = expenses.reduce(
    (sum, e) => sum + (Number(e.amount) || 0),
    0
  );

  const incomeAmount = Number(income?.amount || 0);

  // CATEGORY CHART
  const categoryLabels = categories.map((c) => c.name);

  const categoryValues = categoryLabels.map((label) => {
    const cat = categories.find((c) => c.name === label);
    if (!cat) return 0;

    return expenses
      .filter((ex) =>
        ex.category?._id ? ex.category._id === cat._id : ex.category === cat._id
      )
      .reduce((s, x) => s + Number(x.amount || 0), 0);
  });

  // MONTHLY LINE CHART
  const months = {};
  expenses.forEach((ex) => {
    const d = ex.date ? new Date(ex.date) : new Date();
    const key = d.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    months[key] = (months[key] || 0) + Number(ex.amount || 0);
  });

  const lineLabels = Object.keys(months).slice(-6);
  const lineValues = lineLabels.map((m) => months[m]);

  // FALLBACK SAFE DATA
  const categoryExpenseData = {
    labels: categoryLabels.length ? categoryLabels : ["Food", "Travel"],
    values: categoryValues.length ? categoryValues : [0, 0],
  };

  const monthlyExpenseData = {
    labels: lineLabels.length ? lineLabels : ["Jan", "Feb", "Mar"],
    values: lineValues.length ? lineValues : [0, 0, 0],
  };

  return (
    <div className="space-y-6">
      <SummaryCards
        totalIncome={incomeAmount}
        totalExpenses={totalExpenses}
        goals={goals}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Spending Overview</h3>
            <LineChartBox data={monthlyExpenseData} />
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Saving Goals</h3>
            <GoalsProgress goals={goals} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-4">
            <h4 className="text-sm font-medium mb-3">Category Breakdown</h4>
            <PieChartBox data={categoryExpenseData} />
          </Card>

          <Card className="p-4">
            <h4 className="text-sm font-medium mb-3">Budgets Status</h4>
            <div className="space-y-3">
              {budgets.length === 0 && (
                <p className="text-sm text-gray-600">No budgets set.</p>
              )}

              {budgets.map((b) => (
                <BudgetWarning
                  key={b._id}
                  budget={b}
                  expenses={expenses}
                  categories={categories}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href="/expenses/add"
          className="px-4 py-2 rounded bg-indigo-600 text-white shadow"
        >
          Add Expense
        </a>
        <a href="/saving-goals" className="px-4 py-2 rounded border">
          Manage Goals
        </a>
        <a href="/budget" className="px-4 py-2 rounded border">
          Manage Budgets
        </a>
      </div>

      {loading && (
        <div className="text-sm text-gray-500">Loading dashboard...</div>
      )}
    </div>
  );
}
