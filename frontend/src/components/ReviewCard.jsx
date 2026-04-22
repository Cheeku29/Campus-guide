import React from 'react';
import RatingStars from './RatingStars';
import { Link } from 'react-router-dom';

const ReviewCard = ({ reviewerName, rating, text, date, businessName, businessId }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-[#0e1320] border border-[#1e2840] rounded-2xl p-5 mb-3 hover:border-[#2a3a5c] transition duration-200">
      {businessName && (
        <Link to={`/businesses/${businessId}`} className="block text-[#8b95b0] text-xs hover:text-[#eef0f6] transition mb-3">
          {businessName}
        </Link>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-[#080b14] border border-[#1e2840] text-[#eef0f6] text-xs font-semibold flex items-center justify-center shrink-0">
            {reviewerName ? reviewerName.charAt(0).toUpperCase() : 'A'}
          </div>
          <span className="font-medium text-[#eef0f6] text-sm ml-3">{reviewerName || 'Anonymous'}</span>
        </div>
        <span className="text-xs text-[#3d4f70] ml-auto">{formattedDate}</span>
      </div>
      
      <div className="mt-3">
        <RatingStars value={rating} readOnly size="w-3.5 h-3.5" containerClass="flex gap-1" />
      </div>
      <p className="text-sm text-[#8b95b0] mt-2 leading-relaxed">{text}</p>
    </div>
  );
};

export default ReviewCard;
