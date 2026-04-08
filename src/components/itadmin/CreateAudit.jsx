import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import RequestFormCard from "../common/RequestFormCard";
import SendRequestButton from "../common/SendRequestButton";

const CreateAudit = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    location: "",
    status: "",
    auditName: "",
    description: "",
  });

  // ✅ Dropdown data
  const locations = ["CISF", "SITE OFFICE", "PROJECT DEPARTMENT"];
  const statusList = ["Active", "InActive"];

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.location || !form.auditName) {
      alert("Please fill required fields");
      return;
    }

    console.log("Audit Created:", form);

    // 🔥 Navigate to table page
    navigate("/ITCreateAudit");
  };

  return (
    <Box
      sx={{
        display: "flex",
        background: "#f4f6f8",
        p: 3,
      }}
    >
      <Box width="100%" maxWidth="1000px" mx="auto">

        <RequestFormCard>
          <Typography variant="h6" mb={3} sx={{ fontWeight: 700 }}>
            Create Audit
          </Typography>

          <Box display="flex" gap={5}>

            {/* 🔹 LEFT SIDE */}
            <Box flex={1}>

              {/* Location */}
              <Box display="flex" alignItems="center" mb={3}>
                <Typography sx={{ width: "200px", fontWeight: 500 }}>
                  Location *
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

              {/* Audit Status */}
              <Box display="flex" alignItems="center">
                <Typography sx={{ width: "200px", fontWeight: 500 }}>
                  Audit Status
                </Typography>

                <TextField
                  select
                  fullWidth
                  size="small"
                  value={form.status}
                  onChange={(e) =>
                    handleChange("status", e.target.value)
                  }
                >
                  {statusList.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

            </Box>

            {/* 🔹 RIGHT SIDE */}
            <Box flex={1}>

              {/* Audit Name */}
              <Box display="flex" alignItems="center" mb={3}>
                <Typography sx={{ width: "200px", fontWeight: 500 }}>
                  Audit Name *
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  value={form.auditName}
                  onChange={(e) =>
                    handleChange("auditName", e.target.value)
                  }
                />
              </Box>

              {/* Description */}
              <Box display="flex" alignItems="center">
                <Typography sx={{ width: "200px", fontWeight: 500 }}>
                  Audit Description
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    handleChange("description", e.target.value)
                  }
                />
              </Box>

            </Box>
          </Box>

          {/* 🔹 SAVE BUTTON */}
          <Box textAlign="center" mt={4}>
            <SendRequestButton
              onClick={handleSave}
              label="Save"
            />
          </Box>

        </RequestFormCard>

      </Box>
    </Box>
  );
};

export default CreateAudit;