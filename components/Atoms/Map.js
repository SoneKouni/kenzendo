import React from 'react';
import { GoogleMap, MarkerF, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '80vh'
};

function Map({ bridgedata }) {
  const APIKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const center = {
    lat: 34.19861, // 山口の緯度
    lng: 131.575, // 山口の経度
  }

  return (
    <LoadScript googleMapsApiKey={APIKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
      >
        {bridgedata?.map(bridge => (
          <MarkerF
            key={bridge.ID}
            position={{ lat: bridge.Lat, lng: bridge.Lng }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;