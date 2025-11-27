import api from "./api";

export const setIncome = (data) => api.post("/income", data);
export const getIncome = () => api.get("/income");
