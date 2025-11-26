import React from 'react';
import { cn } from '../../utils/cn';

const SectionHeader = ({ eyebrow, title, description, action, className }) => {
  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">{eyebrow}</p>
        )}
        <h2 className="font-display text-3xl font-semibold text-gray-100">{title}</h2>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </div>
      {action}
    </div>
  );
};

export default SectionHeader;

