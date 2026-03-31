import React, { useEffect, useState } from "react";
import AssetMap from "../test/AssetMap";

const Location = () => {
  const [assets, setAssets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPoints, setSelectedPoints] = useState([]);
 
  const [distances, setDistances] = useState([]);

  // ✅ Defined before the useEffect that uses it
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (selectedPoints.length === 2) {
      const [source, target] = selectedPoints;

      const dist = calculateDistance(
        source.latitude,
        source.longitude,
        target.latitude,
        target.longitude
      );

      setDistances((prev) => [
        ...prev,
        {
          from: source.assetId,
          to: target.assetId,
          value: dist.toFixed(2),
        },
      ]);
    }
  }, [selectedPoints]);

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

 const handleSelect = (asset) => {
  setSelected(asset);

  setSelectedPoints((prev) => {
    if (prev.length === 0) {
      return [asset]; // A (source)
    }
    return [prev[0], asset]; // always keep A, update second point
  });
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
          {/* ✅ Selected Asset Details */}
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
                  {selected.AssetDesc || "-"}
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
<button
  onClick={() => {
    setSelectedPoints([]);
    setDistances([]);
  }}
  className="mt-2 text-xs text-red-500 underline"
>
  Reset
</button>

          {/* ✅ Legend + Map */}
          <div className="flex gap-6 items-start">
            {/* LEFT: LEGEND */}
            <div className="w-64 shrink-0 bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-4 text-sm space-y-3 h-fit">
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
              {distances.length > 0 && (
  <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
    <p className="text-xs font-semibold text-gray-600">
      Distances from Source
    </p>

    {distances.map((d, index) => (
      <div key={index} className="text-xs text-gray-700">
        {d.from} → {d.to} :
        <span className="font-bold text-blue-600 ml-1">
          {d.value} KM
        </span>
      </div>
    ))}
  </div>
  
)}
            </div>

            {/* RIGHT: MAP */}
            <div className="flex-1">
              <AssetMap
                assets={assets}
                selected={selected}
                setSelected={handleSelect}
                selectedPoints={selectedPoints}
              />
            </div>
          </div>
          {/* {selectedPoints.length === 2 && distance && (
            <div className="bg-white shadow-lg rounded-xl p-4 mt-4 w-fit">
              <p className="text-sm font-semibold text-gray-700">
                Distance Between Assets
              </p>
              <p className="text-sm mt-2">From: {selectedPoints[0].assetId}</p>
              <p className="text-sm">To: {selectedPoints[1].assetId}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">
                {distance} KM
              </p>
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default Location;