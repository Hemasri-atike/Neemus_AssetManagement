import React, { useState } from "react";
import ModernTable from "../common/ModernTable";

const rawData = [
  {
    asset: "Chair",
    qty: 5,
    location: "NITROGEN PLANT",
    custodianId: "100495",
    name: "Devajit Jaradhara",
    dept: "ERP",
    designation: "SM(IIS)",
    date: "09-Mar-2026",
    status: "Request Sent To Approver",
  },
  {
    asset: "Line Potential Transformer PT V-33000/",
    qty: 1,
    location: "NITROGEN PLANT",
    custodianId: "100495",
    name: "Devajit Jaradhara",
    dept: "ERP",
    designation: "SM(IIS)",
    date: "08-Jan-2025",
    status: "Rejected",
  },
  {
    asset: "HP Scanjet G3110",
    qty: 1,
    location: "FIELD OFFICE",
    custodianId: "100495",
    name: "Devajit Jaradhara",
    dept: "ERP",
    designation: "SM(IIS)",
    date: "08-Jan-2025",
    status: "Approved",
  },
];

const ReqAssetTable = () => {
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
    { field: "asset", label: "Asset Type Name" },
    { field: "qty", label: "Requested Quantity" },
    { field: "location", label: "Requested Location" },
    { field: "custodianId", label: "Custodian ID" },
    { field: "name", label: "Custodian Name" },
    { field: "dept", label: "Department" },
    { field: "designation", label: "Designation" },
    { field: "date", label: "Requested Date" },
    { field: "status", label: "Status" },
  ];

  const renderCustomCell = (field, row) => {
    if (field === "status") {
      let statusClass = "status-default";
      if (row.status === "Approved") statusClass = "status-available";
      if (row.status === "Rejected") statusClass = "status-rejected";
      if (row.status.includes("Approver")) statusClass = "status-transferred";

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

export default ReqAssetTable;