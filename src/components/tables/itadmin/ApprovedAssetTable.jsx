import React, { useState } from "react";
import ModernTable from "../../common/ModernTable";

const rawData = [
  {
    asset: "Chair",
    requestId: "REQ001",
    requestorName: "Devajit Jaradhara",
    location: "NITROGEN PLANT",
    requestedQty: 5,
    requestedDate: "09-Mar-2026",
    status: "Request Sent To Approver",

    approverId: "APR1001",
    approverName: "Manager A",
    approvedQty: 5,
    adminId: "ADM001",
    adminName: "Admin One",
    adminRemarks: "Approved",
    adminDate: "10-Mar-2026",
  },
  {
    asset: "Transformer",
    requestId: "REQ002",
    requestorName: "Devajit Jaradhara",
    location: "NITROGEN PLANT",
    requestedQty: 1,
    requestedDate: "08-Jan-2025",
    status: "Rejected",

    approverId: "APR1002",
    approverName: "Manager B",
    approvedQty: 0,
    adminId: "ADM002",
    adminName: "Admin Two",
    adminRemarks: "Rejected",
    adminDate: "09-Jan-2025",
  },
  {
    asset: "Scanner",
    requestId: "REQ003",
    requestorName: "Devajit Jaradhara",
    location: "FIELD OFFICE",
    requestedQty: 1,
    requestedDate: "08-Jan-2025",
    status: "Approved",

    approverId: "APR1003",
    approverName: "Manager C",
    approvedQty: 1,
    adminId: "ADM003",
    adminName: "Admin Three",
    adminRemarks: "Approved",
    adminDate: "09-Jan-2025",
  },
];

const ApprovedAssetTable = () => {
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

  // ✅ UNIQUE fields (labels unchanged)
  const columns = [
    { field: "asset", label: "Asset Type Name" },
    { field: "requestId", label: "Requested ID" },
    { field: "requestorName", label: "Requestor Name" },
    { field: "location", label: " Requested Location" },
    { field: "approverId", label: "Approved id" },
    { field: "approverName", label: "Approver Name" },
    { field: "adminId", label: "Admin id" },
    { field: "adminName", label: " Admin Name" },
    { field: "requestedQty", label: "Requested Quantity" },
    { field: "approvedQty", label: "Approved Quantity" },
    { field: "adminRemarks", label: "Admin Remarks" },
    { field: "adminDate", label: "Date" },
  ];

  const renderCustomCell = (field, row) => {
    // ✅ Status styling inside Admin Remarks
    if (field === "adminRemarks") {
      let statusClass = "status-default";

      if (row.adminRemarks === "Approved") statusClass = "status-available";
      else if (row.adminRemarks === "Rejected")
        statusClass = "status-rejected";

      return (
        <span className={`status-pill ${statusClass}`}>
          {row.adminRemarks}
        </span>
      );
    }

    return row[field];
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <ModernTable
        title="Approved Assets"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default ApprovedAssetTable;