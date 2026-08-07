'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {key, name, price, qty, img, meta}
  const [favCount, setFavCount] = useState(0);
  const [toast, setToast] = useState('');

  function showToast(msg) {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(''), 2200);
  }

  function addItem(product, opts = {}) {
    const key = `${product.slug}-${opts.meta || 'standart'}`;
    setItems((cur) => {
      const found = cur.find((c) => c.key === key);
      if (found) {
        return cur.map((c) => (c.key === key ? { ...c, qty: c.qty + (opts.qty || 1) } : c));
      }
      return [
        ...cur,
        {
          key,
          name: product.name,
          price: product.price,
          qty: opts.qty || 1,
          img: product.images[0],
          meta: opts.meta || '',
        },
      ];
    });
    showToast('Sepete eklendi');
  }

  function updateQty(key, qty) {
    setItems((cur) =>
      qty < 1 ? cur.filter((c) => c.key !== key) : cur.map((c) => (c.key === key ? { ...c, qty } : c))
    );
  }

  function removeItem(key) {
    setItems((cur) => cur.filter((c) => c.key !== key));
  }

  function toggleFav(liked) {
    setFavCount((n) => Math.max(0, n + (liked ? 1 : -1)));
  }

  const count = useMemo(() => items.reduce((a, c) => a + c.qty, 0), [items]);
  const total = useMemo(() => items.reduce((a, c) => a + c.qty * c.price, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, count, total, favCount, toggleFav, showToast, toast }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart, CartProvider içinde kullanılmalı');
  return ctx;
}
