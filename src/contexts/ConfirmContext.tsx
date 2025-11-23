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
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setIsOpen(true);

    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve);
    });
  }, []);

  const handleConfirm = () => {
    if (resolvePromise) {
      resolvePromise(true);
    }
    setIsOpen(false);
    setResolvePromise(null);
  };

  const handleCancel = () => {
    if (resolvePromise) {
      resolvePromise(false);
    }
    setIsOpen(false);
    setResolvePromise(null);
  };

  const getToneStyles = () => {
    switch (options.tone) {
      case 'danger':
        return 'btn-danger';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      default:
        return 'btn-primary';
    }
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <Modal
        open={isOpen}
        onClose={handleCancel}
        title={options.title || 'Confirmar'}
        maxWidth="max-w-md"
      >
        <div className="space-y-6">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {options.description || '¿Estás seguro de que deseas continuar?'}
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {options.cancelText || 'Cancelar'}
            </button>
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all hover:shadow-lg hover:scale-105 ${getToneStyles()}`}
            >
              {options.confirmText || 'Confirmar'}
            </button>
          </div>
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
