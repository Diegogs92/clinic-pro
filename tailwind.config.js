/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#94E8B4',
          DEFAULT: '#72BDA3',
          dark: '#4E6151',
        },
        secondary: {
          DEFAULT: '#72BDA3',
          light: '#94E8B4',
          lighter: '#94E8B4',
          dark: '#4E6151',
        },
        accent: {
          DEFAULT: '#3B322C',
        },
      },
    },
  },
  plugins: [],
}
