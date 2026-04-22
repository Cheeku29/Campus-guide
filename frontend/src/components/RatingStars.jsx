import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ value, onChange, readOnly = false, size = 'w-5 h-5', containerClass = 'flex gap-1' }) => {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className={containerClass} onMouseLeave={() => !readOnly && setHoverValue(0)}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoverValue || value);
        return (
          <Star
            key={star}
            className={`${size} transition-colors duration-100 ${
              readOnly ? '' : 'cursor-pointer hover:scale-110'
            } ${isActive ? 'text-amber-400 fill-amber-400' : 'text-[#1e2840] fill-[#1e2840]'}`}
            onClick={() => !readOnly && onChange && onChange(star)}
            onMouseEnter={() => !readOnly && setHoverValue(star)}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;
