'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Appointment } from '@/types';

interface CalendarSyncContextType {
  isConnected: boolean;
  syncAppointment: (appointment: Appointment, action: 'create' | 'update' | 'delete', eventId?: string, officeColorId?: string) => Promise<string | null>;
}

const CalendarSyncContext = createContext<CalendarSyncContextType>({
  isConnected: false,
  syncAppointment: async () => null,
});

export function useCalendarSync() {
  return useContext(CalendarSyncContext);
}

interface Props {
  children: ReactNode;
}

export function CalendarSyncProvider({ children }: Props) {
  const { user, googleAccessToken } = useAuth();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Si el usuario está autenticado con Google, está "conectado" para Calendar
    if (user && googleAccessToken) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [user, googleAccessToken]);

  const syncAppointment = async (
    appointment: Appointment,
    action: 'create' | 'update' | 'delete',
    eventId?: string,
    officeColorId?: string
  ): Promise<string | null> => {
    if (!isConnected || !googleAccessToken) {
      return null;
    }

    try {
      const response = await fetch('/api/calendar/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointment: { ...appointment, googleCalendarEventId: eventId },
          action,
          accessToken: googleAccessToken,
          officeColorId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to sync');
      }

      const data = await response.json();
      return data.eventId;
    } catch (error) {
      console.error('Error syncing appointment:', error);
      return null;
    }
  };

  return (
    <CalendarSyncContext.Provider
      value={{
        isConnected,
        syncAppointment,
      }}
    >
      {children}
    </CalendarSyncContext.Provider>
  );
}
