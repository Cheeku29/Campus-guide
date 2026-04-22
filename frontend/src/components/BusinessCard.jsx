import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import { AuthContext } from '../context/AuthContext';

const BusinessCard = ({ id, name, category, averageRating, description, reviewCount, owner }) => {
  const { user } = useContext(AuthContext);

  const getCategoryStyles = (cat) => {
    switch(cat?.toLowerCase()) {
      case 'food': return { band: 'from-orange-500/50 to-transparent', border: 'border-orange-500/20', text: 'text-orange-400', bg: 'bg-orange-500/8' };
      case 'cafe': return { band: 'from-yellow-400/50 to-transparent', border: 'border-yellow-400/20', text: 'text-yellow-400', bg: 'bg-yellow-400/8' };
      case 'stationery': return { band: 'from-blue-500/50 to-transparent', border: 'border-blue-500/20', text: 'text-blue-400', bg: 'bg-blue-500/8' };
      case 'pg': return { band: 'from-purple-500/50 to-transparent', border: 'border-purple-500/20', text: 'text-purple-400', bg: 'bg-purple-500/8' };
      default: return { band: 'from-[#1e2840] to-transparent', border: 'border-[#1e2840]', text: 'text-[#8b95b0]', bg: 'bg-[#141c2e]' };
    }
  };

  const style = getCategoryStyles(category);

  return (
    <div className="bg-[#0e1320] border border-[#1e2840] rounded-2xl overflow-hidden group hover:border-[#2a3a5c] hover:bg-[#131926] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 relative">
      <div className={`h-1.5 w-full bg-gradient-to-r ${style.band}`}></div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-2 items-center">
            <span className={`text-[10px] tracking-wider uppercase rounded-full px-2.5 py-1 border ${style.border} ${style.text} ${style.bg}`}>
              {category}
            </span>
            {user && user.role === 'owner' && user._id === owner && (
              <span className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/25 text-[#8b5cf6] text-[10px] rounded-full px-3 py-1 uppercase tracking-wider">
                Yours
              </span>
            )}
          </div>
          <span className="ml-auto flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 rounded-full px-2.5 py-1">
            <span className="text-amber-400 text-xs">★</span>
            <span className="text-amber-400 text-xs font-medium">{averageRating}</span>
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-[#eef0f6] mt-3 tracking-tight leading-snug truncate">{name}</h3>
        <p className="text-sm text-[#8b95b0] mt-1.5 line-clamp-2 leading-relaxed h-[42px]">{description}</p>
        
        <div className="border-t border-[#141c2e] mt-4 mb-4"></div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <RatingStars value={averageRating} readOnly size="w-3.5 h-3.5" />
            <span className="ml-1.5 text-xs text-[#3d4f70]">({reviewCount})</span>
          </div>
          <Link to={`/businesses/${id}`} className="text-sm text-[#8b95b0] group-hover:text-amber-400 transition flex items-center ml-auto font-medium">
            View Details <span className="ml-1 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
