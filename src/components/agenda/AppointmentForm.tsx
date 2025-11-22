"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAppointment } from '@/lib/appointments';
import { Appointment } from '@/types';
import AppointmentForm from '@/components/appointments/AppointmentForm';

interface Props {
  appointmentId?: string;
}

export default function AgendaAppointmentForm({ appointmentId }: Props) {
  const router = useRouter();
  const [initialData, setInitialData] = useState<Appointment | undefined>(undefined);

  useEffect(() => {
    if (!appointmentId) return;
    (async () => {
      const appt = await getAppointment(appointmentId);
      if (appt) setInitialData(appt);
    })();
  }, [appointmentId]);

  return (
    <AppointmentForm
      initialData={initialData}
      onCreated={() => router.push('/agenda')}
      onCancel={() => router.back()}
    />
  );
}
