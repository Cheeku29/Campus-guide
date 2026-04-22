import React from 'react';

const LoadingSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl p-6 skeleton mb-4 relative z-0">
          <div className="flex justify-between items-start mb-4">
            <div className="w-2/3 h-7 bg-[#1a1a1a] rounded-lg"></div>
            <div className="w-16 h-6 bg-[#1a1a1a] rounded-full"></div>
          </div>
          <div className="w-full h-36 bg-[#1a1a1a] rounded-xl mb-5"></div>
          <div className="flex items-center space-x-2 mb-4">
             <div className="w-4 h-4 bg-[#1a1a1a] rounded-full"></div>
             <div className="w-1/4 h-4 bg-[#1a1a1a] rounded-lg"></div>
          </div>
          <div className="w-1/2 h-4 bg-[#1a1a1a] rounded-lg mb-2"></div>
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
