"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getPatientsByUser } from "@/lib/patients";
import { Patient } from "@/types";

interface PatientsContextValue {
  patients: Patient[];
  loading: boolean;
  refreshPatients: () => Promise<Patient[]>;
}

const PatientsContext = createContext<PatientsContextValue | undefined>(undefined);

export const PatientsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshPatients = useCallback(async () => {
    if (!user) {
      setPatients([]);
      setLoading(false);
      return [];
    }
    setLoading(true);
    try {
      const list = await getPatientsByUser(user.uid);
      setPatients(list);
      return list;
    } catch (error) {
      console.error('[PatientsContext] Error fetching patients', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshPatients();
  }, [refreshPatients]);

  return (
    <PatientsContext.Provider value={{ patients, loading, refreshPatients }}>
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatients = () => {
  const context = useContext(PatientsContext);
  if (!context) {
    throw new Error("usePatients must be used within PatientsProvider");
  }
  return context;
};
