import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import { AuthContext } from '../context/AuthContext';

const BusinessCard = ({ id, name, category, averageRating, description, image, reviewCount, owner }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:bg-surface-hover hover:border-[#2a2a2a] hover:shadow-xl hover:-translate-y-[2px] transition-all duration-200 group">
      <div className="h-48 w-full overflow-hidden relative">
        <img 
          src={image || 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop'} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {user && user.role === 'owner' && user._id === owner && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-black text-[10px] px-2.5 py-1 rounded-full font-bold shadow-md">
            Your Listing
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="px-3 py-1 bg-border-subtle text-secondary text-xs rounded-full font-medium shrink-0">
            {category}
          </span>
          <span className="bg-border-subtle text-star text-xs px-2.5 py-1 rounded-full font-medium flex items-center space-x-1">
            <span>★</span>
            <span>{averageRating}</span>
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-white truncate">{name}</h3>
        <p className="text-secondary text-sm mt-1 mb-5 line-clamp-2 leading-relaxed">{description}</p>
        
        <div className="flex justify-between items-center border-t border-border-subtle pt-4">
          <div className="flex items-center">
             <RatingStars value={averageRating} readOnly size="w-3.5 h-3.5" />
             <span className="ml-1.5 text-xs text-muted">({reviewCount})</span>
          </div>
          <Link to={`/businesses/${id}`} className="text-white text-sm font-medium hover:underline flex items-center">
            View Details <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
