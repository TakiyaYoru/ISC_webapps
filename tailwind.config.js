/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#705731',
          container: '#8B6F47',
          fixed: '#EBDCBF',
          'fixed-dim': '#CDB896',
        },
        'on-primary': '#FFFFFF',
        secondary: {
          DEFAULT: '#645E51',
          container: '#E8DFCE',
        },
        tertiary: {
          DEFAULT: '#4C6A5C',
          container: '#CDE9D8',
        },
        surface: {
          DEFAULT: '#FCF9F4',
          dim: '#DDD9D3',
          bright: '#FCF9F4',
          'container-lowest': '#FFFFFF',
          'container-low': '#F6F3EE',
          container: '#F0EDE8',
          'container-high': '#EBE7E2',
          'container-highest': '#E5E1DC',
        },
        'on-surface': '#1C1C19',
        'on-surface-variant': '#4A4942',
        outline: '#7D7B72',
        'outline-variant': '#CDCBC1',
        bone: '#FCF9F4',
        ink: '#1C1C19',
      },
      fontFamily: {
        serif: ['Newsreader', 'Noto Serif', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'headline': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'title': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.6', letterSpacing: '0.005em' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0.005em' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.55', letterSpacing: '0.005em' }],
        'label': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
      },
      letterSpacing: {
        tight: '-0.02em',
        tighter: '-0.03em',
        wide: '0.08em',
        wider: '0.12em',
        widest: '0.2em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '38': '9.5rem',
      },
      boxShadow: {
        'ambient': '0 30px 60px -20px rgba(28, 28, 25, 0.08)',
        'ambient-sm': '0 20px 40px -15px rgba(28, 28, 25, 0.06)',
        'float': '0 40px 80px -30px rgba(28, 28, 25, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-up': 'fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 1.2s ease-out both',
        'reveal': 'reveal 1.4s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
