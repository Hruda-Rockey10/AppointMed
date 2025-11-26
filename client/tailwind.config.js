/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F7C94',
          dark: '#0A5B6B',
          light: '#E2F4F8',
        },
        secondary: {
          DEFAULT: '#56C596',
          dark: '#34A474',
          light: '#E7F8F0',
        },
        success: {
          DEFAULT: '#10B981', // Emerald-500
          dark: '#059669',
          light: '#34D399',
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber-500
          dark: '#D97706',
          light: '#FBBF24',
        },
        error: {
          DEFAULT: '#EF4444', // Red-500
          dark: '#DC2626',
          light: '#F87171',
        },
        info: {
          DEFAULT: '#3B82F6', // Blue-500
          dark: '#2563EB',
          light: '#60A5FA',
        },
        background: {
          DEFAULT: '#f8fafc', // Slate-50
          paper: '#FFFFFF',
          muted: '#f1f5f9', // Slate-100
        },
        text: {
          primary: '#0f172a',
          secondary: '#334155',
          muted: '#64748b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
