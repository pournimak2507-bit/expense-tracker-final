import React, { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { getCategories } from "../../services/categoryServices";
import { getExpense, updateExpense } from "../../services/expenseServices";
import { useNavigate, useParams } from "react-router-dom";

export default function EditExpense() {
  const { id } = useParams();
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
        const [catsRes, expRes] = await Promise.all([
          getCategories(),
          getExpense(id),
        ]);

        setCategories(catsRes?.data || []);
        const e = expRes?.data || {};

        setForm({
          amount: e.amount || "",
          category: e.category?._id || e.category || "",
          description: e.description || "",
          date: e.date ? new Date(e.date).toISOString().slice(0, 10) : "",
        });
      } catch (err) {
        console.error("Failed to load expense:", err);
      }
    }
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.amount || !form.category) {
      return alert("Amount & category required");
    }

    setSaving(true);

    try {
      const payload = {
        amount: Number(form.amount),
        category: form.category, // backend expects _id
        description: form.description || "",
        date: form.date
          ? new Date(form.date).toISOString()
          : new Date().toISOString(),
      };

      console.log("Updating expense:", payload); // Debug

      await updateExpense(id, payload);
      navigate("/expenses");
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Failed to update expense. Check your input."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <Card className="w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Expense</h2>
        <form onSubmit={submit}>
          <label className="text-sm">Amount</label>
          <Input
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <label className="text-sm mt-3">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2 rounded border mt-1"
          >
            <option value="">Select</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <label className="text-sm mt-3">Description</label>
          <Input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <label className="text-sm mt-3">Date</label>
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <Button className="mt-4" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
