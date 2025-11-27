import React from "react";
import Card from "../ui/Card";
import { formatCurrency } from "../../utils/format";

export default function SummaryCards({
  totalIncome = 0,
  totalExpenses = 0,
  goals = [],
}) {
  const safeGoals = Array.isArray(goals) ? goals : [];

  const remaining = totalIncome - totalExpenses;
  const totalGoalTarget = safeGoals.reduce(
    (a, g) => a + Number(g.targetAmount || 0),
    0
  );
  const totalGoalSaved = safeGoals.reduce(
    (a, g) => a + Number(g.savedAmount || 0),
    0
  );
  const goalPercent =
    totalGoalTarget > 0
      ? Math.round((totalGoalSaved / totalGoalTarget) * 100)
      : 0;

  const cardClass = "p-5 rounded-xl transform transition-transform duration-300 hover:-translate-y-1";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Income */}
      <Card className={cardClass}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm opacity-90">Total Income</p>
            <p className="text-2xl font-bold mt-2">{formatCurrency(totalIncome)}</p>
            <p className="text-xs opacity-80 mt-1">Recurrence: Monthly</p>
          </div>
          <div className="text-4xl opacity-80">💰</div>
        </div>
      </Card>

      {/* Total Expenses */}
      <Card className={cardClass}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm opacity-90">Total Expenses</p>
            <p className="text-2xl font-bold mt-2">{formatCurrency(totalExpenses)}</p>
            <p className="text-xs opacity-80 mt-1">Items: —</p>
          </div>
          <div className="text-4xl opacity-80">⬇️</div>
        </div>
      </Card>

      {/* Balance */}
      <Card className={cardClass}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm opacity-90">Balance</p>
            <p className="text-2xl font-bold mt-2">{formatCurrency(remaining)}</p>
            <p className="text-xs opacity-80 mt-1">
              {remaining < 0 ? "Over budget" : "Within budget"}
            </p>
          </div>
          <div className="text-4xl opacity-80">📈</div>
        </div>
      </Card>

      {/* Goals Progress */}
      <Card className={cardClass}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm opacity-90">Goals Progress</p>
            <p className="text-2xl font-bold mt-2">{goalPercent}%</p>
            <p className="text-xs opacity-80 mt-1">
              {formatCurrency(totalGoalSaved)} / {formatCurrency(totalGoalTarget)}
            </p>
          </div>
          <div className="text-4xl opacity-80">🎯</div>
        </div>
      </Card>
    </div>
  );
}
