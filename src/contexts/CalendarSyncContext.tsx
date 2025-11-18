'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import {
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from '@/lib/googleCalendar';
import { Appointment } from '@/types';

interface CalendarSyncContextType {
  isConnected: boolean;
  syncEnabled: boolean;
  toggleSync: () => void;
  syncAppointment: (appointment: Appointment, action: 'create' | 'update' | 'delete', eventId?: string) => Promise<string | null>;
}

const CalendarSyncContext = createContext<CalendarSyncContextType>({
  isConnected: false,
  syncEnabled: false,
  toggleSync: () => {},
  syncAppointment: async () => null,
});

export function useCalendarSync() {
  return useContext(CalendarSyncContext);
}

interface Props {
  children: ReactNode;
}

export function CalendarSyncProvider({ children }: Props) {
  const { data: session } = useSession();
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Verificar si hay un access token disponible
    if (session?.accessToken) {
      setIsConnected(true);
      // Cargar preferencia de sincronización del localStorage
      const saved = localStorage.getItem('calendar_sync_enabled');
      setSyncEnabled(saved === 'true');
    } else {
      setIsConnected(false);
      setSyncEnabled(false);
    }
  }, [session]);

  const toggleSync = () => {
    const newValue = !syncEnabled;
    setSyncEnabled(newValue);
    localStorage.setItem('calendar_sync_enabled', String(newValue));
  };

  const syncAppointment = async (
    appointment: Appointment,
    action: 'create' | 'update' | 'delete',
    eventId?: string
  ): Promise<string | null> => {
    if (!syncEnabled || !session?.accessToken) {
      return null;
    }

    try {
      switch (action) {
        case 'create':
          return await createCalendarEvent(session.accessToken, appointment);
        case 'update':
          if (eventId) {
            await updateCalendarEvent(session.accessToken, eventId, appointment);
          }
          return eventId || null;
        case 'delete':
          if (eventId) {
            await deleteCalendarEvent(session.accessToken, eventId);
          }
          return null;
        default:
          return null;
      }
    } catch (error) {
      console.error('Error syncing appointment:', error);
      return null;
    }
  };

  return (
    <CalendarSyncContext.Provider
      value={{
        isConnected,
        syncEnabled,
        toggleSync,
        syncAppointment,
      }}
    >
      {children}
    </CalendarSyncContext.Provider>
  );
}
