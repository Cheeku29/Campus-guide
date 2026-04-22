import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import { MAPS_CONFIG } from '../../config/maps';

const libraries = ['places'];

const MapWrapper = ({ children }) => {
  if (!MAPS_CONFIG.apiKey) {
    return (
      <div className="bg-[#0e1320] border border-[#1e2840] rounded-2xl h-full flex flex-col items-center justify-center p-6 text-center">
        <span className="text-4xl mb-3">🗺️</span>
        <span className="text-[#3d4f70] text-sm">Map unavailable — add API key to .env</span>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={MAPS_CONFIG.apiKey} libraries={libraries}>
      {children}
    </LoadScript>
  );
};

export default MapWrapper;
