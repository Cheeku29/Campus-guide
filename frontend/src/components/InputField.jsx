import React from 'react';

const InputField = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`mb-5 w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-[#8b95b0] mb-2">{label}</label>}
      <input 
        className={`w-full px-4 py-3 bg-[#080b14] border rounded-xl outline-none transition-all placeholder-[#3d4f70] text-[#eef0f6] shadow-[0_0_0_3px_transparent]
          ${error 
            ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)] flex animate-shake bg-red-500/5' 
            : 'border-[#1e2840] focus:border-amber-500/50 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)]'
          }`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
