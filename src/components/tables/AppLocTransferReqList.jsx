import React, { useState } from "react";
import ModernTable from "../common/ModernTable";
import { useNavigate } from "react-router-dom";

const rawData = [
  {
    assetName: "Chair",
    requestId: "REQ001",
    requestorName: "Devajit Jaradhara",
    department: "ERP",
    designation: "SM(IIS)",
    requestedLocation: "NITROGEN PLANT",
    requestedComments: "Need relocation",
    requestedDate: "09-Mar-2026",
    status: "Request Sent To Approver",
      view: "View",
  },
  {
    assetName: "Line Potential Transformer PT V-33000/",
    requestId: "REQ002",
    requestorName: "Devajit Jaradhara",
    department: "ERP",
    designation: "SM(IIS)",
    requestedLocation: "NITROGEN PLANT",
    requestedComments: "Urgent transfer",
    requestedDate: "08-Jan-2025",
    status: "Rejected",
      view: "View",
  },
  {
    assetName: "HP Scanjet G3110",
    requestId: "REQ003",
    requestorName: "Devajit Jaradhara",
    department: "ERP",
    designation: "SM(IIS)",
    requestedLocation: "FIELD OFFICE",
    requestedComments: "Office shift",
    requestedDate: "08-Jan-2025",
    status: "Approved",
    view: "View",
  },
];
const navigate = useNavigate();

const AppLocTransferReqList = () => {
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
    { field: "department", label: "Department" },
    { field: "designation", label: "Designation" },
    { field: "requestedLocation", label: "Requested Location" },
    { field: "requestedComments", label: "Requested Comments" },
    { field: "requestedDate", label: "Date" },
    { field: "status", label: "Status" },
    { field: "view", label: "View" }
  ];

const renderCustomCell = (field, row) => {

  // ✅ Status styling
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

  // ✅ View Button
  if (field === "view") {
    return (
      <button
        className="btn-view"
        onClick={() =>
          navigate("/viewlocationtransfer-requests", { state: row })
        }
      >
        View
      </button>
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

export default AppLocTransferReqList;