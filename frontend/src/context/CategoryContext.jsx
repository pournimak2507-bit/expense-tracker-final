/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get("/categories");
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load categories", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const create = async (data) => {
    const res = await api.post("/categories/add", data);
    if (res.data) setCategories((prev) => [...prev, res.data]);
    return res.data;
  };

  const remove = async (id) => {
    await api.delete(`/categories/delete/${id}`);
    setCategories((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        create,
        remove,
        loading,
        reload: loadCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
