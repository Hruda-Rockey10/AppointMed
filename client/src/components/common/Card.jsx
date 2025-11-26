import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({
  children,
  className,
  hover = false,
  clickable = false,
  shadow = 'md',
  onClick,
  ...props
}) => {
  const baseStyles = 'bg-[#2d3748] rounded-lg border border-[#4a5568] transition-all duration-300';

  const shadowStyles = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
  const clickableStyles = clickable ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={cn(
        baseStyles,
        shadowStyles[shadow],
        hoverStyles,
        clickableStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('px-6 py-4 border-b border-[#4a5568]', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardBody = ({ children, className, ...props }) => {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('px-6 py-4 border-t border-[#4a5568] bg-[#1f2937]', className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
