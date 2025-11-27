/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import api from "../services/api";
import Card from "../components/ui/Card";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { IncomeContext } from "../context/IncomeContext";

export default function SetIncome() {
  const [form, setForm] = useState({ amount: "", recurrence: "Monthly" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { refreshIncome } = useContext(IncomeContext);

  useEffect(() => {
    loadIncome();
  }, []);

  async function loadIncome() {
    try {
      const res = await api.get("/income");
      if (res?.data?.amount > 0) {
        if (setUser) {
          setUser((u) => ({
            ...(u || {}),
            income: res.data.amount,
          }));
        }
        navigate("/");
      }
    } catch {
      // no income → allow user to set
    } finally {
      setLoading(false);
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/income", form);

      if (setUser) {
        setUser((u) => ({
          ...(u || {}),
          income: Number(res.data.amount),
        }));
      }

      await refreshIncome();

      alert("Income saved!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to save income");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-lg">
        <Card>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Set Your Income
          </h2>

          <form onSubmit={submit}>
            <label className="block text-sm text-gray-600">Amount</label>
            <Input
              type="number"
              value={form.amount || ""}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="Enter your salary amount"
            />

            <label className="block text-sm text-gray-600 mt-3">
              Recurrence
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border mt-1 bg-white"
              value={form.recurrence}
              onChange={(e) => setForm({ ...form, recurrence: e.target.value })}
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>

            <Button type="submit" className="w-full mt-5">
              Save Income
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
