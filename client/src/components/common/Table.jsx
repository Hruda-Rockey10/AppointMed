import React from "react";
import { cn } from "../../utils/cn";

const Table = ({
  children,
  striped = false,
  hoverable = true,
  className,
  ...props
}) => (
  <div className="overflow-x-auto rounded-3xl border border-white/70 bg-white/90 shadow-lg shadow-primary/5">
    <table
      className={cn("min-w-full divide-y divide-white/80 text-left", className)}
      {...props}
    >
      {children}
    </table>
  </div>
);

const TableHead = ({ children, className, ...props }) => (
  <thead
    className={cn("bg-[#1f2937] text-gray-400", className)}
    {...props}
  >
    {children}
  </thead>
);

const TableBody = ({ children, className, striped, hoverable, ...props }) => (
  <tbody
    className={cn(
      "bg-[#2d3748] divide-y divide-white/80 text-sm text-gray-300",
      className
    )}
    {...props}
  >
    {children}
  </tbody>
);

const TableRow = ({ children, className, striped, hoverable, ...props }) => (
  <tr
    className={cn(hoverable ? "hover:bg-primary/5 transition" : "", className)}
    {...props}
  >
    {children}
  </tr>
);

const TableHeader = ({ children, className, ...props }) => (
  <th
    className={cn(
      "px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400",
      className
    )}
    {...props}
  >
    {children}
  </th>
);

const TableCell = ({ children, className, ...props }) => (
  <td
    className={cn("px-6 py-4 text-sm text-gray-100", className)}
    {...props}
  >
    {children}
  </td>
);

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Header = TableHeader;
Table.Cell = TableCell;

export default Table;
