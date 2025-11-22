'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import InsuranceForm from '@/components/insurances/InsuranceForm';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';
export const dynamic = 'force-dynamic';

export default function NewInsurancePage() {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Modal open onClose={() => router.back()} title="Nueva Obra Social / Prepaga" maxWidth="max-w-3xl">
          <InsuranceForm />
        </Modal>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
