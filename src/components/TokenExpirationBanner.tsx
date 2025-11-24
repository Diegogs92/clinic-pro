'use client';

import { useCalendarSync } from '@/contexts/CalendarSyncContext';
import { useAuth } from '@/contexts/AuthContext';
import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

export default function TokenExpirationBanner() {
  const { isTokenExpired } = useCalendarSync();
  const { signOut, signInWithGoogle } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  if (!isTokenExpired || dismissed) {
    return null;
  }

  const handleReauth = async () => {
    try {
      await signOut();
      // Pequeño delay para que se complete el signOut
      setTimeout(async () => {
        await signInWithGoogle();
      }, 500);
    } catch (error) {
      console.error('Error al re-autenticar:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">Tu sesión con Google Calendar expiró</p>
              <p className="text-xs opacity-90">
                Los turnos no se sincronizarán con Google Calendar hasta que vuelvas a iniciar sesión
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReauth}
              className="bg-white text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
            >
              Volver a Iniciar Sesión
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
