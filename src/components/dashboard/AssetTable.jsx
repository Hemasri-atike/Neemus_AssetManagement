import React from "react";

const AssetsTable = () => {
  const data = [
    { audit: "Quarterly Audit - Q1", assets: 120 },
    { audit: "IT Asset Verification", assets: 340 },
    { audit: "Warehouse Stock Audit", assets: 210 },
    { audit: "Annual Compliance Audit", assets: 705 },
  ];

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-sm border">
      {/* Grouping Hint */}
      <div className="px-6 py-3 text-sm text-gray-500 border-b">
        Drag a column header here to group by that column
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-b-2xl">
        <table className="plastic-table w-full text-sm">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left font-medium first:rounded-tl-2xl">
                Audit Name
              </th>
              <th className="px-6 py-3 text-left font-medium last:rounded-tr-2xl">
                No of Assets
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-800">
                  {row.audit}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {row.assets}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetsTable;