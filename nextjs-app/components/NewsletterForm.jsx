'use client';

import { useCart } from '@/context/CartContext';

export default function NewsletterForm() {
  const { showToast } = useCart();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        showToast('Aboneliğiniz alındı');
      }}
    >
      <input type="email" placeholder="E-posta adresiniz" required />
      <button className="submit" type="submit">
        Abone ol →
      </button>
    </form>
  );
}
