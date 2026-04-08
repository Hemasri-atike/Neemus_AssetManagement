import React, { useState } from "react";
import ModernTable from "../../common/ModernTable";
import { Box } from "@mui/material";

const rawData = [
  {
    assetTypeName: "Laptop",
    reqId: "REQ-001",
    reqName: "Rahul Sharma",
    dept: "IT",
    designation: "Software Engineer",
    requestedQuantity: 1,
    approvedQuantity: 1,
    reqDate: "2026-04-01",
    reqStatus: "Approved",
  },
  {
    assetTypeName: "Monitor",
    reqId: "REQ-002",
    reqName: "Priya Singh",
    dept: "HR",
    designation: "HR Manager",
    requestedQuantity: 2,
    approvedQuantity: 1,
    reqDate: "2026-04-03",
    reqStatus: "Pending",
  },
  {
    assetTypeName: "Keyboard",
    reqId: "REQ-003",
    reqName: "Amit Kumar",
    dept: "Finance",
    designation: "Accountant",
    requestedQuantity: 5,
    approvedQuantity: 0,
    reqDate: "2026-04-05",
    reqStatus: "Rejected",
  },
];

const ApprovedRequestedAssets = () => {
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
    { field: "assetTypeName", label: "Assettype name" },
    { field: "reqId", label: "req id" },
    { field: "reqName", label: "Req Name" },
    { field: "dept", label: "Dept" },
    { field: "designation", label: "Designation" },
    { field: "requestedQuantity", label: "Requested Quantity" },
    { field: "approvedQuantity", label: "Approved Quantity" },
    { field: "reqDate", label: "Req date" },
    { field: "reqStatus", label: "Req status" },
  ];

  const renderCustomCell = (field, row) => {
    if (field === "reqStatus") {
      let statusClass = "status-default";
      if (row.reqStatus === "Approved") statusClass = "status-available";
      else if (row.reqStatus === "Rejected") statusClass = "status-rejected";
      else if (row.reqStatus === "Pending") statusClass = "status-pending";

      return (
        <span className={`status-pill ${statusClass}`}>
          {row.reqStatus}
        </span>
      );
    }
    return row[field];
  };

  return (
    <Box sx={{ p: 3 }}>
      <ModernTable
        title="Approved Requested Assets"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </Box>
  );
};

export default ApprovedRequestedAssets;
