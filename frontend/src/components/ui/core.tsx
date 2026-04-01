import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const baseStyle = `
    inline-flex items-center justify-center gap-2
    px-5 py-2.5 
    text-sm font-semibold 
    rounded-lg
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    active:scale-[0.98]
  `;
  
  const variants: Record<string, string> = {
    primary: `
      bg-trust-blue text-white 
      hover:bg-blue-600 hover:shadow-soft
      focus:ring-trust-blue
    `,
    success: `
      bg-trust-green text-white 
      hover:bg-emerald-600 hover:shadow-soft
      focus:ring-trust-green
    `,
    danger: `
      bg-trust-red text-white 
      hover:bg-red-600 hover:shadow-soft
      focus:ring-trust-red
    `,
    outline: `
      border-2 border-slate-200 text-slate-700 bg-white
      hover:border-trust-blue hover:text-trust-blue hover:bg-trust-blue-light/30
      focus:ring-trust-blue
    `,
    destructiveOutline: `
      border-2 border-trust-red/30 text-trust-red bg-white
      hover:border-trust-red hover:bg-trust-red-light/50
      focus:ring-trust-red
    `,
    ghost: `
      text-slate-600 bg-transparent
      hover:bg-slate-100 hover:text-slate-900
      focus:ring-slate-400
    `,
  };
  
  return (
    <button 
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ label, error, className = '', ...props }: any) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>
    )}
    <input 
      className={`
        w-full px-4 py-2.5
        text-sm text-slate-900
        bg-white
        border border-slate-200 rounded-lg
        placeholder:text-slate-400
        transition-all duration-200
        hover:border-slate-300
        focus:outline-none focus:ring-2 focus:ring-trust-blue/20 focus:border-trust-blue
        disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
        ${error ? 'border-trust-red focus:ring-trust-red/20 focus:border-trust-red' : ''}
        ${className}
      `}
      {...props} 
    />
    {error && (
      <span className="text-xs font-medium text-trust-red flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </span>
    )}
  </div>
);

export const Card = ({ children, className = '', hover = false }: any) => (
  <div 
    className={`
      bg-white 
      border border-slate-200/80 
      rounded-xl 
      shadow-soft
      ${hover ? 'transition-all duration-200 hover:shadow-soft-lg hover:border-slate-300 cursor-pointer' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

export const Badge = ({ children, status = 'PENDING' }: any) => {
  const maps: Record<string, string> = {
    PENDING: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
    SUBMITTED: "bg-trust-amber-light text-amber-700 ring-1 ring-amber-200",
    UNDER_REVIEW: "bg-trust-amber-light text-amber-700 ring-1 ring-amber-200",
    APPROVED: "bg-trust-green-light text-emerald-700 ring-1 ring-emerald-200",
    FUNDS_RELEASED: "bg-trust-green-light text-emerald-700 ring-1 ring-emerald-200",
    DISPUTED: "bg-trust-red-light text-red-700 ring-1 ring-red-200",
    DRAFT: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
    CONTRACT_REVIEW: "bg-trust-blue-light text-blue-700 ring-1 ring-blue-200",
    AWAITING_DEPOSIT: "bg-trust-blue-light text-blue-700 ring-1 ring-blue-200",
    ACTIVE: "bg-trust-green-light text-emerald-700 ring-1 ring-emerald-200",
    OPEN: "bg-trust-blue-light text-blue-700 ring-1 ring-blue-200",
    COMPLETED: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  };
  
  return (
    <span 
      className={`
        inline-flex items-center
        px-2.5 py-1 
        text-xs font-semibold 
        rounded-full 
        ${maps[status] || maps.PENDING}
      `}
    >
      {children || status.replace(/_/g, ' ')}
    </span>
  );
}
