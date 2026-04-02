import React, { useState } from "react";
import ModernTable from "../common/ModernTable";

const rawData = [
  {
    mainAssetNumber: "Chair",
    subNumber: 5,
    assetName: "Chair",
    requestedLocation: "NITROGEN PLANT",
    custodianId: "100495",
    custodianName: "Devajit Jaradhara",
    dept: "ERP",
    designation: "SM(IIS)",
    comments: "Condition not good",
    date: "09-Mar-2026",
    status: "Request Sent To Approver",
  },
  {
    mainAssetNumber: "Line Potential Transformer PT V-33000/",
    subNumber: 1,
    assetName: "Transformer",
    requestedLocation: "NITROGEN PLANT",
    custodianId: "100495",
    custodianName: "Devajit Jaradhara",
    dept: "ERP",
    designation: "SM(IIS)",
    comments: "Condition not good",
    date: "08-Jan-2025",
    status: "Rejected",
  },
  {
    mainAssetNumber: "HP Scanjet G3110",
    subNumber: 1,
    assetName: "Scanner",
    requestedLocation: "FIELD OFFICE",
    custodianId: "100495",
    custodianName: "Devajit Jaradhara",
    dept: "ERP",
    designation: "SM(IIS)",
    comments: "Condition good",
    date: "08-Jan-2025",
    status: "Approved",
  },
];

const ReqLocTable = () => {
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
    { field: "mainAssetNumber", label: "Main Asset Number" },
    { field: "subNumber", label: "Sub Number" },
    { field: "assetName", label: "Asset Name" },
    { field: "custodianId", label: "Custodian ID" },
    { field: "custodianName", label: "Custodian Name" },
    { field: "dept", label: "Custodian Department" },
    { field: "designation", label: "Designation" },
    { field: "requestedLocation", label: "Requested Location" },
    { field: "comments", label: "Comments" },
    { field: "date", label: "Date" },
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

export default ReqLocTable;