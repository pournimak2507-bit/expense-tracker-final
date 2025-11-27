import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartBox({ data }) {
  const colors = [
    "rgba(99, 102, 241, 0.7)",
    "rgba(239, 68, 68, 0.7)",
    "rgba(16, 185, 129, 0.7)",
    "rgba(245, 158, 11, 0.7)",
    "rgba(139, 92, 246, 0.7)",
    "rgba(236, 72, 153, 0.7)",
  ];

  const chartData = {
    labels: data.labels || [],
    datasets: [
      {
        data: data.values || [],
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
  };

  return <Pie data={chartData} options={options} />;
}
