import React, { useState } from "react";
import ModernTable from "../common/ModernTable";

const rawData = [
  {
    assetName: "Chair",
    requestId: "REQ001",
    requestorName: "Devajit Jaradhara",
    requestedLocation: "NITROGEN PLANT",
    approverId: "APR1001",
    approverName: "Manager A",
    approverRemarks: "Approved",
    approvedDate: "10-Mar-2026",
    status: "Approved",
  },
  {
    assetName: "Line Potential Transformer PT V-33000/",
    requestId: "REQ002",
    requestorName: "Devajit Jaradhara",
    requestedLocation: "NITROGEN PLANT",
    approverId: "APR1002",
    approverName: "Manager B",
    approverRemarks: "Rejected - Not required",
    approvedDate: "09-Jan-2025",
    status: "Rejected",
  },
  {
    assetName: "HP Scanjet G3110",
    requestId: "REQ003",
    requestorName: "Devajit Jaradhara",
    requestedLocation: "FIELD OFFICE",
    approverId: "APR1003",
    approverName: "Manager C",
    approverRemarks: "Approved",
    approvedDate: "09-Jan-2025",
    status: "Approved",
  },
];

const AppLocTransfer = () => {
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
    { field: "assetName", label: "Asset Name" },
    { field: "requestId", label: "Requested ID" },
    { field: "requestorName", label: "Requestor Name" },
    { field: "requestedLocation", label: "Requested Location" },
    { field: "approverId", label: "Approver ID" },
    { field: "approverName", label: "Approver Name" },
    { field: "approverRemarks", label: "Approver Remarks" },
    { field: "approvedDate", label: "Date" },
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
        title="Location Transfer Requests"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default AppLocTransfer;