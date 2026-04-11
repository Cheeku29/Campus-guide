import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ value, onChange, readOnly = false, size = 'w-5 h-5' }) => {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="flex space-x-1" onMouseLeave={() => !readOnly && setHoverValue(0)}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoverValue || value);
        return (
          <Star
            key={star}
            className={`${size} transition-colors duration-200 ${
              readOnly ? '' : 'cursor-pointer hover:scale-110'
            } ${isActive ? 'text-star fill-star' : 'text-border-subtle fill-border-subtle'}`}
            onClick={() => !readOnly && onChange && onChange(star)}
            onMouseEnter={() => !readOnly && setHoverValue(star)}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;
