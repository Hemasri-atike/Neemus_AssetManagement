import React, { useState } from "react";
import ModernTable from "../common/ModernTable";

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

const AssetClassmaptable = () => {
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
    { field: "asset", label: "Roll id" },
    { field: "requestId", label: "Role name" },
    { field: "requestorName", label: "Custodian id" },
    { field: "location", label: "Created date" },
    { field: "requestedQty", label: "Requested Qty" },
    { field: "approverId", label: "status" },
    { field: "approverName", label: "Asset Class Name" },
    { field: "approvedRemarks", label: "Actions" },
   
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
        title="Approved Asset List"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default AssetClassmaptable;