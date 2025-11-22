'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import AppointmentForm from '@/components/agenda/AppointmentForm';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';
export const dynamic = 'force-dynamic';

export default function NewAppointmentPage() {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Modal open onClose={() => router.back()} title="Nuevo Turno" maxWidth="max-w-3xl">
          <AppointmentForm />
        </Modal>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
