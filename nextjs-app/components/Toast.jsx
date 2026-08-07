'use client';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Toast() {
  const { toast } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast.msg) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, [toast.key]);

  return (
    <div className={`toast ${visible ? 'on' : ''} toast-${toast.type || 'ok'}`} role="status" aria-live="polite">
      <span className="toast-icon">{toast.type === 'warn' ? '!' : '✓'}</span>
      {toast.msg}
    </div>
  );
}
