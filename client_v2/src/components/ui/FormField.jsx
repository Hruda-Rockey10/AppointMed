import React from 'react';
import { twMerge } from 'tailwind-merge';

const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  className,
  inputClassName,
  rows = 4,
  options = [],
  ...props
}) => {
  const inputBaseStyles = 'w-full px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed';
  
  const inputErrorStyles = error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-gray-300';

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={twMerge(inputBaseStyles, inputErrorStyles, inputClassName)}
          {...props}
        />
      );
    }

    if (type === 'select') {
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          className={twMerge(inputBaseStyles, inputErrorStyles, inputClassName)}
          {...props}
        >
          <option value="">Select...</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={twMerge(inputBaseStyles, inputErrorStyles, inputClassName)}
        {...props}
      />
    );
  };

  return (
    <div className={twMerge('mb-4', className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500 animate-slideIn">{error}</p>
      )}
    </div>
  );
};

export default FormField;
