import React, { useEffect, useState } from "react";
import AssetMap from "./AssetMap";

const AssetsPage = () => {
  const [assets, setAssets] = useState([]);

  const fetchAssets = async () => {
    const res = await fetch("http://localhost:5000/api/assets");
    const data = await res.json();

    setAssets(data);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Assets Map</h2>

      <AssetMap assets={assets} />
    </div>
  );
};

export default AssetsPage;