/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { getCategories } from "../../services/categoryServices";
import { createExpense } from "../../services/expenseServices";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await getCategories();
        setCategories(res.data || []);
      } catch (err) {
        setCategories([]);
      }
    }
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.amount || !form.category)
      return alert("Amount & category required");

    setSaving(true);

    try {
      const payload = {
        amount: Number(form.amount),
        category: form.category,
        description: form.description || "",
        date: form.date
          ? new Date(form.date).toISOString()
          : new Date().toISOString(),
      };

      console.log("Submitting expense:", payload);

      await createExpense(payload);

      navigate("/expenses");
    } catch (err) {
      console.error("Add expense failed:", err);
      alert(err?.response?.data?.message || "Failed to add expense");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-lg">
        {" "}
        {/* Budget style सारखं size */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Add Expense
          </h2>
          <form onSubmit={submit}>
            <label className="block text-sm text-gray-800">Amount</label>
            <Input
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="e.g. 500"
            />

            <label className="block text-sm text-gray-800 mt-3">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg mt-1 bg-white"
            >
              <option value="">Select</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label className="block text-sm text-gray-800 mt-3">
              Description
            </label>
            <Input
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <label className="block text-sm text-gray-800 mt-3">Date</label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <Button type="submit" className="w-full mt-5" disabled={saving}>
              {saving ? "Saving..." : "Add Expense"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
