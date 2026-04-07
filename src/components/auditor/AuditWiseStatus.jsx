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
import AudWiseStatus from "../tables/AudWiseStatus";

const AuditWiseStatusPage = () => {
  const [auditName, setAuditName] = useState("");
  const [status, setStatus] = useState("");
  const [auditDate, setAuditDate] = useState("");

  const statusList = ["Good", "Scrap", "Damaged"];

  const handleSearch = () => {
    console.log({
      auditName,
      status,
      auditDate,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        background: "#f4f6f8",
        p: 3,
      }}
    >
      <Box width="100%" maxWidth="1100px" mx="auto">

        {/* 🔹 CARD */}
        <RequestFormCard>
          <Typography variant="h6" mb={3} sx={{ fontWeight: 700 }}>
            Asset Status As Per Auditing
          </Typography>

          <Box display="flex" flexDirection="column" gap={3}>

            {/* 🔹 Row 1 */}
            <Box display="flex" alignItems="center" gap={3}>
              {/* Audit Name */}
              <Typography sx={{ width: "150px", fontWeight: 500 }}>
                Audit Name :
              </Typography>

              <TextField
                size="small"
                value={auditName}
                onChange={(e) => setAuditName(e.target.value)}
                sx={{ width: 250 }}
              />

              {/* Status */}
              <Typography sx={{ width: "80px", fontWeight: 500 }}>
                Status :
              </Typography>

              <TextField
                select
                size="small"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={{ width: 200 }}
              >
                {statusList.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>

              {/* 🔍 Search */}
              <IconButton color="primary" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </Box>

            {/* 🔹 Row 2 */}
            {/* <Box display="flex" alignItems="center" gap={3}>
              <Typography sx={{ width: "150px", fontWeight: 500 }}>
                Audit Date :
              </Typography>

              <TextField
                type="date"
                size="small"
                value={auditDate}
                onChange={(e) => setAuditDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ width: 200 }}
              />
            </Box> */}

          </Box>
        </RequestFormCard>

        {/* 🔹 TABLE */}
        <Box mt={4}>
          <AudWiseStatus />
        </Box>

      </Box>
    </Box>
  );
};

export default AuditWiseStatusPage;