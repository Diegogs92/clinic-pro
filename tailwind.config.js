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
        // Paleta minimalista moderna y sofisticada
        primary: {
          DEFAULT: '#339989',     // Verde azulado (teal vibrante)
          dark: '#2a7d72',        // Teal oscuro
          light: '#47b5a3',       // Teal claro
          hover: '#2e8a7d',       // Hover teal
        },
        secondary: {
          DEFAULT: '#2B2C28',     // Gris carbón oscuro
          light: '#4a4c45',       // Gris carbón medio
          lighter: '#6b6e63',     // Gris carbón claro
        },
        accent: {
          DEFAULT: '#339989',     // Teal (mismo que primary para cohesión)
          light: '#5fb3a5',       // Teal suave
          dark: '#266d62',        // Teal profundo
        },
        // Colores específicos de la paleta
        navy: {
          darkest: '#131515',     // Negro carbón (#131515)
          dark: '#2B2C28',        // Gris oscuro (#2B2C28)
          DEFAULT: '#4a4c45',     // Gris medio
          light: '#6b6e63',       // Gris claro
        },
        pearl: '#FFFAFB',         // Blanco perlado (#FFFAFB)
        // Grises elegantes neutros con base en la paleta
        elegant: {
          50: '#FFFAFB',          // Pearl
          100: '#f5f0f1',         // Pearl tinted
          200: '#e8e3e4',         // Gris muy claro
          300: '#d1cccf',         // Gris claro
          400: '#9d9a9c',         // Gris medio
          500: '#6b6e63',         // Gris
          600: '#4a4c45',         // Gris oscuro
          700: '#2B2C28',         // Carbón
          800: '#1f201d',         // Carbón oscuro
          900: '#131515',         // Negro carbón
          950: '#0a0b0a',         // Negro profundo
        },
        // Colores de acento adicionales
        success: {
          DEFAULT: '#339989',     // Teal (coherente con primary)
          light: '#5fb3a5',
          dark: '#266d62',
        },
        warning: {
          DEFAULT: '#f59e0b',     // Ámbar
          light: '#fbbf24',
          dark: '#d97706',
        },
        danger: {
          DEFAULT: '#ef4444',     // Rojo
          light: '#f87171',
          dark: '#dc2626',
        },
      },
    },
  },
  plugins: [],
}
