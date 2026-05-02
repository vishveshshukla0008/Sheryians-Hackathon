import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  id,
  type = 'text',
  placeholder,
  icon: Icon,
  error,
  className = '',
  labelClassName = 'text-md font-medium text-text ml-1 opacity-80',
  ...props
}, ref) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label
          className={labelClassName}
          htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative group/input">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted group-focus-within/input:text-primary transition-colors">
            <Icon className="h-[1.15rem] w-[1.15rem]" />
          </div>
        )}
        <input
          id={id}
          type={type}
          ref={ref}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-12' : 'pl-5'} pr-5 py-4 bg-input border ${error ? "border-error focus:ring-error focus:border-error" : "border-border/60 focus:ring-primary focus:border-primary"} rounded-2xl text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-surface transition-all duration-300 hover:border-primary/40 ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p
          className="text-error text-xs mt-1.5 ml-1 flex items-center gap-1.5 animate-fade-in-up"
          style={{ animationDuration: "0.2s" }}>
          <span className="inline-block w-1.5 h-1.5 bg-error rounded-full shadow-[0_0_5px_var(--color-error)]"></span>
          <span className="font-medium">{error.message || error}</span>
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
