/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'from-blue-500',
    'to-blue-600',
    'from-sky-400',
    'to-sky-500',
    'from-red-500',
    'to-red-600',
    'from-green-500',
    'to-green-600',
    'from-pink-500',
    'to-purple-600',
    'bg-blue-500',
    'bg-gray-900',
    'bg-sky-500',
    'bg-red-500',
    'bg-green-500',
    'bg-pink-500',
    'hover:bg-blue-600',
    'hover:bg-gray-800',
    'hover:bg-sky-600',
    'hover:bg-red-600',
    'hover:bg-green-600',
    'hover:bg-pink-600'
  ],
  theme: {
    extend: {
      fontFamily: {
        'system': [
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
      },
      boxShadow: {
        'apple': '0 2px 8px rgba(0,0,0,0.08)',
        'apple-lg': '0 4px 16px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
