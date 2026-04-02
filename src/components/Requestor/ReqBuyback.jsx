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

const ReqBuyback = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    asset: "",
    comments: "",
  });

  const assets = ["Laptop", "Desktop", "Printer", "Chair"];

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // ✅ Validation
    if (!form.asset || !form.comments) {
      alert("Please fill all fields");
      return;
    }

    console.log("Submitted Data:", form);

    alert("Request Submitted!");

    // ✅ Navigate to table page
    navigate("/assets/reqbuybacktable");
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
        
        <RequestFormCard title="Request for Buyback">
          {/* 🔥 FORM */}
          <Box display="flex" flexDirection="column" gap={3}>

            {/* Asset Dropdown */}
            <Box display="flex" alignItems="center" gap={3}>
              <Typography sx={{ width: "220px", fontWeight: 500 }}>
                Select Asset :
              </Typography>

              <TextField
                select
                fullWidth
                size="small"
                value={form.asset}
                onChange={(e) =>
                  handleChange("asset", e.target.value)
                }
              >
                {assets.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Comments Field (Large Textarea) */}
            <Box display="flex" alignItems="flex-start" gap={3}>
              <Typography
                sx={{ width: "220px", fontWeight: 500, mt: 1 }}
              >
                Comments :
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Enter comments..."
                value={form.comments}
                onChange={(e) =>
                  handleChange("comments", e.target.value)
                }
              />
            </Box>

          </Box>
        </RequestFormCard>

        {/* 🔹 BUTTON */}
        <Box textAlign="center" mt={4}>
          <SendRequestButton onClick={handleSubmit} label="Send Request" />
        </Box>

      </Box>
    </Box>
  );
};

export default ReqBuyback;