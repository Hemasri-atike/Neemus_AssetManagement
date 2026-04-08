import React, { useState } from "react";
import ModernTable from "../../common/ModernTable";

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

const ViewAllRequests = () => {
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
    { field: "asset", label: "Request Type" },
    { field: "requestId", label: "Asset Name " },
    { field: "requestorName", label: "Request Date" },
    { field: "location", label: "Status" },
    { field: "requestedQty", label: "View" },
  ];

  const renderCustomCell = (field, row) => {

    // ✅ Asset Name (show asset instead of requestId)
    if (field === "requestId") {
      return row.asset;
    }

    // ✅ Request Date
    if (field === "requestorName") {
      return row.approvedDate;
    }

    // ✅ Status column
    if (field === "location") {
      let statusClass = "status-default";

      if (row.status === "Approved") statusClass = "status-available";
      else if (row.status === "Rejected") statusClass = "status-rejected";

      return (
        <span className={`status-pill ${statusClass}`}>
          {row.status}
        </span>
      );
    }

    // ✅ View column (buttons)
    if (field === "requestedQty") {
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
        title="View All Requests"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default ViewAllRequests;