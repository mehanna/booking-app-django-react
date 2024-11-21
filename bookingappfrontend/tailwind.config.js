/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom font family configuration
      fontFamily: {
        // Defines a custom 'sans' font family with 'roboto' as the primary font and 'sans-serif' as the fallback
        sans: ['Font Awesome 5 Free', 'sans-serif'],
      },
      // Custom grid template columns configuration
      gridTemplateColumns: {
        // Defines a custom grid template with two columns: the first column takes 70% of the width, and the second column takes 28%
        '70/30': '70% 28%',
      },
    },
  },
  plugins: [],
}

