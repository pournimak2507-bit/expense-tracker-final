import React from "react";
import { formatCurrency } from "../../utils/format";

export default function BudgetWarning({ budget, expenses, categories }) {
  if (!budget || !expenses || !categories) return null;

  const category = categories.find((c) => c._id === budget.category);
  const categoryName = category ? category.name : "Unknown Category";

  const totalSpent = expenses
    .filter(
      (e) =>
        e.category &&
        (e.category._id
          ? e.category._id === budget.category
          : e.category === budget.category)
    )
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const remaining = Number(budget.amount) - totalSpent;
  const percent = Math.min(
    100,
    Math.round((totalSpent / Number(budget.amount)) * 100)
  );

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">{categoryName}</h4>
        <span className="text-sm text-gray-600">
          Limit: {formatCurrency(budget.amount)}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden">
        <div
          className={`h-3 ${
            percent > 90
              ? "bg-red-500"
              : percent > 60
              ? "bg-yellow-400"
              : "bg-green-500"
          }`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <p className="text-sm mt-2">
        Spent: {formatCurrency(totalSpent)}{" "}
        <span className="text-gray-600">({percent}%)</span>
      </p>

      <p
        className={`text-sm font-medium ${
          remaining < 0 ? "text-red-600" : "text-green-600"
        }`}
      >
        {remaining < 0
          ? `Over budget by ${formatCurrency(Math.abs(remaining))}`
          : `Remaining: ${formatCurrency(remaining)}`}
      </p>
    </div>
  );
}
