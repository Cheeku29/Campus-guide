import React from 'react';

const InputField = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`mb-4 w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-secondary mb-2">{label}</label>}
      <input 
        className={`w-full px-4 py-2.5 bg-background border rounded-lg focus:outline-none transition-all placeholder-muted text-primary
          ${error 
            ? 'border-error focus:border-error animate-shake' 
            : 'border-border focus:border-[#333333]'
          }`}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
    </div>
  );
};

export default InputField;
