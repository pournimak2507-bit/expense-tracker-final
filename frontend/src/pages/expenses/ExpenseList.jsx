/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import { ExpenseContext } from "../../context/ExpenseContext";
import { getCategories } from "../../services/categoryServices";
import { deleteExpense } from "../../services/expenseServices";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function ExpenseList() {
  const { expenses, loading, refresh } = useContext(ExpenseContext);
  const [q, setQ] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [categories, setCategories] = useState([]);
  const [filtering, setFiltering] = useState(false);

  useEffect(() => {
    async function loadCats() {
      try {
        const res = await getCategories();
        setCategories(res?.data || []);
      } catch (err) {
        setCategories([]);
      }
    }
    loadCats();
  }, []);

  const applyFilters = async () => {
    setFiltering(true);
    const params = {};

    if (categoryId) params.category = categoryId;
    if (from) params.from = from; // ExpenseContext will map to startDate
    if (to) params.to = to; // ExpenseContext will map to endDate
    if (q) params.q = q;

    await refresh(params);
    setFiltering(false);
  };

  const clearFilters = async () => {
    setQ("");
    setCategoryId("");
    setFrom("");
    setTo("");
    await refresh();
  };

  const remove = async (id) => {
    if (!confirm("Delete this expense?")) return;
    try {
      await deleteExpense(id);
      await refresh();
    } catch (err) {
      alert(err?.response?.data?.message || "Delete failed. Check backend.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Expenses</h2>
        <Link
          to="/expenses/add"
          className="px-3 py-2 rounded bg-indigo-600 text-white"
        >
          Add Expense
        </Link>
      </div>

      <Card className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input
            placeholder="Search description..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="px-3 py-2 rounded border"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <Input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <Input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div className="flex gap-2 mt-3">
          <Button onClick={applyFilters} disabled={filtering}>
            {filtering ? "Filtering..." : "Apply"}
          </Button>
          <Button
            type="submit"
            onClick={clearFilters}
            className="bg-gray-300 text-black"
          >
            Clear
          </Button>
        </div>
      </Card>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-3">
          {expenses.length === 0 && (
            <div className="text-sm text-gray-600">No expenses found.</div>
          )}
          {expenses.map((exp) => (
            <Card key={exp._id}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">₹ {exp.amount}</div>
                  <div className="text-sm text-gray-600">{exp.title}</div>
                  <div className="text-xs text-gray-500">
                    {exp.date
                      ? new Date(exp.date).toLocaleDateString()
                      : "No date"}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Link
                    to={`/expenses/edit/${exp._id}`}
                    className="px-3 py-1 rounded bg-yellow-400 text-black"
                  >
                    Edit
                  </Link>
                  <button
                    type="submit"
                    onClick={() => remove(exp._id)}
                    className="px-3 py-1 rounded bg-red-400 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
