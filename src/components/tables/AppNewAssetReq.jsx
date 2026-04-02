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

const AppNewAssetReq = () => {
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

  const columns = [
    { field: "asset", label: "Asset" },
    { field: "requestId", label: "Requested ID" },
    { field: "requestorName", label: "Requestor Name" },
    { field: "location", label: "Location" },
    { field: "department", label: "Department" },
    { field: "designation", label: "Designation" },
    { field: "requestedQty", label: "Requested Qty" },
    { field: "requestedDate", label: "Requested Date" },
    { field: "status", label: "Status" },
  ];

  const renderCustomCell = (field, row) => {
    if (field === "status") {
      let statusClass = "status-default";

      if (row.status === "Approved") statusClass = "status-available";
      else if (row.status === "Rejected") statusClass = "status-rejected";
      else if (row.status.includes("Approver"))
        statusClass = "status-transferred";

      return (
        <span className={`status-pill ${statusClass}`}>
          {row.status}
        </span>
      );
    }

    return row[field];
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <ModernTable
        title="Asset Requests"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default AppNewAssetReq;