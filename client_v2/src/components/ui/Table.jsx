import React from 'react';
import { twMerge } from 'tailwind-merge';

const Table = ({
  children,
  striped = false,
  hoverable = true,
  className,
  ...props
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table
        className={twMerge('min-w-full divide-y divide-gray-200', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

const TableHead = ({ children, className, ...props }) => {
  return (
    <thead className={twMerge('bg-gray-50', className)} {...props}>
      {children}
    </thead>
  );
};

const TableBody = ({ children, className, striped, hoverable, ...props }) => {
  return (
    <tbody
      className={twMerge(
        'bg-white divide-y divide-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </tbody>
  );
};

const TableRow = ({ children, className, striped, hoverable, ...props }) => {
  const hoverStyles = hoverable ? 'hover:bg-gray-50 transition-colors' : '';
  
  return (
    <tr className={twMerge(hoverStyles, className)} {...props}>
      {children}
    </tr>
  );
};

const TableHeader = ({ children, className, ...props }) => {
  return (
    <th
      className={twMerge(
        'px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
};

const TableCell = ({ children, className, ...props }) => {
  return (
    <td
      className={twMerge('px-6 py-4 whitespace-nowrap text-sm text-gray-900', className)}
      {...props}
    >
      {children}
    </td>
  );
};

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Header = TableHeader;
Table.Cell = TableCell;

export default Table;
