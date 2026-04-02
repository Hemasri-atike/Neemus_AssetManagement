import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
} from "@mui/material";

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
    navigate("/assets/reqassettable");
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
        
        {/* 🔹 FLOATING CARD */}
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={4}>
            Request for Buyback
          </Typography>

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
        </Paper>

        {/* 🔹 BUTTON */}
        <Box textAlign="center">
          <Button
            variant="contained"
            sx={{
              mt: 4,
              px: 8,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
              backgroundColor: "#000",
              "&:hover": { backgroundColor: "#333" },
            }}
            onClick={handleSubmit}
          >
            Send Request
          </Button>
        </Box>

      </Box>
    </Box>
  );
};

export default ReqBuyback;