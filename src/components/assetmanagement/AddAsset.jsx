import React from "react";
import { useNavigate } from "react-router-dom";
import AssetStepper from "./AssetStepper";

const AddAsset = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    const existingData =
      JSON.parse(localStorage.getItem("assets")) || [];

    const newData = [
      ...existingData,
      { id: Date.now(), ...formData },
    ];

    localStorage.setItem("assets", JSON.stringify(newData));

    navigate("/assets/list");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Add Asset</h2>

      {/* 🔥 Stepper Component */}
      <AssetStepper onSubmit={handleSubmit} />
    </div>
  );
};

export default AddAsset;