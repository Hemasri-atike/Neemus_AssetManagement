import React from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const ApproverDashboard = () => {
  const username = "Approver";

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mt-16 p-2">
        
        {/* HEADER */}
        <h2 className="text-2xl font-semibold mb-8">
          Welcome, <span className="font-bold">{username}</span>
        </h2>

        {/* APPROVAL STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Pending Requests for Assets" value="12" icon={<FaClock />} />
          <StatCard title="Approved Requests" value="45" icon={<FaCheckCircle />} />
          <StatCard title="Pending Custodian" value="5" icon={<FaTimesCircle />} />
          <StatCard title="Reports" value="62" icon={<FaCheckCircle />} />
        </div>

      </div>
    </div>
  );
};

/* SAME UI AS MAIN DASHBOARD */
const StatCard = ({ title, value, icon }) => (
  <div className="relative bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    
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

export default ApproverDashboard;