'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Office } from '@/types';
import { listOffices } from '@/lib/offices';
import { useAuth } from './AuthContext';

interface OfficesContextType {
  offices: Office[];
  loading: boolean;
  refreshOffices: () => Promise<void>;
}

const OfficesContext = createContext<OfficesContextType>({
  offices: [],
  loading: false,
  refreshOffices: async () => {},
});

export function useOffices() {
  return useContext(OfficesContext);
}

export function OfficesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshOffices = async () => {
    if (!user) {
      setOffices([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await listOffices(user.uid);
      setOffices(data);
    } catch (error) {
      console.error('Error loading offices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshOffices();
  }, [user]);

  return (
    <OfficesContext.Provider value={{ offices, loading, refreshOffices }}>
      {children}
    </OfficesContext.Provider>
  );
}
