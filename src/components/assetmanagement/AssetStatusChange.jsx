import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const AssetStatusChange = () => {
  const navigate = useNavigate();

  // 🔹 Dummy Asset List
  const assetList = [
    {
      id: "60050011",
      sub: "0",
      class: "6005",
      description: "A3 Size Multi Function Printing Device (HP M5025)",
      status: "Asset Avbl but Damaged",
      location: "IT DEPARTMENT (NR11)",
      qty: "1.000 NOS",
      date: "2014-12-09"
    },
    {
      id: "60050012",
      sub: "0",
      class: "6005",
      description: "Printer Cum Scanner",
      status: "Asset Available",
      location: "ADMIN",
      qty: "2.000 NOS",
      date: "2015-01-01"
    }
  ];

  const [selectedAsset, setSelectedAsset] = useState(assetList[0]);
  const [status, setStatus] = useState(selectedAsset.status);

  // 🔹 Handle Change
  const handleAssetChange = (e) => {
    const asset = assetList.find(a => a.id === e.target.value);
    setSelectedAsset(asset);
    setStatus(asset.status);
  };

  const handleSubmit = () => {
    alert(`Status updated to: ${status}`);
  };

  return (
    <div className="p-4 bg-gray-100 h-screen overflow-y-auto">

      {/* Title */}
      <h2 className="text-2xl font-bold mb-7 p-2">Asset Status Changes</h2>

      {/* Select Asset */}
      <div className="mb-5 flex items-center gap-3">
        <label className="font-medium">Select Asset:</label>

        <select
          className="border p-1 rounded"
          value={selectedAsset.id}
          onChange={handleAssetChange}
        >
          {assetList.map(asset => (
            <option key={asset.id} value={asset.id}>
              {asset.id}
            </option>
          ))}
        </select>
      </div>

      {/* Asset Details */}
      <div className="bg-white p-4 border rounded mb-4 grid grid-cols-2 gap-4 text-sm">

      <div>
  <p className="font-semibold">
    Main Asset Number:{" "}
    <span className="text-blue-600 font-semibold">
      {selectedAsset.id}
    </span>
  </p>

  <p className="font-semibold">
    Asset Class:{" "}
    <span className="text-blue-600 font-semibold">
      {selectedAsset.class}
    </span>
  </p>

  <p className="font-semibold">
    Current Location:{" "}
    <span className="text-blue-600 font-semibold">
      {selectedAsset.location}
    </span>
  </p>

  <p className="font-semibold">
    Available Quantity:{" "}
    <span className="text-blue-600 font-semibold">
      {selectedAsset.qty}
    </span>
  </p>

  <p className="font-semibold">
    Capitalization Date:{" "}
    <span className="text-blue-600 font-semibold">
      {selectedAsset.date}
    </span>
  </p>
</div>

        <div>
  <p className="font-semibold">
    Sub Number:{" "}
    <span className="text-blue-600 font-semibold">
      {selectedAsset.sub}
    </span>
  </p>

  <p className="font-semibold">
    Description:{" "}
    <span className="text-blue-600 font-semibold">
      {selectedAsset.description}
    </span>
  </p>

  <p className="font-semibold">
    Status:{" "}
    <span className="text-blue-600 font-semibold">
      {selectedAsset.status}
    </span>
  </p>
</div>

      </div>

      {/* Change Status */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium">Asset Status:</label>

        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Asset Available</option>
          <option>Asset Avbl but Damaged</option>
          <option>Asset Parked</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
       
        {/* <button
          onClick={() => navigate("/assets/status-change")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button> */}
      </div>

      {/* Table */}
      <div className="bg-white p-3 border rounded">

        <table className="plastic-table w-full border text-sm">
          <thead>
            <tr>
              <th className="border border-white/15 p-2">Main Asset Number</th>
              <th className="border border-white/15 p-2">Sub Number</th>
              <th className="border border-white/15 p-2">Asset Class</th>
              <th className="border border-white/15 p-2">Asset Description</th>
              <th className="border border-white/15 p-2">Asset Status</th>
            </tr>
          </thead>

          <tbody>
            {assetList.map((asset) => (
              <tr key={asset.id}>
                <td className="border p-2">{asset.id}</td>
                <td className="border p-2">{asset.sub}</td>
                <td className="border p-2">{asset.class}</td>
                <td className="border p-2">{asset.description}</td>
                <td className="border p-2">{asset.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default AssetStatusChange;