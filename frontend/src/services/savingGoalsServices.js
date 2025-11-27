import api from "./api";

// All saving goal API calls
export const getGoals = () => api.get("/saving-goals");
export const createGoal = (data) => api.post("/saving-goals", data);
export const updateGoal = (id, data) => api.put(`/saving-goals/${id}`, data);
export const deleteGoal = (id) => api.delete(`/saving-goals/${id}`);
