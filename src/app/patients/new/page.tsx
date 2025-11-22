'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
export const dynamic = 'force-dynamic';
import DashboardLayout from '@/components/DashboardLayout';
import PatientForm from '@/components/patients/PatientForm';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';

export default function NewPatientPage() {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Modal open onClose={() => router.back()} title="Nuevo Paciente" maxWidth="max-w-3xl">
          <PatientForm />
        </Modal>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
