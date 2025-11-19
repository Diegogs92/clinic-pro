/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta minimalista simplificada
        primary: {
          DEFAULT: '#08415C',  // Azul oscuro principal
          hover: '#062d40',    // Hover state
        },
        accent: {
          DEFAULT: '#388697',  // Turquesa para acentos
        },
        // Los grays de Tailwind se usan para neutrales
      },
    },
  },
  plugins: [],
}
