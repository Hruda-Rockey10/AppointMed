# Tailwind CSS Best Practices

This project follows a utility-first approach using Tailwind CSS v4.

## 1. No CSS Modules
We have migrated away from CSS modules (`.module.css`). Do not create new CSS files for components. Use Tailwind utility classes directly in your JSX.

**Bad:**
```jsx
// Button.module.css
.btn {
  background-color: blue;
  padding: 10px;
}

// Button.jsx
import styles from './Button.module.css';
<button className={styles.btn}>Click me</button>
```

**Good:**
```jsx
<button className="bg-blue-500 p-2.5 text-white rounded-lg hover:bg-blue-600 transition-colors">
  Click me
</button>
```

## 2. Conditional Classes
Use the `cn()` utility (from `src/utils/cn.js`) for conditional class names. This combines `clsx` and `tailwind-merge` to prevent class conflicts.

```jsx
import { cn } from "../../utils/cn";

const Button = ({ className, variant = "primary", ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-all",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "outline" && "border border-gray-300 hover:bg-gray-50",
        className // Allow overriding classes
      )}
      {...props}
    />
  );
};
```

## 3. Layout & Spacing
- Use Flexbox (`flex`, `items-center`, `justify-between`) and Grid (`grid`, `grid-cols-1`, `gap-4`) for layouts.
- Use standard spacing scale (`p-4`, `m-2`, `gap-6`).

## 4. Colors
- Use semantic color names where possible (e.g., `text-primary`, `bg-error`) if configured in `tailwind.config.js`.
- Otherwise, use standard Tailwind colors (`text-blue-600`, `bg-red-500`).

## 5. Responsive Design
- Use mobile-first prefixes (`md:`, `lg:`).
- Example: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (1 column on mobile, 2 on tablet, 3 on desktop).

## 6. Animations
- Use built-in animations (`animate-spin`, `animate-pulse`).
- For custom animations, define them in `index.css` or `tailwind.config.js` and use utility classes (`animate-fadeIn`).
