"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
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
  const confirmRef = useRef<HTMLButtonElement | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setPending({ options, resolve });
    });
  }, []);

  const close = (value: boolean) => {
    pending?.resolve(value);
    setPending(null);
  };

  const tone = pending?.options.tone || 'default';

  useEffect(() => {
    if (pending && confirmRef.current) {
      confirmRef.current.focus();
    }
  }, [pending]);

  const TONE_CLASSES: Record<string, string> = {
    danger: 'bg-white text-danger border border-danger/40 hover:bg-danger/10 hover:text-danger-dark dark:bg-transparent dark:text-danger-light dark:border-danger/50 dark:hover:bg-danger/10 rounded-xl px-5 py-2 font-semibold shadow-sm',
    success: 'bg-green-600 text-white hover:bg-green-500 focus:ring-2 focus:ring-offset-2 focus:ring-green-400 rounded-full px-5 py-2 font-semibold shadow-sm transition',
    default: 'btn-primary rounded-full px-5 py-2'
  };
  const confirmButtonClass = TONE_CLASSES[tone] || TONE_CLASSES.default;
  const confirmLabel = pending?.options.confirmText || (tone === 'danger' ? 'Eliminar' : tone === 'success' ? 'Registrar' : 'Confirmar');

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <Modal open={!!pending} onClose={() => close(false)} title={pending?.options.title || 'Confirmar acción'}>
        <p className="text-sm md:text-base text-elegant-600 dark:text-elegant-300 mb-5 leading-relaxed">
          {pending?.options.description || '¿Deseas continuar?'}
        </p>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-1">
          <button
            onClick={() => close(false)}
            className="btn-secondary flex-1 sm:flex-initial min-w-[120px]"
            type="button"
          >
            {pending?.options.cancelText || 'Cancelar'}
          </button>
          <button
            ref={confirmRef}
            onClick={() => close(true)}
            className={`${confirmButtonClass} flex-1 sm:flex-initial min-w-[120px]`}
            type="button"
            aria-label={confirmLabel}
          >
            {confirmLabel}
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
