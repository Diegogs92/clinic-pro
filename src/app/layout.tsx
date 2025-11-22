import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import NextAuthProvider from '@/components/NextAuthProvider';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { ConfirmProvider } from '@/contexts/ConfirmContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { PatientsProvider } from '@/contexts/PatientsContext';
import { AppointmentsProvider } from '@/contexts/AppointmentsContext';
import { PaymentsProvider } from '@/contexts/PaymentsContext';
import { CalendarSyncProvider } from '@/contexts/CalendarSyncContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import GlobalLoader from '@/components/GlobalLoader';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Clinical - Sistema de Gestión Médica',
  description: 'Plataforma profesional para la gestión de consultorios médicos',
  manifest: '/manifest.json',
  themeColor: '#0EA5E9',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={jakarta.className}>
      <body className="antialiased bg-pearl dark:bg-elegant-950 text-elegant-900 dark:text-elegant-50 min-h-screen">
        <ErrorBoundary>
          <ThemeProvider>
            <NextAuthProvider>
              <AuthProvider>
                <ToastProvider>
                  <ConfirmProvider>
                    <PatientsProvider>
                      <AppointmentsProvider>
                        <PaymentsProvider>
                          <CalendarSyncProvider>
                            <GlobalLoader />
                            {children}
                          </CalendarSyncProvider>
                        </PaymentsProvider>
                      </AppointmentsProvider>
                    </PatientsProvider>
                  </ConfirmProvider>
                </ToastProvider>
              </AuthProvider>
            </NextAuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
