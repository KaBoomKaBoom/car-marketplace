/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Blue for buttons, nav
        secondary: '#9333EA', // Purple for secondary actions
        accent: '#F59E0B', // Amber for highlights
        backgroundLight: '#F3F4F6', // Light gray for light mode
        backgroundDark: '#1F2937', // Dark gray for dark mode
        textLight: '#111827', // Dark text for light mode
        textDark: '#D1D5DB', // Light text for dark mode
      },
    },
  },
  darkMode: 'class', // Enables class-based dark mode
  plugins: [],
}