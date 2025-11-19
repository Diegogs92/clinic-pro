'use client';

import { useCalendarSync } from '@/contexts/CalendarSyncContext';
import { useToast } from '@/contexts/ToastContext';
import { Calendar, CalendarOff } from 'lucide-react';
import { useState } from 'react';

export default function GoogleCalendarToggle() {
  const { isConnected, syncEnabled, toggleSync } = useCalendarSync();
  const toast = useToast();
  const [isHovered, setIsHovered] = useState(false);

  if (!isConnected) {
    return null;
  }

  const handleToggle = () => {
    toggleSync();
    if (!syncEnabled) {
      toast.success('Sincronización con Google Calendar activada');
    } else {
      toast.info('Sincronización con Google Calendar desactivada');
    }
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
        transition-all duration-200 hover:scale-105
        ${
          syncEnabled
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
            : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
        }
      `}
      aria-label={syncEnabled ? 'Desactivar sincronización con Google Calendar' : 'Activar sincronización con Google Calendar'}
    >
      {syncEnabled ? (
        <Calendar className="w-4 h-4" />
      ) : (
        <CalendarOff className="w-4 h-4" />
      )}

      <span className="hidden sm:inline whitespace-nowrap">
        {syncEnabled ? 'Google Calendar' : 'Calendar Off'}
      </span>

      {syncEnabled && (
        <span className="flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      )}

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
          {syncEnabled
            ? 'Los turnos se sincronizan con Google Calendar'
            : 'Click para activar sincronización con Google Calendar'}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
        </div>
      )}
    </button>
  );
}
