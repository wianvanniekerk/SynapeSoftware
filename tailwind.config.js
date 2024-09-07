/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./build/views/**/*.ejs"],
  theme: {
    extend: {
        fontFamily: {
            sans: ['Poppins', 'sans-serif'],
        },
    },
  },
  plugins: [],
}