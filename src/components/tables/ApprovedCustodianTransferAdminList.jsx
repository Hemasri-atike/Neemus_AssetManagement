import React, { useState } from "react";
import ModernTable from "../common/ModernTable";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const rawData = [
  {
    assetName: "Dell Latitude 5420",
    requestorId: "EMP005",
    requestorName: "Rakesh Sharma",
    transferTo: "Suresh Mehra",
    approverId: "APP001",
    approverRemarks: "Consented for project transition",
    date: "2026-04-01",
    status: "Approved",
  },
  {
    assetName: "HP LaserJet Pro",
    requestorId: "EMP015",
    requestorName: "Meena Rai",
    transferTo: "Karan Johar",
    approverId: "APP002",
    approverRemarks: "Replacement approved",
    date: "2026-04-03",
    status: "Approved",
  },
];

const ApprovedCustodianTransferAdminList = () => {
  const navigate = useNavigate();
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
    { field: "requestorId", label: "Requestor ID" },
    { field: "requestorName", label: "Requestor Name" },
    { field: "transferTo", label: "TransferTo" },
    { field: "approverId", label: "Approver ID" },
    { field: "approverRemarks", label: "Approver Remarks" },
    { field: "date", label: "Date" },
    { field: "status", label: "Status" },
    { field: "actions", label: "Actions" },
  ];

  const renderCustomCell = (field, row) => {
    if (field === "status") {
      return (
        <span className="status-pill status-available">
          {row.status}
        </span>
      );
    }

    if (field === "actions") {
      return (
        <Button
          variant="contained"
          size="small"
          startIcon={<VisibilityIcon />}
          onClick={() => navigate("/view-custodian-transfer-details", { state: row })}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            fontSize: "12px",
            background: "linear-gradient(135deg, #334155 0%, #0f172a 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #1e293b 0%, #020617 100%)",
            },
          }}
        >
          View
        </Button>
      );
    }

    return row[field];
  };

  return (
    <Box sx={{ p: 2 }}>
      <ModernTable
        title="Approved Custodian Transfer List Forwarded To Admin"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </Box>
  );
};

export default ApprovedCustodianTransferAdminList;
