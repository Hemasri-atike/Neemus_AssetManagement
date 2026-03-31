import React from "react";
import { useNavigate } from "react-router-dom";
import AssetStepper from "./AssetStepper";

const AddAsset = () => {
  const navigate = useNavigate();

  // ✅ Send data to backend API
  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save asset");
      }

      const result = await response.json();
      console.log("Saved:", result);

      // ✅ Navigate after success
      navigate("/assets/list");

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save asset");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Add Asset</h2>

      {/* Stepper Form */}
      <AssetStepper onSubmit={handleSubmit} />
    </div>
  );
};

export default AddAsset;