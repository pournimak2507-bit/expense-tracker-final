import React, { useState, useContext } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { CategoryContext } from "../context/CategoryContext";

export default function AddCategory() {
  const { create } = useContext(CategoryContext);
  const [form, setForm] = useState({
    name: "",
    type: "Expense",
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return alert("Category name required");

    try {
      await create({ name: form.name });
      alert("Category Added!");

      setForm({ name: "", type: "Expense" });
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to add category");
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-lg">
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Add New Category
          </h2>

          <form onSubmit={submit}>
            <label className="block text-sm text-gray-800">Category Name</label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="E.g. Food, Travel"
            />

            <label className="block text-sm text-gray-800 mt-3">Type</label>
            <select
              className="w-full px-3 py-2 border rounded-lg mt-1 bg-white"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>

            <Button type="submit" className="w-full mt-5">
              Add Category
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
