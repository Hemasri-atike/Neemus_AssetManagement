import React, { useState } from "react";
import ModernTable from "../common/ModernTable";

const rawData = [
  {
    asset: "Chair",
    requestId: "REQ001",
    requestorName: "Devajit Jaradhara",
    location: "NITROGEN PLANT",
    department: "ERP",
    designation: "SM(IIS)",
    requestedQty: 5,
    requestedDate: "09-Mar-2026",
    status: "Request Sent To Approver",
  },
  {
    asset: "Line Potential Transformer PT V-33000/",
    requestId: "REQ002",
    requestorName: "Devajit Jaradhara",
    location: "NITROGEN PLANT",
    department: "ERP",
    designation: "SM(IIS)",
    requestedQty: 1,
    requestedDate: "08-Jan-2025",
    status: "Rejected",
  },
  {
    asset: "HP Scanjet G3110",
    requestId: "REQ003",
    requestorName: "Devajit Jaradhara",
    location: "FIELD OFFICE",
    department: "ERP",
    designation: "SM(IIS)",
    requestedQty: 1,
    requestedDate: "08-Jan-2025",
    status: "Approved",
  },
];

const DeptwiseCusttable = () => {
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

  // ✅ Labels unchanged
  const columns = [
    { field: "asset", label: "Custodian id" },
    { field: "requestId", label: "Custodian Name" },
    { field: "requestorName", label: "Department Name" },
    { field: "designation", label: "Designation" },
  ];

  const renderCustomCell = (field, row) => {
    // ✅ Custodian ID → use requestId
    if (field === "asset") {
      return row.requestId;
    }

    // ✅ Custodian Name → use requestorName
    if (field === "requestId") {
      return row.requestorName;
    }

    // ✅ Department Name → use department
    if (field === "requestorName") {
      return row.department;
    }

    return row[field];
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <ModernTable
        title="Department-wise Custodian Table"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default DeptwiseCusttable;