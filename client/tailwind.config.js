/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js",],
  theme: {
    extend: {
      colors: {
        border: '#F3F4F6',
          background: 'var(--background)',
        foreground: 'var(--foreground)'
      }
    },
  },
  plugins: [],
}

