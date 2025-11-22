'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import AppointmentForm from '@/components/agenda/AppointmentForm';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/Modal';
export const dynamic = 'force-dynamic';

export default function AppointmentDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Modal open onClose={() => router.back()} title="Editar Turno" maxWidth="max-w-3xl">
          <AppointmentForm appointmentId={id} />
        </Modal>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
