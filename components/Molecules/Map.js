import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer, MarkerF, InfoWindow, TrafficLayer } from "@react-google-maps/api";
import InfoWindowContent from "../Atoms/InfoWindowContent";
import InfoWindowContentT from "../Atoms/infoWindowContentT";

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
  const [map, setMap] = useState(null);
  const [pointA, setPointA] = useState('');
  const [pointB, setPointB] = useState('');
  const [directions, setDirections] = useState(null);

  const handleMarkerClick = (item, type) => {
    if (type === "bridge") {
      setSelectedBridge(item);
      setSelectedTunnel(null);
    } else if (type === "tunnel") {
      setSelectedTunnel(item);
      setSelectedBridge(null);
    }
    if (map) {
      map.panTo({ lat: item.Lat, lng: item.Lng });
      map.setZoom(15);
    }
  };

  const validateAndConvertPosition = (item) => {
    const lat = parseFloat(item.Lat);
    const lng = parseFloat(item.Lng);
    return isNaN(lat) || isNaN(lng) ? null : { lat, lng };
  };

  const handleSearch = () => {
    if (pointA && pointB) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pointA,
          destination: pointB,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  return (
    <LoadScript googleMapsApiKey={APIKey}>
      <div>
        <input
          type="text"
          placeholder="地点Aを入力"
          value={pointA}
          onChange={(e) => setPointA(e.target.value)}
        />
        <input
          type="text"
          placeholder="地点Bを入力"
          value={pointB}
          onChange={(e) => setPointB(e.target.value)}
        />
        <button onClick={handleSearch}>検索</button>
      </div>
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
        {!directions && bridgedata?.map((bridge) => {
          const position = validateAndConvertPosition(bridge);
          return position ? (
            <MarkerF
              key={bridge.Id}
              position={position}
              onClick={() => handleMarkerClick(bridge, "bridge")}
            />
          ) : null;
        })}
        {!directions && tunneldata?.map((tunnel) => {
          const position = validateAndConvertPosition(tunnel);
          return position ? (
            <MarkerF
              key={tunnel.Id}
              position={position}
              onClick={() => handleMarkerClick(tunnel, "tunnel")}
            />
          ) : null;
        })}
        {selectedBridge && !directions && (
          <InfoWindow
            position={{ lat: selectedBridge.Lat, lng: selectedBridge.Lng }}
            onCloseClick={() => setSelectedBridge(null)}
          >
            <InfoWindowContent bridge={selectedBridge} />
          </InfoWindow>
        )}
        {selectedTunnel && !directions && (
          <InfoWindow
            position={{ lat: selectedTunnel.Lat, lng: selectedTunnel.Lng }}
            onCloseClick={() => setSelectedTunnel(null)}
          >
            <InfoWindowContentT tunnel={selectedTunnel} />
          </InfoWindow>
        )}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;