import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, MarkerF, InfoWindow, TrafficLayer } from "@react-google-maps/api";
import InfoWindowContent from "../Atoms/InfoWindowContent";
import InfoWindowContentT from "../Atoms/InfoWindowContentT";

const containerStyle = {
  width: "100%",
  height: "75vh",
};

function Map({ bridgedata, tunneldata, trafficLayerVisible }) {
  const APIKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const center = {
    lat: 34.19861, // 山口の緯度
    lng: 131.575, // 山口の経度
  };
  const [selectedBridge, setSelectedBridge] = useState(null);
  const [selectedTunnel, setSelectedTunnel] = useState(null);
  const [inspectedBridges, setInspectedBridges] = useState([]);
  const [inspectedTunnels, setInspectedTunnels] = useState([]);
  const [map, setMap] = useState(null);

  const handleMarkerClick = (item, type) => {
    if (type === "bridge") {
      setSelectedBridge(item);
      setSelectedTunnel(null);
    } else if (type === "tunnel") {
      setSelectedTunnel(item);
      setSelectedBridge(null);
    }
  };

  const handleInspect = (id, type) => {
    if (type === "bridge") {
      setInspectedBridges([...inspectedBridges, id]);
    } else if (type === "tunnel") {
      setInspectedTunnels([...inspectedTunnels, id]);
    }
  };

  const handleCancel = (id, type) => {
    if (type === "bridge") {
      setInspectedBridges(inspectedBridges.filter(bridgeId => bridgeId !== id));
    } else if (type === "tunnel") {
      setInspectedTunnels(inspectedTunnels.filter(tunnelId => tunnelId !== id));
    }
  };

  const validateAndConvertPosition = (item) => {
    const lat = parseFloat(item.Lat);
    const lng = parseFloat(item.Lng);
    return isNaN(lat) || isNaN(lng) ? null : { lat, lng };
  };

  return (
    <LoadScript googleMapsApiKey={APIKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={(mapInstance) => setMap(mapInstance)}
        options={{
          disableDefaultUI: true,
          gestureHandling: "cooperative",
        }}
      >
        {trafficLayerVisible && <TrafficLayer />}
        {bridgedata?.map((bridge) => {
          const position = validateAndConvertPosition(bridge);
          const icon = inspectedBridges.includes(bridge.Id)
            ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            : "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
          return position ? (
            <MarkerF
              key={bridge.Id}
              position={position}
              icon={icon}
              onClick={() => handleMarkerClick(bridge, "bridge")}
            />
          ) : null;
        })}
        {tunneldata?.map((tunnel) => {
          const position = validateAndConvertPosition(tunnel);
          const icon = inspectedTunnels.includes(tunnel.Id)
            ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            : "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
          return position ? (
            <MarkerF
              key={tunnel.Id}
              position={position}
              icon={icon}
              onClick={() => handleMarkerClick(tunnel, "tunnel")}
            />
          ) : null;
        })}
        {selectedBridge && (
          <InfoWindow
            position={{ lat: selectedBridge.Lat, lng: selectedBridge.Lng }}
            onCloseClick={() => setSelectedBridge(null)}
          >
            <InfoWindowContent bridge={selectedBridge} onInspect={(id) => handleInspect(id, "bridge")} onCancel={(id) => handleCancel(id, "bridge")} />
          </InfoWindow>
        )}
        {selectedTunnel && (
          <InfoWindow
            position={{ lat: selectedTunnel.Lat, lng: selectedTunnel.Lng }}
            onCloseClick={() => setSelectedTunnel(null)}
          >
            <InfoWindowContentT tunnel={selectedTunnel} onInspect={(id) => handleInspect(id, "tunnel")} onCancel={(id) => handleCancel(id, "tunnel")} />
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;