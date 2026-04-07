import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import RequestFormCard from "../common/RequestFormCard";
import AudByAsset from "../tables/AudByAsset";

const AssetByAudit = () => {
  const [audit, setAudit] = useState("");

  const auditList = ["test audit", "audit 1", "audit 2"];

  const handleSearch = () => {
    console.log("Selected Audit:", audit);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        background: "#f4f6f8",
        p: 3,
        
      }}
    >
      <Box width="100%" maxWidth="1100px" mx="auto">
        
        {/* 🔹 CARD */}
        <RequestFormCard >
            <Typography variant="h6" mb={3} sx={{ fontWeight: 700 }}>
              View Assets By Audit
            </Typography>
          
          <Box display="flex" flexDirection="column" gap={3}>

            {/* 🔹 Select Audit Row */}
            <Box display="flex" alignItems="center" gap={3}>
              <Typography sx={{ width: "220px", fontWeight: 500 }}>
                Select Audit :
              </Typography>

              <TextField
                select
                fullWidth
                size="small"
                value={audit}
                onChange={(e) => setAudit(e.target.value)}
              >
                {auditList.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>

              {/* 🔍 Search Icon */}
              <IconButton color="primary" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </Box>

          </Box>
        </RequestFormCard>

        {/* 🔹 TABLE BELOW CARD */}
        <Box mt={4}>
          <AudByAsset />
        </Box>

      </Box>
    </Box>
  );
};

export default AssetByAudit;