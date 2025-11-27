import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

export default function LineChartBox({ data }) {
  const chartData = {
    labels: data.labels || [],
    datasets: [
      {
        label: "Monthly Spend",
        data: data.values || [],
        borderColor: "rgb(99,102,241)",
        backgroundColor: "rgba(99,102,241,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      }}
    />
  );
}
