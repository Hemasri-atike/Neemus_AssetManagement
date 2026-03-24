import React from "react";
import Navbar from "../../pages/Navbar";
import Sidebar from "../sidebar/Sidebar";

const Reports = () => {
  const data = [
    {
      id: 1,
      asset: "Line Potential Transformer PT V-33000/110",
      subNumber: 1,
      assetClass: "NITROGEN PLANT",
      description: "100495",
      additional: "Devajit Jaradhara",
      custodianId: "ERP",
      custodianName: "SM(IIS)",
      location: "08-Jan-2025",
      locationDesc: "Rejected",
      status: "Rejected",
    },
    {
      id: 2,
      asset: "A4 Size Scanner - HP Scanjet G3110",
      subNumber: 1,
      assetClass: "FIELD OFFICE",
      description: "100495",
      additional: "Devajit Jaradhara",
      custodianId: "ERP",
      custodianName: "SM(IIS)",
      location: "08-Jan-2025",
      locationDesc: "Approved",
      status: "Approved",
    },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-600";
      case "Requested":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Sidebar />

      {/* Main Content */}
      <div className=" mt-16 p-8">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Print QR Codes for Selected Asset
        </h1>

        {/* Report Card */}
        <div className="bg-white border border-blue-200 rounded-xl shadow-sm p-6">

          {/* Scrollable Table Container */}
          <div className="border rounded-lg overflow-x-auto">
            <table className="min-w-[1300px] w-full text-sm">
              
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Main Asset Number</th>
                  <th className="p-3 text-center">Sub Number</th>
                  <th className="p-3 text-left">Asset Class</th>
                  <th className="p-3 text-left">Asset Description</th>
                  <th className="p-3 text-left">Additional Description</th>
                  <th className="p-3 text-left">Custodian ID</th>
                  <th className="p-3 text-left">Custodian Name</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Location Desc</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.asset}</td>
                    <td className="p-3 text-center">{item.subNumber}</td>
                    <td className="p-3">{item.assetClass}</td>
                    <td className="p-3">{item.description}</td>
                    <td className="p-3">{item.additional}</td>
                    <td className="p-3">{item.custodianId}</td>
                    <td className="p-3">{item.custodianName}</td>
                    <td className="p-3">{item.location}</td>
                    <td className="p-3">{item.locationDesc}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-2 mt-6">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              &lt;
            </button>

            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                className={`w-8 h-8 rounded-full text-sm ${
                  p === 1
                    ? "bg-black text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}

            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              &gt;
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Reports;