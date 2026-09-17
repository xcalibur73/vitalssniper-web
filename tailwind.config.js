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
        background: '#F7F4EE',
        foreground: '#20201E',
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#242321',
          elevated: '#2D2B29',
          card: '#FFFFFF',
        },
        border: {
          DEFAULT: '#DDD7CE',
          dark: 'rgba(255, 255, 255, 0.12)',
          hover: 'rgba(183, 99, 69, 0.4)',
          active: '#B76345',
        },
        accent: {
          DEFAULT: '#B76345',
          light: '#C97558',
          dark: '#9E4E32',
          subtle: 'rgba(183, 99, 69, 0.08)',
          border: 'rgba(183, 99, 69, 0.25)',
        },
        muted: {
          DEFAULT: '#716C64',
          light: '#8C867D',
          dark: '#54504A',
        },
        editorialDark: {
          DEFAULT: '#242321',
          text: '#F7F4EE',
        },
        terracotta: {
          DEFAULT: '#B76345',
          light: '#C97558',
          dark: '#9E4E32',
          subtle: 'rgba(183, 99, 69, 0.08)',
          border: 'rgba(183, 99, 69, 0.25)',
        },
        sand: {
          50: '#FAF8F3',
          100: '#F7F4EE',
          200: '#EEE9DE',
          300: '#DDD7CE',
          400: '#C7BFB3',
          500: '#716C64',
        },
        charcoal: {
          DEFAULT: '#20201E',
          light: '#2D2B29',
          muted: '#716C64',
          subtle: '#8C867D',
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
      maxWidth: {
        prose: '740px',
        content: '1200px',
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
