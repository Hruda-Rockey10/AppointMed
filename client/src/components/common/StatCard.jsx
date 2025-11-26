import React from 'react';
import { cn } from '../../utils/cn';

const StatCard = ({
  icon,
  label,
  value,
  trend,
  trendValue,
  variant = 'primary',
  className,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-blue-50 text-blue-600 border-blue-200',
    secondary: 'bg-purple-50 text-purple-600 border-purple-200',
    success: 'bg-green-50 text-green-600 border-green-200',
    warning: 'bg-amber-50 text-amber-600 border-amber-200',
    danger: 'bg-red-50 text-red-600 border-red-200',
  };

  const trendStyles = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };

  return (
    <div
      className={cn(
        'bg-[#2d3748] rounded-lg border p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fadeIn',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {trend && trendValue && (
            <p className={cn('mt-2 text-sm', trendStyles[trend])}>
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {trend === 'neutral' && '→'}
              {' '}
              {trendValue}
            </p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              'flex items-center justify-center w-12 h-12 rounded-full border-2',
              variantStyles[variant]
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
