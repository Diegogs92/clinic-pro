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
        // Paleta profesional médica - Confianza, Calma y Limpieza
        primary: {
          DEFAULT: '#0EA5E9',     // Sky Blue - Confianza y profesionalismo
          dark: '#0284C7',        // Sky 600 - Autoridad
          light: '#38BDF8',       // Sky 400 - Accesible
          hover: '#0C7FB8',       // Hover profundo
        },
        secondary: {
          DEFAULT: '#1E40AF',     // Blue 800 - Profesionalismo profundo
          light: '#3B82F6',       // Blue 500 - Azul medio
          lighter: '#60A5FA',     // Blue 400 - Azul claro
        },
        accent: {
          DEFAULT: '#1E3A8A',     // Blue 900 - Azul oscuro elegante
          light: '#2563EB',       // Blue 600
          dark: '#1E293B',        // Slate 800 - Muy oscuro
        },
        // Colores específicos de la paleta médica
        navy: {
          darkest: '#0F172A',     // Slate 900 - Profesional
          dark: '#1E293B',        // Slate 800
          DEFAULT: '#334155',     // Slate 700
          light: '#64748B',       // Slate 500
        },
        pearl: '#F8FAFC',         // Slate 50 - Limpieza extrema
        // Grises médicos neutros y calmantes
        elegant: {
          50: '#F8FAFC',          // Blanco médico
          100: '#F1F5F9',         // Gris muy claro
          200: '#E2E8F0',         // Gris claro
          300: '#CBD5E1',         // Gris suave
          400: '#94A3B8',         // Gris medio
          500: '#64748B',         // Gris neutro
          600: '#475569',         // Gris oscuro
          700: '#334155',         // Slate oscuro
          800: '#1E293B',         // Casi negro
          900: '#0F172A',         // Negro profesional
          950: '#020617',         // Negro profundo
        },
        // Colores de acento médicos
        success: {
          DEFAULT: '#1E40AF',     // Azul profesional
          light: '#3B82F6',
          dark: '#1E3A8A',
        },
        warning: {
          DEFAULT: '#F59E0B',     // Ámbar precaución
          light: '#FBBF24',
          dark: '#D97706',
        },
        danger: {
          DEFAULT: '#EF4444',     // Rojo urgencia
          light: '#F87171',
          dark: '#DC2626',
        },
        // Colores adicionales para UI médica
        info: {
          DEFAULT: '#3B82F6',     // Azul información
          light: '#60A5FA',
          dark: '#2563EB',
        },
        health: {
          DEFAULT: '#1E40AF',     // Azul salud
          light: '#60A5FA',
          dark: '#1E3A8A',
        },
      },
    },
  },
  plugins: [],
}
