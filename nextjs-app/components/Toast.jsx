'use client';
import { useCart } from '@/context/CartContext';

export default function Toast() {
  const { toast } = useCart();
  return (
    <div className={`toast ${toast ? 'on' : ''}`} role="status" aria-live="polite">
      <span className="toast-icon">✓</span>
      {toast}
    </div>
  );
}
