/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const IncomeContext = createContext();

export function IncomeProvider({ children }) {
  const [income, setIncome] = useState(0);
  const [loadingIncome, setLoadingIncome] = useState(true);

  useEffect(() => {
    loadIncome();
  }, []);

  async function loadIncome() {
    try {
      const res = await api.get("/income");

      // Check actual backend response
      const amount =
        res.data?.amount || res.data?.income || res.data?.data?.amount || 0;

      setIncome(Number(amount));
    } catch (error) {
      console.error("Income Load Error:", error);
      setIncome(0);
    } finally {
      setLoadingIncome(false);
    }
  }

  const refreshIncome = async () => {
    await loadIncome();
  };

  return (
    <IncomeContext.Provider
      value={{ income, setIncome, refreshIncome, loadingIncome }}
    >
      {children}
    </IncomeContext.Provider>
  );
}
