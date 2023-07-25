/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'merriweather': ['Merriweather', 'serif'],
        'metrophobic': ['Metrophobic', 'sans-serif']
      },
      colors: {
        'red-oxide': '#671818',
      }
    },
  },
  plugins: [],
}

