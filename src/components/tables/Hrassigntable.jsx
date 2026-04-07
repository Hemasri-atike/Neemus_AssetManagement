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

const Hrassigntable = () => {
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

  // ❌ DO NOT CHANGE LABELS
  const columns = [
    { field: "asset", label: "Department" },
    { field: "requestId", label: "Employee ID" },
    { field: "requestorName", label: "Name" },
    { field: "location", label: "Location" },
    { field: "designation", label: "Designation" },
    { field: "requestedQty", label: "Email" },
    { field: "requestedDate", label: "Actions" },
  ];

  const renderCustomCell = (field, row) => {
    // ✅ Department (mapped from actual department field)
    if (field === "asset") {
      return row.department;
    }

    // ✅ Email (generate or map properly)
    if (field === "requestedQty") {
      return `${row.requestorName.toLowerCase().replace(/\s+/g, ".")}@company.com`;
    }

    // ✅ Actions (mapped from requestedDate field)
    if (field === "requestedDate") {
      return (
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn-view">Approve</button>
          <button className="btn-edit">Reject</button>
        </div>
      );
    }

    return row[field];
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <ModernTable
        title="HR Assign Table"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default Hrassigntable;