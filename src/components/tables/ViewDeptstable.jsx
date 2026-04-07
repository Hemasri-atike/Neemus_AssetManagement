import React, { useState } from "react";
import ModernTable from "../common/ModernTable";
import { View } from "lucide-react";

const rawData = [
  {
    mainAssetNumber: "Chair",
    subNumber: 5,
    assetName: "Chair",
    requestId: "100495",
    requestName: "Devajit Jaradhara",
    comments: "Need replacement",
    assetClass: "Furniture",
    transferTo: "Employee123",
    employeeName: "Ravi Kumar",
    date: "09-Mar-2026",
    status: "Request Sent To Approver",
  },
  {
    mainAssetNumber: "Line Potential Transformer PT V-33000/",
    subNumber: 1,
    assetName: "Transformer",
    requestId: "100495",
    requestName: "Devajit Jaradhara",
    comments: "Damaged",
    assetClass: "Electrical",
    transferTo: "Employee456",
    employeeName: "Suresh",
    date: "08-Jan-2025",
    status: "Rejected",
  },
  {
    mainAssetNumber: "HP Scanjet G3110",
    subNumber: 1,
    assetName: "Scanner",
    requestId: "100495",
    requestName: "Devajit Jaradhara",
    comments: "Old device",
    assetClass: "Electronics",
    transferTo: "Employee789",
    employeeName: "Anitha",
    date: "08-Jan-2025",
    status: "Approved",
  },
];

const ViewDepts = () => {
  const [search, setSearch] = useState({});

  const handleSearch = (field, value) => {
    setSearch((prev) => ({ ...prev, [field]: value }));
  };

  const filteredData = rawData.filter((row) =>
    Object.keys(search).every((key) =>
      row[key]
        ?.toString()
        .toLowerCase()
        .includes(search[key]?.toLowerCase() || "")
    )
  );

  // ✅ Label unchanged
  const columns = [
    { field: "mainAssetNumber", label: "Department Name" },
  ];

  const renderCustomCell = (field, row) => {
    // ✅ Map Department Name → assetClass
    if (field === "mainAssetNumber") {
      return row.assetClass;
    }

    return row[field];
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <ModernTable
        title="Department List"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default ViewDepts;