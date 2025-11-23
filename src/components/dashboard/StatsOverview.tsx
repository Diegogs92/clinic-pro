'use client';

import { usePatients } from '@/contexts/PatientsContext';
import { useAppointments } from '@/contexts/AppointmentsContext';
import { usePayments } from '@/contexts/PaymentsContext';

interface Stat {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

export default function StatsOverview() {
  const { patients } = usePatients();
  const { appointments } = useAppointments();
  const { payments, pendingPayments } = usePayments();

  const today = new Date().toISOString().slice(0, 10);
  const todayAppointments = appointments.filter(a => a.date.startsWith(today) && a.status !== 'cancelled');

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyIncome = payments
    .filter(p => {
      const d = new Date(p.date);
      return p.status === 'completed' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  const stats: Stat[] = [
    {
      label: 'Pacientes',
      value: patients.length,
      sub: patients.length === 0 ? 'Sin registros' : `${patients.length} registrado${patients.length !== 1 ? 's' : ''}`,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Turnos Hoy',
      value: todayAppointments.length,
      sub: todayAppointments.length === 0 ? 'Sin turnos' : `${todayAppointments.length} turno${todayAppointments.length !== 1 ? 's' : ''}`,
      color: 'from-primary to-primary-light'
    },
    {
      label: 'Ingresos Mes',
      value: `$${monthlyIncome.toLocaleString()}`,
      sub: `${payments.filter(p => p.status === 'completed' && new Date(p.date).getMonth() === currentMonth && new Date(p.date).getFullYear() === currentYear).length} pago(s)`,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Pendientes Cobro',
      value: `$${pendingAmount.toLocaleString()}`,
      sub: `${pendingPayments.length} pendiente${pendingPayments.length !== 1 ? 's' : ''}`,
      color: 'from-amber-500 to-amber-600'
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map(s => (
        <div
          key={s.label}
          className="relative overflow-hidden bg-white dark:bg-elegant-900 rounded-xl p-6 border border-elegant-200 dark:border-elegant-800 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 cursor-pointer group"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

          <div className="relative z-10">
            <div className="text-xs uppercase tracking-wide font-semibold text-elegant-600 dark:text-elegant-400 mb-2">
              {s.label}
            </div>
            <div className="text-4xl font-bold text-black dark:text-white mb-2 transition-all duration-300 group-hover:scale-110">
              {s.value}
            </div>
            {s.sub && (
              <div className="text-xs text-elegant-500 dark:text-elegant-400 font-medium">
                {s.sub}
              </div>
            )}
          </div>

          <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${s.color} rounded-full opacity-0 group-hover:opacity-20 transition-all duration-300 group-hover:scale-150`} />
        </div>
      ))}
    </div>
  );
}
