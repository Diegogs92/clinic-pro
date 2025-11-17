"use client";

import React from 'react';

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode; maxWidth?: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/30 to-black/20 backdrop-blur-md" onClick={onClose} />
      <div className={`relative w-full ${maxWidth} card animate-in fade-in zoom-in`}> 
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-dark dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-secondary hover:text-primary dark:hover:text-white transition-colors">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
