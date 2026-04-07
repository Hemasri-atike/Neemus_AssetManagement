import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

import RequestFormCard from "../common/RequestFormCard";
import SendRequestButton from "../common/SendRequestButton";

const AssetAudit = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    location: "",
    audit: "",
  });

  // ✅ Correct dropdown data
  const locations = ["NITROGEN PLANT", "ERP CELL", "HYD"];
  const audits = ["Safety Audit", "Asset Audit", "Internal Audit"];

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.location || !form.audit) {
      alert("Please select required fields");
      return;
    }

    console.log(form);

    // 🔥 Navigate
    navigate("/ViewAudits");
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
      <Box width="100%" maxWidth="900px" mx="auto">
        
        <RequestFormCard >
          <Typography variant="h6" mb={3} sx={{ fontWeight: 700 }}>
             Perform Asset Audit 
          </Typography>
          
          <Box display="flex" flexDirection="column" gap={3}>

            {/* ✅ Select Location */}
            <Box display="flex" alignItems="center" gap={3}>
              <Typography sx={{ width: "220px", fontWeight: 500 }}>
                Select Location *
              </Typography>

              <TextField
                select
                fullWidth
                size="small"
                value={form.location}
                onChange={(e) =>
                  handleChange("location", e.target.value)
                }
              >
                {locations.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* ✅ Select Audit */}
            <Box display="flex" alignItems="center" gap={3}>
              <Typography sx={{ width: "220px", fontWeight: 500 }}>
                Select Audit *
              </Typography>

              <TextField
                select
                fullWidth
                size="small"
                value={form.audit}
                onChange={(e) =>
                  handleChange("audit", e.target.value)
                }
              >
                {audits.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

          </Box>
          {/* ✅ Button */}
        <Box textAlign="center" mt={4}>
          <SendRequestButton
            onClick={handleSubmit}
            label="Start Audit"
          />
        </Box>
        </RequestFormCard>

        

      </Box>
    </Box>
  );
};

export default AssetAudit;


