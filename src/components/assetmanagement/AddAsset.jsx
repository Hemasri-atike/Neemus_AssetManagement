import React, { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddAsset = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    assetId: "",
    name: "",
    category: "",
    department: "",
    vendor: "",
    cost: "",
    status: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing data
    const existingData =
      JSON.parse(localStorage.getItem("assets")) || [];

    // Add new asset
    const newData = [...existingData, { id: Date.now(), ...form }];

    // Save to localStorage
    localStorage.setItem("assets", JSON.stringify(newData));

    // Redirect to table page
    navigate("/assets/list");

  };

  return (
    <div className="p-6">
      <Paper className="p-6 rounded-2xl shadow-md max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Add Asset</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <TextField label="Asset ID" name="assetId" onChange={handleChange} required />
          <TextField label="Name" name="name" onChange={handleChange} required />
          <TextField label="Category" name="category" onChange={handleChange} />
          <TextField label="Department" name="department" onChange={handleChange} />
          <TextField label="Vendor" name="vendor" onChange={handleChange} />
          <TextField label="Cost" name="cost" onChange={handleChange} />
          <TextField label="Status" name="status" onChange={handleChange} />
          <TextField label="Location" name="location" onChange={handleChange} />

          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <Button variant="outlined" onClick={() => navigate("/assets/add-asset")}>
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              Save
            </Button>
          </div>

        </form>
      </Paper>
    </div>
  );
};

export default AddAsset;