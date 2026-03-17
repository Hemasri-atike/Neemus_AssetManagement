import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../../pages/Navbar";

const RequestAsset = () => {
  const requests = [
    {
      asset: "Line Potential Transformer PT V-33000 / 110",
      qty: 1,
      location: "NITROGEN PLANT",
      custodianId: "100495",
      custodianName: "Devajit Jaradhara",
      dept: "ERP",
      designation: "SM(IIS)",
      date: "08-Jan-2025",
      status: "Rejected",
    },
    {
      asset: "A4 Size Scanner - HP Scanjet G3110 Photo Scanner",
      qty: 1,
      location: "FIELD OFFICE",
      custodianId: "100495",
      custodianName: "Devajit Jaradhara",
      dept: "ERP",
      designation: "SM(IIS)",
      date: "08-Jan-2025",
      status: "Approved",
    },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-600";
      case "Rejected":
        return "bg-rose-100 text-rose-600";
      case "Requested":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100">
      <Navbar />
      <Sidebar />

      <div className="ml-64 mt-16 p-10">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800">
            Request Asset
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Submit new asset access requests and track approval status
          </p>
        </div>

        {/* Floating Custodian Card */}
        <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-8 mb-10 transition hover:shadow-2xl hover:-translate-y-1 duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-t-3xl"></div>

          <div className="grid grid-cols-3 gap-8 text-sm text-slate-600 mt-4">
            <Info label="Custodian Name" value="Devajit Jaradhara" />
            <Info label="Department" value="ERP" />
            <Info label="Custodian ID" value="10049" />
            <Info label="Designation" value="SM(IIS)" />
            <Info label="Reporting Authority" value="10099" />
            <Info label="Email" value="devajit@email.com" />
          </div>
        </div>

        {/* Floating Form Card */}
        <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-10 mb-12 transition hover:shadow-2xl hover:-translate-y-1 duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-3xl"></div>

          <h2 className="text-xl font-semibold text-slate-800 mb-8">
            New Request
          </h2>

          <div className="grid grid-cols-4 gap-8">
            <FloatingInput label="Select Asset Class" />
            <FloatingInput label="Quantity" type="number" />
            <FloatingInput label="Select Location" />
            <FloatingInput label="Select Asset" />
          </div>

          <div className="flex justify-end mt-10">
            <button className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-medium shadow-lg hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
              Send Request
            </button>
          </div>
        </div>

        {/* Floating Table Card */}
        <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-8 transition hover:shadow-2xl hover:-translate-y-1 duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-t-3xl"></div>

          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Request History
          </h2>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-slate-600 uppercase text-xs tracking-wider border-b">
                  <th className="p-3">Asset</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Custodian ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Dept</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((req, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none hover:bg-white/60 transition duration-200"
                  >
                    <td className="p-3 font-semibold text-slate-700">
                      {req.asset}
                    </td>
                    <td className="p-3">{req.qty}</td>
                    <td className="p-3">{req.location}</td>
                    <td className="p-3">{req.custodianId}</td>
                    <td className="p-3">{req.custodianName}</td>
                    <td className="p-3">{req.dept}</td>
                    <td className="p-3">{req.designation}</td>
                    <td className="p-3">{req.date}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                          req.status
                        )}`}
                      >
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Floating Input */
const FloatingInput = ({ label, type = "text" }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-slate-600 mb-2">
      {label}
    </label>
    <input
      type={type}
      placeholder="Enter here..."
      className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-900 outline-none transition shadow-sm"
    />
  </div>
);

/* Info Field */
const Info = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs text-slate-500">{label}</span>
    <span className="font-semibold text-slate-700 mt-1">{value}</span>
  </div>
);

export default RequestAsset;