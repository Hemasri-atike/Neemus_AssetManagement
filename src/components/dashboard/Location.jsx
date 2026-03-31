import React, { useEffect, useState } from "react";
import AssetMap from "../test/AssetMap";

const Location = () => {
  const [assets, setAssets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAssets = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/assets");
      const data = await res.json();
      setAssets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div className="p-6 space-y-6 relative">
      <h2 className="text-xl font-semibold">Asset Locations</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* ✅ Selected Details */}
         {selected && (
  <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md space-y-3">
    
    {/* 🔹 Asset Info */}
    <div className="flex justify-between text-sm">
      <p>
        <span className="font-semibold text-blue-400">Asset ID:</span>{" "}
        {selected.assetId || "-"}
      </p>
      <p>
        <span className="font-semibold text-blue-400">Asset Desc:</span>{" "}
        {selected.AssetDesc|| "-"}
      </p>
    </div>

    {/* 🔹 Location Info */}
    <div className="flex justify-between text-sm">
      <p>
        <span className="font-semibold text-blue-400">Location:</span>{" "}
        {selected.location || "-"}
      </p>
      <p>
        <span className="font-semibold text-blue-400">Location Desc:</span>{" "}
        {selected.locationDesc || "-"}
      </p>
    </div>

    {/* 🔹 Coordinates */}
    <div className="flex justify-between text-sm">
      <p>
        <span className="font-semibold text-blue-400">Lat:</span>{" "}
        {selected.latitude || "-"}
      </p>
      <p>
        <span className="font-semibold text-blue-400">Lng:</span>{" "}
        {selected.longitude || "-"}
      </p>
    </div>

  </div>
)}

        

          {/* ✅ 🔥 Floating Legend */}
         {/* ✅ 🔥 Top Legend */}
<div className="flex gap-6 items-start">
  
  {/* ✅ LEFT: LEGEND */}
  <div
    className="w-64 shrink-0
    bg-white/70 backdrop-blur-xl
    border border-white/30
    rounded-2xl shadow-xl
    p-4 text-sm space-y-3
    h-fit"
  >
    <p className="font-semibold text-gray-700 mb-2">
      Status of Assets
    </p>

    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
      <span>AVAL (Available Assets)</span>
    </div>

    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
      <span>DMG (Damaged Assets)</span>
    </div>

    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
      <span>LTRF (Location Transfer)</span>
    </div>

    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
      <span>DMG-REP (Repaired Assets)</span>
    </div>
  </div>

  {/* ✅ RIGHT: MAP */}
  <div className="flex-1">
    <AssetMap
      assets={assets}
      selected={selected}
      setSelected={setSelected}
    />
  </div>

</div>
        </>
      )}
    </div>
  );
};

export default Location;