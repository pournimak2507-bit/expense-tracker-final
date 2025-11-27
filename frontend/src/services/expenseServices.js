// frontend/src/services/expenseServices.js
import api from "./api";

// CREATE
export const createExpense = (data) => api.post("/expenses/add", data);

// LIST
export const getExpenses = (params = {}) => api.get("/expenses", { params });

// GET SINGLE
export const getExpense = (id) => api.get(`/expenses/${id}`);

// UPDATE
export const updateExpense = (id, data) =>
  api.put(`/expenses/update/${id}`, data);

// DELETE
export const deleteExpense = (id) => api.delete(`/expenses/delete/${id}`);
