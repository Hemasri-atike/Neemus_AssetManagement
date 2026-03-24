import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const AddStatus = () => {
  const navigate = useNavigate();

  const [statusName, setStatusName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    alert(`Saved: ${statusName}`);
  };

  return (
    <div className="p-6 bg-white min-h-screen">

      {/* 🔹 Top Buttons */}
      <div className="flex gap-3 mb-6 justify-end">
        <Button variant="contained" color="primary" onClick={() => navigate("/assets/status-change")} >
          Change Status
        </Button>
        {/* <Button variant="outlined" color="secondary" onClick={() => navigate("/assets/status")} >
          Cancel
        </Button> */}
      </div>
      

      {/* 🔹 Title */}
     <div className="text-2xl font-bold text-black mb-7 p-2 justify-center text-center">
      <h2 >
        Add Status
      </h2>
      </div>

      {/* 🔹 Form */}
      <div className="flex gap-10 mb-6">

        <div className="w-1/2">
          <TextField
            fullWidth
            label="Status Name *"
            value={statusName}
            onChange={(e) => setStatusName(e.target.value)}
          />
        </div>

       <div className="w-1/2">
       <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={description}
         onChange={(e) => setDescription(e.target.value)}
         sx={{
          "& textarea": {
         resize: "both",   // 🔥 allows drag resize (grip)
         }
         }}
        />
      </div>

      </div >
        
        {/* 🔹 Save Button */}
       <div className="flex gap-3 mb-6 justify-end">
        <Button variant="contained" color="primary" onClick={handleSave} >
        Save
      </Button>

     </div>
    </div>
  );
};

export default AddStatus;