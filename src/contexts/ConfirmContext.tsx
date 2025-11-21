"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import Modal from '@/components/ui/Modal';

interface ConfirmOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  tone?: 'default' | 'danger' | 'success';
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<{ options: ConfirmOptions; resolve: (v: boolean) => void } | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setPending({ options, resolve });
    });
  }, []);

  const close = (value: boolean) => {
    pending?.resolve(value);
    setPending(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <Modal open={!!pending} onClose={() => close(false)} title={pending?.options.title || 'Confirmar acción'}>
        <p className="text-base text-elegant-600 dark:text-elegant-300 mb-6 leading-relaxed">
          {pending?.options.description || '¿Deseas continuar?'}
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            className="inline-flex items-center justify-center gap-2 font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 px-4 py-2.5 shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => close(false)}
          >
            {pending?.options.cancelText || 'Cancelar'}
          </button>
          <button
            className={
              pending?.options.tone === 'danger'
                ? 'inline-flex items-center justify-center gap-2 font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 shadow-md hover:shadow-lg transition-all duration-300'
                : pending?.options.tone === 'success'
                ? 'inline-flex items-center justify-center gap-2 font-medium rounded-lg bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 shadow-md hover:shadow-lg transition-all duration-300'
                : 'inline-flex items-center justify-center gap-2 font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 shadow-md hover:shadow-lg transition-all duration-300'
            }
            onClick={() => close(true)}
          >
            {pending?.options.confirmText || 'Confirmar'}
          </button>
        </div>
      </Modal>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used within ConfirmProvider');
  return ctx.confirm;
}
