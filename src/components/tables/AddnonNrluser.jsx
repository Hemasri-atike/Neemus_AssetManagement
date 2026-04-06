import React, { useState } from "react";
import ModernTable from "../common/ModernTable";
import { Add } from "@mui/icons-material";

const rawData = [
  {
    asset: "Chair",
    requestId: "REQ001",
    requestorName: "Devajit Jaradhara",
    location: "NITROGEN PLANT",
    requestedQty: 5,
    approverId: "APR1001",
    approverName: "Manager A",
    approvedRemarks: "Approved for use",
    approvedDate: "10-Mar-2026",
    status: "Approved",
  },
  {
    asset: "Line Potential Transformer PT V-33000/",
    requestId: "REQ002",
    requestorName: "Devajit Jaradhara",
    location: "NITROGEN PLANT",
    requestedQty: 1,
    approverId: "APR1002",
    approverName: "Manager B",
    approvedRemarks: "Not required",
    approvedDate: "09-Jan-2025",
    status: "Rejected",
  },
  {
    asset: "HP Scanjet G3110",
    requestId: "REQ003",
    requestorName: "Devajit Jaradhara",
    location: "FIELD OFFICE",
    requestedQty: 1,
    approverId: "APR1003",
    approverName: "Manager C",
    approvedRemarks: "Approved",
    approvedDate: "09-Jan-2025",
    status: "Approved",
  },
];

const AddnonNrluser = () => {
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

  // ❌ LABELS NOT CHANGED
  const columns = [
    { field: "asset", label: "User id" },
    { field: "requestId", label: "User Name" },
    { field: "requestorName", label: "Email" },
    { field: "location", label: "Actions" },
  ];

  const renderCustomCell = (field, row) => {
    // ✅ Email column (mapped from requestorName)
    if (field === "requestorName") {
      return `${row.requestorName.toLowerCase().replace(/\s+/g, ".")}@example.com`;
    }

    // ✅ Actions column
    if (field === "location") {
      return (
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn-view">Delete</button>
          <button className="btn-edit">Edit</button>
        </div>
      );
    }

    // ✅ Default mapping
    return row[field];
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <ModernTable
        title="Non-NRL Users List"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default AddnonNrluser;