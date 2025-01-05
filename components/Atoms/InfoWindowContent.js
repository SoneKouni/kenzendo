import React from 'react';
import { InfoWindow } from '@react-google-maps/api';

const InfoWindowContent = ({ selected, onClose }) => {
  return (
    <InfoWindow
      position={{
        lat: parseFloat(selected.Lat),
        lng: parseFloat(selected.Lng),
      }}
      onCloseClick={onClose}
    >
      <div>
        <h3 style={{ textAlign: 'center' }}>{selected.Name}</h3>
        <div style={{ textAlign: 'left' }}>
          <p>Rank: {selected.Rank}</p>
        </div>
      </div>
    </InfoWindow>
  );
};

export default InfoWindowContent;
