import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaBox, FaCheckCircle, FaWarehouse, FaUsers } from "react-icons/fa";

import AssetsTable from "../dashboard/AssetTable"; // adjust path if needed

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const username = "Devajit";

  // Bar Chart Data
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Assets", // optional – was missing
        data: [1200, 8200, 9000, 5200, 1800],
        backgroundColor: "#000000",
        borderRadius: 12,
      },
    ],
  };

  const barOptions = {
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: "#e5e7eb" } },
      x: { grid: { display: false } },
    },
    maintainAspectRatio: false,
  };

  // Donut Chart Data
  const donutData = {
    labels: ["Active", "Offline"],
    datasets: [
      {
        data: [513, 121],
        backgroundColor: ["#000000", "#9ca3af"],
        borderWidth: 0,
      },
    ],
  };

  const donutOptions = {
    cutout: "70%",
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-screen bg-slate-100">
     

    <div className="mt-16 p-2 transition-all duration-300">
        {/* HEADER */}
        <h2 className="text-2xl font-semibold mb-8">
          Hello, <span className="font-bold">{username}</span>
        </h2>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Imported Assets" value="4634" icon={<FaBox />} />
          <StatCard title="Active Assets"   value="1"    icon={<FaCheckCircle />} />
          <StatCard title="Parked Assets"   value="2"    icon={<FaWarehouse />} />
          <StatCard title="Custodian List"  value="1107" icon={<FaUsers />} />
        </div>

        {/* MAIN GRID – Charts + Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Bar Chart */}
          <Card className="h-80">
            <h3 className="font-semibold mb-4">Statistics</h3>
            <div className="h-64">
              <Bar data={barData} options={barOptions} />
            </div>
          </Card>

          {/* Donut + Legend */}
          <Card className="flex flex-col items-center h-80">
            <h3 className="font-semibold mb-6 w-full text-left">Statistics</h3>

            <div className="relative w-48 h-48 mx-auto">
              <Doughnut data={donutData} options={donutOptions} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-gray-500">Total Count</span>
                <span className="text-3xl font-bold">1,375</span>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-sm w-full px-4">
              <p>
                <span className="inline-block w-2 h-2 bg-black rounded-full mr-2"></span>
                Active — 513
              </p>
              <p>
                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Offline — 121
              </p>
            </div>
          </Card>

          {/* Updates */}
          <Card className="h-80 overflow-y-auto">
            <h3 className="font-semibold mb-4">Updates</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Asset Request",
                "Location Transfer Requests",
                "Custodian Transfer Requests",
                "Buyback Requests",
                "Asset Return Requests",
                "Allocated Assets",
              ].map((item, i) => (
                <li key={i} className="border-b pb-2 text-gray-700 last:border-b-0">
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Asset Table – full width */}
        <Card>
          <AssetsTable />
        </Card>
      </div>
    </div>
  );
};

/* Reusable Components */
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border p-6 ${className}`}>
    {children}
  </div>
);

const StatCard = ({ title, value, icon }) => (
  <div className="relative bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    {/* Left accent bar */}
    <div className="absolute left-0 top-0 h-full w-2 bg-black"></div>

    <div className="flex items-center justify-between p-6 pl-10">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="p-3 rounded-xl bg-gray-100 text-gray-900 text-xl">
        {icon}
      </div>
    </div>
  </div>
);

export default Dashboard;