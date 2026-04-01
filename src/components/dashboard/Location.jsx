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
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
      

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-500">Loading assets...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedPoints([]);
                  setDistances([]);
                  setSelected(null);
                }}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Reset Selection
              </button>
            
            </div>

          

            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="mb-3 text-sm font-semibold text-slate-800">Status of Assets</p>
                  <div className="space-y-2 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-green-500"></span>
                      <span>AVAL (Available Assets)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-500"></span>
                      <span>DMG (Damaged Assets)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                      <span>LTRF (Location Transfer)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                      <span>DMG-REP (Repaired Assets)</span>
                    </div>
                  </div>
                </div>

                {distances.length > 0 && (
                  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
                    <p className="mb-2 text-sm font-semibold text-slate-800">Distances from Source</p>
                    <div className="space-y-2">
                      {distances.map((d, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs text-slate-700"
                        >
                          {d.from} to {d.to}
                          <span className="ml-1 font-bold text-blue-700">{d.value} KM</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <AssetMap
                  assets={assets}
                  selected={selected}
                  setSelected={handleSelect}
                  selectedPoints={selectedPoints}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Location;