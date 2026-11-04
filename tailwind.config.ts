import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6600',
          hover: '#E55A00',
          light: '#FFF0E6',
          dark: '#CC5200',
        },
        secondary: {
          DEFAULT: '#1A1A1A',
          light: '#2D2D2D',
        },
        background: '#FFFFFF',
        surface: '#F9FAFB',
        border: '#E5E7EB',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
    },
  },
  plugins: [],
};

export default config;