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


const RequestAsset = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    assetClass: "",
    asset: "",
    location: "",
    quantity: "",
  });

  const assetClasses = ["IT Equipment", "Furniture", "Electronics"];
  const assets = ["Laptop", "Desktop", "Printer", "Chair"];
  const locations = ["HYD", "Bangalore", "Chennai"];

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
  console.log(form);
  alert("Request Submitted!");

  // 🔥 Navigate to table page
  navigate("/assets/reqassettable");
};

  return (
    <Box
      sx={{
       
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
        p: 3,
      }}
    >
      <Box width="100%" maxWidth="900px">
        
        {/* 🔹 FLOATING CARD */}
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={4}>
            Asset Return
          </Typography>

          {/* 🔥 FORM ROWS */}
          <Box display="flex" flexDirection="column" gap={3}>

            {/* Asset Class */}
            <Box display="flex" alignItems="center" gap={3}>
              <Typography sx={{ width: "220px", fontWeight: 500 }}>
                Select Asset Class :
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={form.assetClass}
                onChange={(e) =>
                  handleChange("assetClass", e.target.value)
                }
              >
                {assetClasses.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Asset */}
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

          

            {/* Quantity */}
            <Box display="flex" alignItems="center" gap={3}>
              <Typography sx={{ width: "220px", fontWeight: 500 }}>
                Comments:
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="text"
                value={form.quantity}
                onChange={(e) =>
                  handleChange("quantity", e.target.value)
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

export default RequestAsset;