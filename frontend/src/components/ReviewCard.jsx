import React from 'react';
import RatingStars from './RatingStars';

const ReviewCard = ({ reviewerName, rating, text, date, businessName }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-surface p-5 rounded-2xl border border-border mb-3">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-white text-xs font-semibold">
            {reviewerName && reviewerName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-primary text-sm">{reviewerName}</span>
              <span className="text-muted text-xs">•</span>
              <span className="text-xs text-muted">{formattedDate}</span>
            </div>
            {businessName && <span className="text-xs text-secondary mt-0.5">Reviewed: <span className="text-primary">{businessName}</span></span>}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <RatingStars value={rating} readOnly size="w-3.5 h-3.5" />
      </div>
      <p className="text-sm text-secondary whitespace-pre-wrap leading-relaxed">{text}</p>
    </div>
  );
};

export default ReviewCard;
