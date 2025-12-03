import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and merges Tailwind classes using tailwind-merge
 * This prevents Tailwind class conflicts and allows conditional class names
 *
 * @param {...any} inputs - Class names, objects, or arrays to merge
 * @returns {string} - Merged class names
 *
 * @example
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4' (px-4 wins)
 * cn('text-red-500', condition && 'text-blue-500') // conditionally apply classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
