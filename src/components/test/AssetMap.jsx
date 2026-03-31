import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";

const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
});

const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

const AssetMap = ({ assets, selected, setSelected }) => {
  const defaultPosition = [17.385, 78.4867]; // Hyderabad

  const getPosition = (asset) => [
    parseFloat(asset.latitude),
    parseFloat(asset.longitude),
  ];
 const yellowIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  iconSize: [32, 32],
});

const blueIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
});

const getIcon = (asset) => {
  const status = asset.status?.trim().toUpperCase();

  switch (status) {
    case "AVAL":
      return greenIcon;   // 🟢 Available
    case "DMG":
      return redIcon;     // 🔴 Damaged
    case "LTRF":
      return yellowIcon;  // 🟡 Transfer
    case "DMG-REP":
      return blueIcon;    // 🔵 Repair
    default:
      return redIcon;     // fallback
  }
};

  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={
          selected && selected.latitude && selected.longitude
            ? getPosition(selected)
            : defaultPosition
        }
        zoom={selected ? 14 : 10}
        className="h-full w-full"
      >
        {/* Map tiles */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Markers */}
        {assets.map((asset, index) => {
          if (!asset.latitude || !asset.longitude) return null;

          return (
            <Marker
              key={index}
              position={getPosition(asset)}
              icon={getIcon(asset)} 
              eventHandlers={{
                click: () => {
                  setSelected(asset); // ✅ CLICK → SHOW DETAILS
                },
              }}
            >
              <Popup>
                <div className="text-sm space-y-1">
                  <p><strong>AssetID:</strong> {asset.assetId}</p>
                 <p>
  <strong>Lat:</strong> {asset.latitude}{" "}
  <strong>Lng:</strong> {asset.longitude}
</p>
                  <p><strong>Location:</strong> {asset.location} {""}
                  <strong>Desc:</strong> {asset.locationDesc}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default AssetMap;