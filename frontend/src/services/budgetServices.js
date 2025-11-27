import api from "./api";

export const getBudget = () => api.get("/budget");
export const setBudget = (data) => api.post("/budget", data);
export const updateBudget = (data) => api.put("/budget", data);
