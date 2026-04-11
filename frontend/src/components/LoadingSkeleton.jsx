import React from 'react';

const LoadingSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="relative overflow-hidden bg-surface rounded-2xl p-5 border border-border">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-2/3 h-7 bg-border-subtle rounded-md"></div>
            <div className="w-16 h-6 bg-border-subtle rounded-full"></div>
          </div>
          <div className="w-full h-36 bg-border-subtle rounded-lg mb-4"></div>
          <div className="flex items-center space-x-2 mb-3">
             <div className="w-4 h-4 bg-border-subtle rounded-full"></div>
             <div className="w-1/4 h-4 bg-border-subtle rounded-md"></div>
          </div>
          <div className="w-full h-4 bg-border-subtle rounded-md mb-2"></div>
          <div className="w-2/3 h-4 bg-border-subtle rounded-md"></div>
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
