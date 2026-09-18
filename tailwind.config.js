/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F8F8',
        foreground: '#0F0F0F',
        bg: '#F8F8F8',
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F3F4F6',
          dark: '#111827',
          card: '#FFFFFF',
        },
        text: {
          DEFAULT: '#0F0F0F',
          secondary: '#4B5563',
          muted: '#6B7280',
        },
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        border: {
          DEFAULT: '#E5E7EB',
          strong: '#D1D5DB',
          dark: 'rgba(255, 255, 255, 0.12)',
          hover: '#D1D5DB',
          active: '#2563EB',
        },
        dark: {
          DEFAULT: '#111827',
          text: '#F9FAFB',
        },
        // Mapped helpers for seamless visual consistency
        accent: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          dark: '#1D4ED8',
          subtle: 'rgba(37, 99, 235, 0.08)',
          border: 'rgba(37, 99, 235, 0.25)',
        },
        muted: {
          DEFAULT: '#6B7280',
          light: '#9CA3AF',
          dark: '#4B5563',
        },
        editorialDark: {
          DEFAULT: '#111827',
          text: '#F9FAFB',
        },
        terracotta: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          dark: '#1D4ED8',
        },
        sand: {
          50: '#FAFAFA',
          100: '#F8F8F8',
          200: '#F3F4F6',
          300: '#E5E7EB',
          400: '#D1D5DB',
          500: '#6B7280',
        },
        charcoal: {
          DEFAULT: '#0F0F0F',
          light: '#1F2937',
          muted: '#4B5563',
          subtle: '#6B7280',
        },
        action: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#3B82F6',
          subtle: 'rgba(37, 99, 235, 0.08)',
          glow: 'rgba(37, 99, 235, 0.2)',
        },
        cwv: {
          good: '#10B981',
          warning: '#F59E0B',
          poor: '#EF4444',
        },
        emerald: {
          DEFAULT: '#10b981',
          light: '#34d399',
        },
      },
      maxWidth: {
        prose: '720px',
        content: '1200px',
        container: '1200px',
        wide: '1400px',
      },
      fontFamily: {
        sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        DEFAULT: '8px',
      },
    },
  },
  plugins: [],
};
