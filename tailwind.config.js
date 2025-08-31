/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'in': 'in 0.2s ease-out',
        'slide-in-from-top-2': 'slide-in-from-top-2 0.2s ease-out',
        'slide-in-from-bottom-2': 'slide-in-from-bottom-2 0.2s ease-out',
      },
      keyframes: {
        'in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-from-top-2': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-bottom-2': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        sans: ['Georgia', 'Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}