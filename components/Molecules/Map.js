import React, { useState } from "react";
import {
  GoogleMap,
  MarkerF,
  LoadScript,
  TrafficLayer,
} from "@react-google-maps/api";
import InfoWindowContent from "../Atoms/InfoWindowContent";

const containerStyle = {
  width: "100%",
  height: "80vh",
};

function Map({ bridgedata, trafficLayerVisible }) {
  const APIKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const center = {
    lat: 34.19861, // 山口の緯度
    lng: 131.575, // 山口の経度
  };
  const [selectedBridge, setSelectedBridge] = useState(null);

  const handleMarkerClick = (bridge) => {
    setSelectedBridge(bridge);
  };

  const validateAndConvertPosition = (bridge) => {
    const { Id, Lat, Lng } = bridge;
    // `Lat` と `Lng` を数値に変換
    const lat = typeof Lat === "string" ? parseFloat(Lat) : Lat;
    const lng = typeof Lng === "string" ? parseFloat(Lng) : Lng;

    // 変換結果を検証
    if (isNaN(lat) || isNaN(lng)) {
      console.error(`Invalid position for bridge Id: ${Id}`, {
        Lat,
        Lng,
      });
      return null;
    }

    return { lat, lng };
  };

  return (
    <LoadScript googleMapsApiKey={APIKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={9}>
        {trafficLayerVisible && <TrafficLayer />}
        {bridgedata?.map((bridge) => {
          const position = validateAndConvertPosition(bridge);
          return position ? (
            <MarkerF
              key={bridge.Id}
              position={position}
              onClick={() => handleMarkerClick(bridge)}
            />
          ) : null; // 無効なデータはスキップ
        })}
        {selectedBridge && (
          <InfoWindowContent
            selected={selectedBridge}
            onClose={() => setSelectedBridge(null)}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
