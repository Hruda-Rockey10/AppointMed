import React from 'react';
import { twMerge } from 'tailwind-merge';

const PageHeader = ({
  title,
  subtitle,
  actions,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        'flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 animate-fadeIn',
        className
      )}
      {...props}
    >
      <div className="mb-4 sm:mb-0">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
