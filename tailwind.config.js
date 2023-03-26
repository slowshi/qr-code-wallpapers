/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dim: "#1E1E1E",
        light: '#f3f3f1'
      },
      height: {
        '160': '42rem'
      },
      fontFamily: {
        sans: ['Chalkboard SE', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
