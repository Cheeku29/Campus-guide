import React, { useState } from 'react';
import { OverlayView } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

const SpotMarker = ({ business, isSelected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  if (!business || !business.location || !business.location.coordinates) return null;

  const pos = { 
    lat: business.location.coordinates[1], 
    lng: business.location.coordinates[0] 
  };

  const getCategoryColor = (cat) => {
    switch(cat?.toLowerCase()) {
      case 'food': return '#f97316';
      case 'cafe': return '#eab308';
      case 'stationery': return '#3b82f6';
      case 'pg': return '#a855f7';
      default: return '#8b95b0';
    }
  };

  return (
    <OverlayView position={pos} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
      <div 
        className="relative flex items-center justify-center cursor-pointer transition-transform duration-300 transform -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: isHovered || isSelected ? 10 : 1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick && onClick(business)}
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 40 40" 
          className={`transition-all duration-300 origin-bottom ${isHovered || isSelected ? 'scale-125' : 'scale-100'} ${isSelected ? 'animate-pulse' : ''}`}
          style={{ filter: (isHovered || isSelected) ? 'drop-shadow(0 0 8px rgba(245,158,11,0.5))' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
        >
          <circle cx="20" cy="20" r="14" fill={isSelected ? '#f59e0b' : '#3d4f70'} />
          <circle cx="20" cy="20" r="8" fill="#080b14" />
          <circle cx="20" cy="20" r="4" fill={getCategoryColor(business.category)} />
        </svg>
        
        {/* Hover/Select label */}
        {(isHovered || isSelected) && (
          <div className="absolute top-10 whitespace-nowrap bg-[#0e1320] border border-[#1e2840] rounded-xl px-3 py-2 shadow-xl z-50">
            <p className="text-[#eef0f6] font-semibold text-sm">{business.name}</p>
            <p className="text-[#8b95b0] text-xs flex items-center gap-1 mt-0.5">
               <span className="text-amber-400">★</span> {business.averageRating} <span className="mx-1">•</span> {business.category}
            </p>
            {isSelected && (
              <span 
                className="text-amber-400 text-xs font-medium block mt-1 hover:underline text-right"
                onClick={(e) => { e.stopPropagation(); navigate(`/businesses/${business._id}`); }}
              >
                View Details →
              </span>
            )}
          </div>
        )}
      </div>
    </OverlayView>
  );
};

export default SpotMarker;
