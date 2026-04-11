import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base'
  };

  const variants = {
    primary: 'bg-white text-black hover:bg-[#e0e0e0] shadow-sm',
    secondary: 'bg-surface text-primary border border-border hover:bg-surface-hover hover:border-[#2a2a2a]',
    outline: 'bg-transparent text-primary border border-border hover:bg-surface-hover',
    danger: 'bg-red-500/10 text-error border border-red-500/20 hover:bg-red-500/20',
    ghost: 'bg-transparent text-secondary hover:text-white hover:bg-surface-hover'
  };

  return (
    <button 
      className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
