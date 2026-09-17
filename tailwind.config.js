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
        background: '#faf8f5',
        foreground: '#18181b',
        surface: {
          DEFAULT: '#12141d',
          elevated: '#181b28',
          card: '#141724',
        },
        border: {
          DEFAULT: 'rgba(231, 227, 218, 0.8)',
          dark: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(194, 65, 12, 0.3)',
          active: '#c2410c',
        },
        terracotta: {
          DEFAULT: '#c2410c',
          light: '#ea580c',
          dark: '#9a3412',
          subtle: 'rgba(194, 65, 12, 0.08)',
          border: 'rgba(194, 65, 12, 0.25)',
        },
        sand: {
          50: '#fdfbf7',
          100: '#faf8f5',
          200: '#f4f0ea',
          300: '#e7e3da',
          400: '#d5cfc3',
          500: '#a8a29e',
        },
        charcoal: {
          DEFAULT: '#18181b',
          light: '#27272a',
          muted: '#52525b',
          subtle: '#71717a',
        },
        emerald: {
          DEFAULT: '#10b981',
          light: '#34d399',
          glow: 'rgba(16, 185, 129, 0.25)',
        },
        indigo: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          glow: 'rgba(99, 102, 241, 0.25)',
        },
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['var(--font-serif)', 'Newsreader', 'Georgia', 'Cambria', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      borderRadius: {
        lg: '18px',
        DEFAULT: '12px',
      },
    },
  },
  plugins: [],
};
