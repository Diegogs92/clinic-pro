"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAppointmentsByUser } from "@/lib/appointments";
import { Appointment } from "@/types";

interface AppointmentsContextValue {
  appointments: Appointment[];
  loading: boolean;
  refreshAppointments: () => Promise<Appointment[]>;
}

const AppointmentsContext = createContext<AppointmentsContextValue | undefined>(undefined);

export const AppointmentsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshAppointments = useCallback(async () => {
    if (!user) {
      console.log('[AppointmentsContext] No user, clearing appointments');
      setAppointments([]);
      setLoading(false);
      return [];
    }

    console.log('[AppointmentsContext] Refreshing appointments for user:', user.uid);
    setLoading(true);
    try {
      const list = await getAppointmentsByUser(user.uid);
      console.log('[AppointmentsContext] Fetched appointments:', list.length);
      setAppointments(list);
      return list;
    } catch (error) {
      console.error("[AppointmentsContext] Error fetching appointments", error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshAppointments();
  }, [refreshAppointments]);

  return (
    <AppointmentsContext.Provider value={{ appointments, loading, refreshAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error("useAppointments must be used within AppointmentsProvider");
  }
  return context;
};
