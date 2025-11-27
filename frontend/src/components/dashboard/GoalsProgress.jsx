import React from "react";
import { formatCurrency } from "../../utils/format";

export default function GoalsProgress({ goals = [] }) {
  const safeGoals = Array.isArray(goals) ? goals : [];

  if (!safeGoals.length) {
    return (
      <p className="text-sm text-gray-600">
        No saving goals yet. Create one from Saving Goals page.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {safeGoals.map((g) => {
        const target = Number(g.targetAmount || 0);
        const saved = Number(g.savedAmount || 0);
        const pct = target > 0 ? Math.min(100, Math.round((saved / target) * 100)) : 0;

        return (
          <div key={g._id} className="bg-white/80 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{g.title}</div>
                <div className="text-sm text-gray-600">
                  Target: {formatCurrency(target)}
                </div>
              </div>
              <div className="text-sm">{pct}%</div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden">
              <div
                style={{ width: `${pct}%` }}
                className={`h-3 ${
                  pct > 66 ? "bg-green-500" : pct > 33 ? "bg-yellow-400" : "bg-indigo-600"
                }`}
              ></div>
            </div>
            <div className="text-xs text-gray-600 mt-2">
              Saved: {formatCurrency(saved)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
