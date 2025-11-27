import React, { useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function CategoryList() {
  const { categories, remove, loading } = useContext(CategoryContext);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        All Categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((c) => (
          <Card key={c._id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-medium text-gray-900">{c.name}</p>
                <p className="text-sm text-gray-600">{c.type}</p>
              </div>

              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 px-3 py-1"
                onClick={() => remove(c._id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
