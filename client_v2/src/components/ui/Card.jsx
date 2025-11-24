import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({
  children,
  className,
  hover = false,
  clickable = false,
  shadow = 'md',
  onClick,
  ...props
}) => {
  const baseStyles = 'bg-white rounded-lg border border-gray-200 transition-all duration-300';

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
      className={twMerge(
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
      className={twMerge('px-6 py-4 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardBody = ({ children, className, ...props }) => {
  return (
    <div className={twMerge('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge('px-6 py-4 border-t border-gray-200 bg-gray-50', className)}
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
