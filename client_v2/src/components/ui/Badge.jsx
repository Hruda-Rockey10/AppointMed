import React from 'react';
import { twMerge } from 'tailwind-merge';

const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  pill = false,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium';

  const variants = {
    success: 'bg-green-100 text-green-800 border border-green-200',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
    info: 'bg-blue-100 text-blue-800 border border-blue-200',
    neutral: 'bg-gray-100 text-gray-800 border border-gray-200',
    primary: 'bg-blue-100 text-blue-800 border border-blue-200',
    secondary: 'bg-purple-100 text-purple-800 border border-purple-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const shapeStyles = pill ? 'rounded-full' : 'rounded';

  return (
    <span
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        shapeStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
