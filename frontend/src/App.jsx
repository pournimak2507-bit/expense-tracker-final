import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Dashboard from "./pages/Dashboard";
import SetIncome from "./pages/SetIncome";
import AddCategory from "./pages/AddCategory";
import BudgetManagement from "./pages/BudgetManagement";
import SavingGoals from "./pages/SavingGoals";

import ExpenseList from "./pages/expenses/ExpenseList";
import AddExpense from "./pages/expenses/AddExpense";
import EditExpense from "./pages/expenses/EditExpense";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />

      {/* Protected Routes With Layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="set-income" element={<SetIncome />} />
        <Route path="categories" element={<AddCategory />} />
        <Route path="budget" element={<BudgetManagement />} />
        <Route path="saving-goals" element={<SavingGoals />} />
        <Route path="expenses" element={<ExpenseList />} />
        <Route path="expenses/add" element={<AddExpense />} />
        <Route path="expenses/edit/:id" element={<EditExpense />} />
      </Route>

      {/* Unknown Routes Redirect → Login */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
