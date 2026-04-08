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
    requestorComments: "Project change",
    date: "2026-04-05",
    status: "Pending Approver",
  },
  {
    assetName: "Logitech MX Master 3",
    requestorId: "EMP012",
    requestorName: "Anita Desai",
    transferTo: "Vikram Singh",
    requestorComments: "Department shift",
    date: "2026-04-07",
    status: "Pending Approver",
  },
];

const NewCustodianTransferReqList = () => {
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
    { field: "requestorComments", label: "Requestor Comments" },
    { field: "date", label: "Date" },
    { field: "status", label: "Status" },
    { field: "actions", label: "Actions" },
  ];

  const renderCustomCell = (field, row) => {
    if (field === "status") {
      return (
        <span className="status-pill status-transferred">
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
        title="New Custodian Transfer Requests List"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </Box>
  );
};

export default NewCustodianTransferReqList;
