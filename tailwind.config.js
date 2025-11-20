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
        // Paleta moderna y elegante con degradados sutiles
        primary: {
          DEFAULT: '#2563eb',     // Azul moderno vibrante
          dark: '#1e40af',        // Azul oscuro intenso
          light: '#3b82f6',       // Azul claro brillante
          hover: '#1d4ed8',       // Hover intenso
        },
        secondary: {
          DEFAULT: '#6366f1',     // Índigo moderno
          light: '#a5b4fc',       // Índigo claro
          lighter: '#e0e7ff',     // Índigo muy claro
        },
        accent: {
          DEFAULT: '#8b5cf6',     // Púrpura moderno
          light: '#a78bfa',       // Púrpura claro
          dark: '#7c3aed',        // Púrpura oscuro
        },
        // Colores específicos de la paleta
        navy: {
          darkest: '#0f172a',     // Slate 900
          dark: '#1e293b',        // Slate 800
          DEFAULT: '#334155',     // Slate 700
          light: '#64748b',       // Slate 500
        },
        pearl: '#f8fafc',         // Slate 50 - Fondo claro moderno
        // Grises modernos neutros
        elegant: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Colores de acento adicionales
        success: {
          DEFAULT: '#10b981',     // Verde moderno
          light: '#34d399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#f59e0b',     // Ámbar moderno
          light: '#fbbf24',
          dark: '#d97706',
        },
        danger: {
          DEFAULT: '#ef4444',     // Rojo moderno
          light: '#f87171',
          dark: '#dc2626',
        },
      },
    },
  },
  plugins: [],
}
