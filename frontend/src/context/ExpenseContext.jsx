/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import { getExpenses as fetchExpenses } from "../services/expenseServices";

export const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 1000 });

  const load = async (params = {}) => {
    setLoading(true);
    setError("");

    try {
      // map from/to -> startDate/endDate for backend
      const mapped = { ...params };
      if (params.from) mapped.startDate = params.from;
      if (params.to) mapped.endDate = params.to;

      // remove local keys
      delete mapped.from;
      delete mapped.to;

      const res = await fetchExpenses(mapped);

      // backend returns { data, total, page, limit }
      if (
        res?.data &&
        typeof res.data === "object" &&
        Array.isArray(res.data.data || res.data)
      ) {
        // if service returns wrapped object
        const payload = Array.isArray(res.data.data) ? res.data.data : res.data;
        const total =
          res.data.total ?? (Array.isArray(payload) ? payload.length : 0);
        const page = res.data.page ?? 1;
        const limit = res.data.limit ?? payload.length;

        setExpenses(payload);
        setMeta({ total, page, limit });
      } else {
        // fallback: older backend that returns array directly
        const payload = res?.data || [];
        setExpenses(Array.isArray(payload) ? payload : []);
        setMeta({
          total: Array.isArray(payload) ? payload.length : 0,
          page: 1,
          limit: payload.length,
        });
      }
    } catch (err) {
      console.error("Failed to load expenses", err);
      setError(err?.response?.data?.message || "Failed to load expenses");
      setExpenses([]);
      setMeta({ total: 0, page: 1, limit: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const refresh = async (params = {}) => {
    await load(params);
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, loading, error, load, refresh, setExpenses, meta }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
