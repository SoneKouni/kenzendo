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

  return (
    <LoadScript googleMapsApiKey={APIKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={9}>
        {trafficLayerVisible && <TrafficLayer />}
        {bridgedata?.map((bridge) => (
          <MarkerF
            key={bridge.ID}
            position={{ lat: bridge.Lat, lng: bridge.Lng }}
            onClick={() => handleMarkerClick(bridge)}
          />
        ))}
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
