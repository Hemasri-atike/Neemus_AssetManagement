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

    // ✅ Added for mapping
    approverId: "APR1001",
    approverName: "Manager A",
    approvedRemarks: "Pending",
  },
  {
    asset: "Transformer",
    requestId: "REQ002",
    requestorName: "Devajit Jaradhara",
    location: "NITROGEN PLANT",
    department: "ERP",
    designation: "SM(IIS)",
    requestedQty: 1,
    requestedDate: "08-Jan-2025",
    status: "Rejected",

    approverId: "APR1002",
    approverName: "Manager B",
    approvedRemarks: "Not required",
  },
  {
    asset: "Scanner",
    requestId: "REQ003",
    requestorName: "Devajit Jaradhara",
    location: "FIELD OFFICE",
    department: "ERP",
    designation: "SM(IIS)",
    requestedQty: 1,
    requestedDate: "08-Jan-2025",
    status: "Approved",

    approverId: "APR1003",
    approverName: "Manager C",
    approvedRemarks: "Approved",
  },
];

const ItReqAssetTable = () => {
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

  // ❌ Labels unchanged
  const columns = [
    { field: "asset", label: "Asset Type Name" },
    { field: "requestId", label: "Requested ID" },
    { field: "requestorName", label: "Requestor Name" },
    { field: "location", label: " Requested Location" },
    { field: "department", label: "Approved id" },
    { field: "designation", label: "Approver Name" },
    { field: "requestedQty", label: "Approved Remarks" },
    { field: "requestedDate", label: " Date" },
    { field: "status", label: "view" },
  ];

  const renderCustomCell = (field, row) => {

    // ✅ Approved ID
    if (field === "department") {
      return row.approverId;
    }

    // ✅ Approver Name
    if (field === "designation") {
      return row.approverName;
    }

    // ✅ Approved Remarks
    if (field === "requestedQty") {
      return row.approvedRemarks;
    }

    // ✅ View column (buttons)
    if (field === "status") {
      return (
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn-view">View</button>
          <button className="btn-edit">Edit</button>
        </div>
      );
    }

    return row[field];
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <ModernTable
        title="Requested Assets"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default ItReqAssetTable;