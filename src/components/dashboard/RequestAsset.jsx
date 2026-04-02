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
        
        <RequestFormCard title="Request Asset">
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

            {/* Location */}
            <Box display="flex" alignItems="center" gap={3}>
              <Typography sx={{ width: "220px", fontWeight: 500 }}>
                Select Location :
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

            {/* Quantity */}
            <Box display="flex" alignItems="center" gap={3}>
              <Typography sx={{ width: "220px", fontWeight: 500 }}>
                Quantity :
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  handleChange("quantity", e.target.value)
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

export default RequestAsset;