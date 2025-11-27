import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { IncomeContext } from "../context/IncomeContext";

export default function ProtectedRoute({ children }) {
  const { user, loadingAuth } = useContext(AuthContext);
  const { income, loadingIncome } = useContext(IncomeContext);
  const location = useLocation();

  if (loadingAuth || loadingIncome) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Income required for all routes except /set-income
  if (
    (income === null || income === undefined) &&
    location.pathname !== "/set-income"
  ) {
    return <Navigate to="/set-income" replace />;
  }

  return children;
}
