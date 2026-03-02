/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'geopolitical-dark': '#0f1419',
        'geopolitical-light': '#1a2332',
        'threat-high': '#ef4444',
        'threat-medium': '#f59e0b',
        'threat-low': '#10b981',
      },
    },
  },
  plugins: [],
}
