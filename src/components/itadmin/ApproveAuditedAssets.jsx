import React, { useState } from "react";
import { Box, TextField, MenuItem, Typography, IconButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

import RequestFormCard from "../common/RequestFormCard";

const ApproveAuditedAssets = () => {
  const [audit, setAudit] = useState("");
  const navigate = useNavigate();

  const auditList = ["test audit", "audit 1", "audit 2"];

  const handleSearch = () => {
    navigate("/ITApproveAuditedAssets");
  };

  const handleAdd = () => {
    navigate("/ITAddApproveAuditedAssets");
  };

  return (
    <Box sx={{ background: "#f4f6f8", p: 3 }}>
      <Box maxWidth="1100px" mx="auto">

        <RequestFormCard>
          <Typography variant="h6" mb={3} sx={{ fontWeight: 700 }}>
            Approve Audited Assets
          </Typography>

          <Box display="flex" alignItems="center" gap={3}>
            <Typography sx={{ width: "150px" }}>Select Audit</Typography>

            <TextField
              select
              size="small"
              value={audit}
              onChange={(e) => setAudit(e.target.value)}
              sx={{ width: 250 }}
            >
              {auditList.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </TextField>

            <IconButton color="primary" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>

          <Box mt={3}>
            <Button variant="contained" onClick={handleAdd}>Add</Button>
          </Box>

        </RequestFormCard>

      </Box>
    </Box>
  );
};

export default ApproveAuditedAssets;
